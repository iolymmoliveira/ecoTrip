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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === 'production'
      ? 'https://seu-dominio-da-vercel.vercel.app' // TODO: Substituir pela URL final ao publicar
      : 'http://localhost:3000',
  ),
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
