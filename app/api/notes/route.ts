import { insertNoteSchema } from '@/db/notes/validation';
import NoteService from '@/lib/NoteService';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  const result = await new NoteService().createNote(body);

  return result;
}