import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Scroll Souls - Emotional Wellness Platform',
  description: 'Connect with your emotions, track your mood, journal privately, and find mental health support. Scroll Souls is your personal wellness companion.',
  keywords: 'mental health, emotional wellness, mood tracking, journaling, therapy, therapists, mental health support',
  authors: [{ name: 'Scroll Souls Team' }],
  creator: 'Scroll Souls',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://scroll-souls.vercel.app',
    title: 'Scroll Souls - Emotional Wellness Platform',
    description: 'Your personal emotional wellness companion',
    siteName: 'Scroll Souls',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
