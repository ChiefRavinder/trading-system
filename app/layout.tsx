import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Trading System',
  description: 'An interactive trading system with client and settlement interfaces',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow container">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

