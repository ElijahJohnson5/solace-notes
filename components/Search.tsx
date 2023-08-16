'use client';

import React, { FormEventHandler, useCallback, useEffect, useState } from "react";
import { Note } from "@/db/notes/schema";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { revalidateHomePage } from "@/app/actions";

interface Props {
  notes: Note[];
}

export default function Search({ notes }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [searchValue, setSerchValue] = useState(searchParams.get('search') || '')

  const handleInput: FormEventHandler<HTMLInputElement> = (e) => {
    setSerchValue(e.currentTarget.value);
    const queryString = createQueryString(e.currentTarget.value);

    router.replace(`${pathname}?${queryString}`);
  }

  const createQueryString = useCallback((searchValue: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchValue) {
      params.set('search', searchValue);
      revalidateHomePage();
    } else {
      params.delete('search');
    }

    return params.toString();
  }, [searchParams])

  return (
    <input type="search" placeholder="Search..." className="input input-bordered w-full" value={searchValue} onInput={handleInput} />
  );
}