import { IsString, IsEnum, IsNotEmpty, IsPort } from 'class-validator';

import { Environment } from '@common/enums/environment.enum';

export class ConfigDto {
  @IsPort()
  PORT: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;

  @IsString()
  @IsNotEmpty()
  REDIS_URL: string;

  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.DEVELOPMENT;
}
