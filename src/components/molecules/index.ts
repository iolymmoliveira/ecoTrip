import dynamic from 'next/dynamic';

export { TransportSelector } from './TransportSelector';

export const LocationAutocomplete = dynamic(
  () =>
    import('./LocationAutocomplete').then((mod) => mod.LocationAutocomplete),
  { ssr: false },
);
