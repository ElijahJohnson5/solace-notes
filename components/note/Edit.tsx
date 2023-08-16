'use client';

import { Note } from "@/db/notes/schema";
import React, { FormEventHandler, useCallback, useEffect, useState } from "react";
import { FaBan, FaPenSquare, FaSave, FaTrash } from 'react-icons/fa';
import { validateForm } from "./form";
import { useRouter } from "next/navigation";

interface Props {
  note: Note;
}

export default function Edit({ note }: Props) {
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  const handleEditingClicked = () => {
    setEditing(true);
  };

  const handleDelete = async () => {
    const response = await fetch(`/api/notes/${note.id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      router.push('/');
      router.refresh();
    } else {
      alert('Could not delete the note');
    }
  }

  return (
    <>
      {editing ? 
        <Editing note={note} setEditing={setEditing} handleDelete={handleDelete} /> 
        : 
        <>
          <div className="flex space-x-2">
            <div className="text-2xl w-72 text-ellipsis whitespace-nowrap overflow-hidden">{note.name}</div>
            <div className="flex space-x-4 !ml-auto">
              <button onClick={handleEditingClicked}><FaPenSquare size={28} /> </button> 
              <button onClick={handleDelete}><FaTrash size={28} /></button>
            </div>
          </div>
          <div className="break-all">{note.content}</div>
        </>
      }
    </>
  );
}

interface EditingProps {
  note: Note;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => Promise<void>;
}

function Editing({ note, setEditing, handleDelete }: EditingProps) {
  const [name, setName] = useState(note.name);
  const [content, setContent] = useState(note.content);
  const [nameError, setNameError] = useState('');
  const [contentError, setContentError] = useState('');
  const router = useRouter();

  useEffect(() => {
    setName(note.name);
    setContent(note.content);
  }, [note.name, note.content]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);
    const formJsonData = Object.fromEntries(formData.entries());
    const formJson = { ...formJsonData, id: note.id }

    const result = validateForm(formJson, setNameError, setContentError);

    if (!result) { 
      return;
    }

    setNameError('');
    setContentError('');

    const response = await fetch(`/api/notes/${note.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formJson)
    });

    if (response.ok) {
      router.refresh();
      setEditing(false);
    } else {
      alert('Could not update the note');
    }
  }

  const handleCancelClicked = () => {
    setEditing(false);
    setName(note.name);
    setContent(note.content);
  }

  const handleNameInput: FormEventHandler<HTMLInputElement> = (e) => {
    setName(e.currentTarget.value);
  }

  const handleContentInput: FormEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.currentTarget.value);
  }


  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" value={note.id} name="id" />
      <div className="flex space-x-2">
        <div>
          <input type="text" name="name" value={name} onInput={handleNameInput} placeholder="Type here" className={`input input-bordered w-full max-w-72 ${nameError ? 'input-error' : ''}`} />
          {nameError && <span className="label-text text-error">{nameError}</span>}
        </div>
        <div className="flex space-x-4 !ml-auto">
          <button type="submit"><FaSave size={28} /></button> 
          <button onClick={handleCancelClicked} type="button"><FaBan size={28} /></button>
          <button onClick={handleDelete}><FaTrash size={28} /></button>
        </div>
      </div>
      <textarea name="content" value={content} onInput={handleContentInput} className={`textarea textarea-bordered w-full max-h-full h-96 ${contentError ? 'textarea-error' : ''}`} placeholder="Note" />
      {contentError && <span className="label-text text-error">{contentError}</span>}
    </form>
  )
}