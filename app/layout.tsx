import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CursorEffect from '@/components/CursorEffect'
import Particles from '@/components/Particles'
import ScrollProgress from '@/components/ScrollProgress'
import LoadingScreen from '@/components/LoadingScreen'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Varun Kumar Konjeti | AI Professional Portfolio',
  description: 'Highly motivated AI professional with expertise in Machine Learning, Deep Learning, and innovative technology solutions.',
  keywords: 'AI, Machine Learning, Deep Learning, Data Science, Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-dark-bg text-white overflow-x-hidden`}>
        <LoadingScreen />
        <ScrollProgress />
        <CursorEffect />
        <Particles />
        {children}
      </body>
    </html>
  )
}

