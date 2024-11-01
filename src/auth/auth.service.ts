import { BadRequestException, ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { BcryptService } from './bcrypt.service';
import { RedisService } from '../redis/redis.service';

import { PostgresErrorCode } from '@common/enums/errorCodes.enum';
import { UserPayloadType } from '@common/types/userPayload.type';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private redisService: RedisService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  public async signUp(username: string, fullName: string, password: string) {
    try {
      // hash the password & save user to db
      const hashedPassword = await this.bcryptService.hash(password);
      await this.usersService.create(username, fullName, hashedPassword);
    } catch (error) {
      this.logger.error(error);

      if (error.code === PostgresErrorCode.UniqueViolation) {
        throw new ConflictException('User already exist');
      }

      throw error;
    }
  }

  public async signIn(username: string, password: string): Promise<{ token: string }> {
    try {
      // find user in db
      const user = await this.usersService.findOne(username);

      if (!user) {
        throw new BadRequestException('Invalid username');
      }

      // check the password
      const isPasswordMatch = await this.bcryptService.compare(password, user.password);

      if (!isPasswordMatch) {
        throw new BadRequestException('Invalid password');
      }

      // make jwt token
      const token = await this.jwtService.signAsync({
        id: user.id,
        username: user.username
      });

      // set user profile data to cache
      await this.redisService.set(`user:${user.id}`, JSON.stringify(user));

      return { token };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async getUserData(token: string): Promise<{ fullName: string }> {
    try {
      // verify token & get payload
      const payload: UserPayloadType = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET')
      });

      // get user profile data from cache
      const storedUser = await this.redisService.get(`user:${payload.id}`);
      const parsedUser = JSON.parse(storedUser);

      if (storedUser && parsedUser) {
        return { fullName: parsedUser.fullName };
      }

      // get user profile data from db
      const user = await this.usersService.findOne(payload.username);

      return { fullName: user.fullName };
    } catch (error) {
      this.logger.error(error);

      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException(error.message);
      }

      throw error;
    }
  }
}
