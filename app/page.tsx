import Search from '@/components/Search';
import Notes from '@/components/note/Notes';
import db from '@/db';
import { notes } from '@/db/notes/schema';
import { like, or } from 'drizzle-orm';
import Link from 'next/link';
import Image from 'next/image';

async function getData(search: string) {
  const likeSearch = `%${search}%`;

  const res = await db.select()
    .from(notes)
    .where(
      or(
        like(notes.content, likeSearch),
        like(notes.name, likeSearch)
      )
    )
    .all();
 
  return res
}

export default async function Home({ searchParams }: { searchParams: Record<string, string> }) {
  const data  = await getData(searchParams['search'] || '');

  return (
    <main className="flex justify-center items-center">
      <div className="flex flex-col w-full justify-center p-24 space-y-4">
        <div className="flex space-x-4 w-full">
          <Search notes={data} />
          <Link href="/create" className="btn btn-primary">Create Note</Link>
        </div>
        {
          data.length === 0 ? 
          <div className="flex justify-center items-center">
            <Image priority src="empty.svg" height={300} width={300} alt="Empty" /> 
          </div>
          : 
          <Notes notes={data} />}
      </div>
    </main>
  )
}