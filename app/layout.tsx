import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'HealthHub Pro - Evidence-Based Health & Wellness Information',
  description: 'Premium health and wellness content from medical experts. Trusted health guides, calculators, and evidence-based information for beauty, nutrition, supplements, and more.',
  generator: 'HealthHub Pro',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://healthhubpro.com',
    siteName: 'HealthHub Pro',
    title: 'HealthHub Pro - Evidence-Based Health Information',
    description: 'Premium health and wellness content from medical experts.',
    images: [
      {
        url: 'https://healthhubpro.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HealthHub Pro',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HealthHub Pro - Evidence-Based Health Information',
    description: 'Premium health and wellness content from medical experts.',
    images: ['https://healthhubpro.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  },
  verification: {
    google: 'googlefbfa23743896d7f7',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9fafb' },
    { media: '(prefers-color-scheme: dark)', color: '#1c1d28' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <head>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        
        {/* Google Site Verification */}
        <meta name="google-site-verification" content="XXXXXXXXXX" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="author" content="HealthHub Pro Medical Team" />
        <meta name="keywords" content="health, wellness, nutrition, beauty, supplements, calculators, medical information" />
      </head>
      <body className="antialiased text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
