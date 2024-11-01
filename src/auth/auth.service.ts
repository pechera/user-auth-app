import { BadRequestException, ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';

import { SingUpDto } from './dto/signup.dto';
import { SingInDto } from './dto/signin.dto';

import { UsersService } from 'src/users/users.service';
import { BcryptService } from './bcrypt.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService
  ) {}

  public async signUp(username: string, fullname: string, password: string) {
    try {
      const hashedPassword = await this.bcryptService.hash(password);
      await this.usersService.create(username, fullname, hashedPassword);
    } catch (error) {
      this.logger.error(error);

      if (error.code === '23505') {
        throw new ConflictException('User already exist');
      }

      throw error;
    }
  }

  public async signIn(username: string, password: string): Promise<{ accessToken: string }> {
    try {
      const user = await this.usersService.findOne(username);

      if (!user) {
        throw new UnauthorizedException('Invalid username');
      }

      const isPasswordMatch = await this.bcryptService.compare(password, user.password);

      if (!isPasswordMatch) {
        throw new UnauthorizedException('Invalid password');
      }

      const accessToken = await this.jwtService.signAsync({
        id: user.id,
        username: user.username
      });

      // set user data

      return { accessToken };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async getUserData(token: string): Promise<{ fullname: string }> {
    try {
      // verify token & get payload
      // return payload
      return { fullname: '' };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
