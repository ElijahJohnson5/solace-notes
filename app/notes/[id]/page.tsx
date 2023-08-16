import Edit from "@/components/note/Edit";
import Note from "@/components/note/Note";
import db from "@/db";
import { notes } from "@/db/notes/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

async function getNote(id: number) {
  const res = await db.select().from(notes).where(eq(notes.id, id)).all(); 

  if (res.length !== 1) {
    return undefined;
  }

  return res[0];
}

export default async function Page({ params }: { params: { id: number }}) {
  const { id } = params
  const note = await getNote(id);

  if (!note) {
    redirect('/');
  }

  return (
    <div className="w-full p-24 h-full">
      <div className="bg-base-300 p-4 rounded shadow-lg h-5/6">
        <Edit note={note} />
      </div>
    </div>
  )
}