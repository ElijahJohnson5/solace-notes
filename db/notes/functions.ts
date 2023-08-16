import { eq } from "drizzle-orm";
import db from "..";
import { NewNote, Note, notes } from "./schema";


export async function insertNote(note: NewNote) {
  return db.insert(notes).values(note).returning().run();
}

export async function updateNote(note: Note) {
  return db.update(notes).set({ name: note.name, content: note.content }).where(eq(notes.id, note.id)).run();
}

export async function deleteNote(note: Pick<Note, 'id'>) {
  return db.delete(notes).where(eq(notes.id, note.id)).run();
}