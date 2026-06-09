'use client';

import { useEffect } from 'react';
import { captureException } from '@/lib/observability';
import { copy } from '@/lib/constants/copy';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    captureException(error, {
      tags: { phase: 'app-error' },
    });
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center">
      <h1 className="text-3xl font-bold text-(--text-main)">Ocorreu um erro</h1>
      <p className="max-w-xl text-sm text-(--text-muted)">{copy.error}</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-(--primary) px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95"
      >
        Tentar novamente
      </button>
    </main>
  );
}
