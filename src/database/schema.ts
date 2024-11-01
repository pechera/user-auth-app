import { integer, varchar, text, pgTable, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar('username', { length: 256 }).unique(),
  password: text('password'),
  fullName: varchar('full_name', { length: 256 }),
  createdAt: timestamp('created_at').notNull().defaultNow()
});
