import type { Metadata, Viewport } from 'next'
import { Fraunces, Nunito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { GlobalPreloader } from '@/components/global-preloader'
import { Toaster } from 'sonner'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hanfleur Florist // Artificial Flower Bouquet',
  description:
    'Hanfleur Florist menghadirkan artificial flower bouquet yang cantik, tahan lama, dan dibuat dengan penuh detail. Pesan buket custom untuk momen spesialmu.',
  generator: 'My self',
  icons: {
    icon: '/images/hanfleur-logo-transparent.png',
  },
  openGraph: {
    title: 'Hanfleur Florist // Artificial Flower Bouquet',
    description:
      'Buket bunga artificial cantik dan tahan lama untuk hadiah ulang tahun, wisuda, anniversary, dan momen spesial lainnya.',
    images: ['/images/hanfleur-logo.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#FCE4E8',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="bg-background">
      <body
        className={`${fraunces.variable} ${nunito.variable} font-sans antialiased`}
      >
        <GlobalPreloader />
        <Toaster position="top-center" richColors />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
