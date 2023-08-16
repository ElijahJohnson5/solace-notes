import { insertNote, updateNote, deleteNote } from "@/db/notes/functions";
import { NewNote, Note } from "@/db/notes/schema";
import { insertNoteSchema, selectNoteSchema } from "@/db/notes/validation";
import { NextResponse } from "next/server";
import { z } from "zod";

export default class NoteService {
  async createNote(body: Record<string, any>) {
    return this.getResponse(body, 'create')
  }

  async updateNote(body: Record<string, any>) {
    return this.getResponse(body, 'update')
  }

  async deleteNote(id: number) {
    try {
      await deleteNote({ id });
    } catch (err) {
      return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  }

  private async getResponse(body: Record<string, any>, type:  'update' | 'create') {
    let validationResult;

    switch (type) {
      case 'update':
        validationResult = this.validateNote(body, selectNoteSchema);
        break;
      case 'create':
        validationResult = this.validateNote(body, insertNoteSchema);
        break;
    }

    if (validationResult instanceof NextResponse) {
      return validationResult;
    }

    try {
      switch (type) {
        case 'update':
          // We know that the validation result is a Note here since that is all validate note can return for selectNoteSchema, however typescript does not recognize this
          await updateNote(validationResult as Note);
          break;
        case 'create':
          await insertNote(validationResult as NewNote);
          break;
      }
    } catch (err) {
      return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  }

  
  validateNote(data: Record<string, any>, schema: typeof selectNoteSchema): Note | NextResponse;
  validateNote(data: Record<string, any>, schema: typeof insertNoteSchema): NewNote | NextResponse;
  validateNote(data: Record<string, any>, schema: typeof selectNoteSchema | typeof insertNoteSchema): Note | NewNote | NextResponse {
    let note: Note | NewNote | null = null;
    try {
      note = schema.parse(data);
    } catch(err) {
      if (err instanceof z.ZodError) {
        return NextResponse.json(err.flatten(), { status: 400 })
      }
    }

    return note!;
  }
}