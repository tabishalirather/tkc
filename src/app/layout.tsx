import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import './globals.css'
import MainLayout from '@/components/layout/MainLayout'
import SessionWrapper from '@/components/SessionWrapper'

export const metadata: Metadata = {
  title: 'The Kashmir Co. - Authentic Kashmiri Products',
  description: 'Discover premium Kashmiri saffron, pure shilajit, fresh walnuts, wild honey, and premium almonds. Sourced directly from the beautiful valleys of Kashmir.',
  keywords: 'Kashmir, Saffron, Shilajit, Walnuts, Honey, Almonds, Authentic, Premium, Online Store',
  authors: [{ name: 'The Kashmir Co.' }],
  openGraph: {
    title: 'The Kashmir Co. - Authentic Kashmiri Products',
    description: 'Discover premium Kashmiri products sourced directly from the valleys of Kashmir',
    url: 'https://tkc.com',
    siteName: 'The Kashmir Co.',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#E8A838" />
      </head>
      <body className="antialiased">
        <SessionWrapper session={session}>
          <MainLayout>
            {children}
          </MainLayout>
        </SessionWrapper>
      </body>
    </html>
  )
}