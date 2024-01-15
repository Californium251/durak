import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ParentContext from '@/context/ParentContext'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Durak</title>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body className={inter.className}>
        <ParentContext>
          {children}
        </ParentContext>
      </body>
    </html>
  )
}
