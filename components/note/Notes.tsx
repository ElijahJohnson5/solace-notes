'use client';

import { Note as NoteType } from "@/db/notes/schema"
import Note from "./Note";
import { useEffect, useState } from "react";

interface Props {
  notes: NoteType[];
}

export default function Notes(props: Props) {
  const [notes, setNotes] = useState(props.notes);

  useEffect(() => {
    setNotes(props.notes);
  }, [props.notes])

  return (
    <div className="flex flex-col space-y-4">
    {notes.map(note => (
      <Note key={note.id} note={note} />
    ))}
  </div>
  )
}