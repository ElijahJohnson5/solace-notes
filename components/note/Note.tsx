'use client';

import { Note as NoteType } from "@/db/notes/schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  note: NoteType;
}

export default function Note({ note }: Props) {
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const response = await fetch(`/api/notes/${note.id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      router.refresh();
    } else {
      alert('Could not delete note');
    }
  }

  return (
    <Link  href={`/notes/${note.id}`} className="card bg-base-300 shadow-xl hover:bg-base-200">
      <div className="flex items-center">
        <div className="card-body">        
          <h2 className="card-title">{note.name}</h2>
          <p className="break-all">{note.content}</p>
        </div>
      </div>
    </Link>
  )
}