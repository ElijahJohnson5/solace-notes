import NoteService from "@/lib/NoteService";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest, context: { params: { id: number } }) {
  const body = await request.json();

  const result = await new NoteService().updateNote(body);

  return result;
}


export async function DELETE(request: NextRequest, context: { params: { id: number } }) {
  const result = await new NoteService().deleteNote(context.params.id);

  return result;
}
