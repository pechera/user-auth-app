import { Module } from '@nestjs/common';

import { DATABASE_CONNECTION_KEY } from '@common/decorators/database.decorator';
import { DatabaseService } from './database.service';

@Module({
  providers: [
    DatabaseService,
    {
      provide: DATABASE_CONNECTION_KEY,
      inject: [DatabaseService],
      useFactory: async (databaseService: DatabaseService) => {
        return databaseService.getDB();
      }
    }
  ],
  exports: [DATABASE_CONNECTION_KEY]
})
export class DatabaseModule {}
