import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import serverConfig from '@common/config/server.config';
import databaseConfig from '@common/config/database.config';
import jwtConfig from '@common/config/jwt.config';

import { validate } from './config.validation';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [serverConfig, databaseConfig, jwtConfig],
      validate
    })
  ]
})
export class ConfigModule {}
