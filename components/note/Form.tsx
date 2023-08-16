'use client';

import { insertNoteSchema } from '@/db/notes/validation';
import { useRouter } from 'next/navigation';
import { FormEventHandler, useState } from 'react';
import { validateForm } from './form';

export default function NoteForm() {
  const [nameError, setNameError] = useState('');
  const [contentError, setContentError] = useState('');

  const router = useRouter();

  const handleCancel = () => {
    router.push('/');
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const result = validateForm(formJson, setNameError, setContentError);

    if (!result) { 
      return;
    }

    setNameError('');
    setContentError('');

    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formJson)
    });


    switch (response.status) {
      case 200:
        router.push('/');
        router.refresh();
        return;
      case 400:
        alert('Invalid input!');
        return;
      case 500:
        alert('Something went wrong, please try again!');
        return;
    }
  }

  return (
    <div className="card w-8/12 bg-base-300 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Create a new Note</h2>
        <form onSubmit={handleSubmit} id="newNoteForm">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Note Name</span>
            </label>
            <input type="text" name="name" placeholder="Type here" className={`input input-bordered w-full max-w-xs ${nameError ? 'input-error' : ''}`} />
            {nameError && <span className="label-text text-error">{nameError}</span>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Note Content</span>
            </label>
            <textarea name="content" className={`textarea textarea-bordered h-24 ${contentError ? 'textarea-error' : ''}`} placeholder="Note" />
            {contentError && <span className="label-text text-error">{contentError}</span>}
          </div>
        </form>
        <div className="card-actions justify-end">
          <button className="btn btn-neutral" onClick={handleCancel}>Cancel</button>
          <button className="btn btn-primary" type="submit" form="newNoteForm">Create</button>
        </div>
      </div>
    </div>
  );
}