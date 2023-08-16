import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Notes App',
  description: 'Basic Note Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="navbar bg-base-300">
          <Link className="btn btn-ghost normal-case text-xl" href="/">Notes</Link>
        </div>
        {children}
      </body>
    </html>
  )
}
