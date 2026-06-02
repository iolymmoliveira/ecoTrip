import React from 'react';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { copy } from '@/lib/copy';
import './globals.css';

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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const saved = localStorage.getItem('ecotrip-theme');
                const system = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (saved === 'dark' || (!saved && system)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
