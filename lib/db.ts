import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

// For development, we'll use SQLite with a file-based database
const sqlite = new Database('buscart.db');

export const db = drizzle(sqlite);

// You can add your schema definitions here when needed
// Example:
// import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
// 
// export const subscribers = sqliteTable('subscribers', {
//   id: integer('id').primaryKey({ autoIncrement: true }),
//   email: text('email').notNull().unique(),
//   name: text('name'),
//   source: text('source'),
//   createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
// });
