import { Injectable, Logger } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { Environment } from '@common/enums/environment.enum';

@Injectable()
export class DatabaseService {
  logger: Logger;
  private pool: Pool;

  constructor(private readonly configService: ConfigService) {
    this.logger = new Logger(DatabaseService.name);
    this.pool = new Pool({
      connectionString: this.configService.get<string>('DATABASE_URL')
    });
  }

  getDB(): NodePgDatabase<typeof schema> {
    const nodeEnv = this.configService.get<Environment>('NODE_ENV');

    return drizzle(this.pool, {
      schema,
      logger: nodeEnv === Environment.DEVELOPMENT
    });
  }

  async onApplicationShutdown(signal: string) {
    return new Promise<void>(async (resolve) => {
      await this.pool.end();
      this.logger.log('Database off');
      resolve();
    });
  }
}
