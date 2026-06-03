import React from 'react';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { copy } from '@/lib/copy';
import './globals.css';
import { QueryProvider } from '@/providers/QueryProvider';
import Script from 'next/script';
import { Header } from '@/components/organisms/Header';
import { themeScript } from '@/lib/themeScript';

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
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body suppressHydrationWarning>
        <QueryProvider>
          <ThemeProvider>
            <Header />
            <main className="flex-1 w-full">{children}</main>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
