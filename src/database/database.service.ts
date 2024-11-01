import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { Environment } from '@common/enums/environment.enum';

@Injectable()
export class DatabaseService {
  constructor(private readonly configService: ConfigService) {}

  getDB(): NodePgDatabase<typeof schema> {
    const nodeEnv = this.configService.get<Environment>('NODE_ENV');
    const connectionString = this.configService.get<string>('DATABASE_URL');

    const pool = new Pool({
      connectionString,
    });

    return drizzle(pool, {
      schema,
      // casing: 'snake_case',
      logger: nodeEnv === Environment.DEVELOPMENT,
    });
  }
}
