import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { notes } from './schema';
import { z } from 'zod';

export const insertNoteSchema = createInsertSchema(notes, {
  content: z.string().max(300, 'Note cannot be longer than 300 characters').min(20, 'Note must be at least 20 characters long'),
  name: z.string().min(1, 'Name must be at least 1 character')
});

export const selectNoteSchema = createSelectSchema(notes);