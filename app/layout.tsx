import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Navigating the Autonomous Frontier - Animated',
  description: 'An animated visual journey through autonomous vehicle technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
