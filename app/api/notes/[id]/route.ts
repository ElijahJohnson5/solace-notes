import { Note } from "@/db/notes/schema";
import { insertNoteSchema, selectNoteSchema } from "@/db/notes/validation";
import NoteService from "@/lib/NoteService";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(request: NextRequest, context: { params: { id: number } }) {
  const body = await request.json();

  const result = await new NoteService().updateNote(body);

  return result;
}


export async function DELETE(request: NextRequest, context: { params: { id: number } }) {
  const result = await new NoteService().deleteNote(context.params.id);

  return result;
}
