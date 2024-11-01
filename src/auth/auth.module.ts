import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';
import { BcryptService } from './bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const jwtSecret = configService.get<string>('JWT_SECRET');
        const jwtTokenTtl = configService.get<string>('JWT_ACCESS_TOKEN_TTL');

        return {
          secret: jwtSecret,
          signOptions: {
            expiresIn: jwtTokenTtl
          }
        };
      }
    })
  ],
  providers: [AuthService, BcryptService],
  controllers: [AuthController]
})
export class AuthModule {}
