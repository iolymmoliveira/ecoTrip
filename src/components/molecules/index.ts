import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import React from 'react';

export { TransportSelector } from './TransportSelector';

export const LocationAutocomplete = dynamic(
  () =>
    import('./LocationAutocomplete').then((mod) => mod.LocationAutocomplete),
  { ssr: false },
);

export const InteractiveMap = dynamic(
  () => import('./InteractiveMap').then((mod) => mod.InteractiveMap),
  {
    ssr: false,
    loading: () =>
      React.createElement(
        'div',
        {
          className:
            'flex h-72 w-full flex-col items-center justify-center gap-2 rounded-xl border border-(--border) bg-(--bg-card) shadow-sm animate-pulse',
        },
        React.createElement(Loader2, {
          className: 'h-5 w-5 animate-spin text-(--primary)',
        }),
        React.createElement(
          'span',
          { className: 'text-xs text-(--text-muted) font-sans' },
          'Carregando mapa...',
        ),
      ),
  },
);
