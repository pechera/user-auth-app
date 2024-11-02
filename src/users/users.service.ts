import { Injectable } from '@nestjs/common';

import { eq } from 'drizzle-orm';

import * as schema from '../database/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { InjectDatabase } from '@common/decorators/database.decorator';

@Injectable()
export class UsersService {
  constructor(@InjectDatabase() private readonly db: NodePgDatabase<typeof schema>) {}

  async create(username: string, fullName: string, password: string) {
    await this.db.insert(schema.users).values({
      username,
      fullName,
      password
    });
  }

  async findOne(username: string) {
    const [user] = await this.db.select().from(schema.users).where(eq(schema.users.username, username));
    return user;
  }
}
