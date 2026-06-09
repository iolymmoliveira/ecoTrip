import React from 'react';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { copy } from '@/lib/constants/copy';
import 'leaflet/dist/leaflet.css';
import './globals.css';
import { QueryProvider } from '@/providers/QueryProvider';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { ThemeScript } from '@/components/atoms/ThemeScript';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: copy.seo.title,
  description: copy.seo.description,
  openGraph: {
    images: [{ url: copy.seo.ogImage }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body suppressHydrationWarning className="flex flex-col min-h-screen">
        <QueryProvider>
          <ThemeProvider>
            <Header />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
