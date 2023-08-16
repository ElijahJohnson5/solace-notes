import type { InferModel } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
 
export const notes = sqliteTable('notes', {
    id: integer('id').primaryKey(),
    content: text('content').notNull(),
    name: text('name').notNull()
  }
);

export type Note = InferModel<typeof notes>;
export type NewNote = InferModel<typeof notes, 'insert'>;
