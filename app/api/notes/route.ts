import NoteService from '@/lib/NoteService';

export async function POST(request: Request) {
  const body = await request.json();

  const result = await new NoteService().createNote(body);

  return result;
}