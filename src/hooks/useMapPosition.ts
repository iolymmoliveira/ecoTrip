import { useState } from 'react';
import { useTripStore } from '@/stores/useTripStore';
import { DEFAULT_POSITION } from '@/lib/constants/map';

export const useMapPosition = (target: 'origin' | 'destination') => {
  const locationData = useTripStore((state) => state[target]);

  const position: [number, number] =
    typeof locationData?.latitude === 'number' &&
    typeof locationData?.longitude === 'number'
      ? [locationData.latitude, locationData.longitude]
      : DEFAULT_POSITION;

  const [initialCenter] = useState<[number, number]>(() => position);

  return { position, initialCenter };
};
