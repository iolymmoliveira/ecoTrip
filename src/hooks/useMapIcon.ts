import { useEffect, useState } from 'react';
import type L from 'leaflet';
import { getMapIconSvg } from '@/components/atoms/icons/MapIcon';

export const useMapIcon = () => {
  const [customIcon, setCustomIcon] = useState<L.DivIcon | null>(null);

  useEffect(() => {
    import('leaflet').then((LInstance) => {
      const pin = LInstance.divIcon({
        className: 'custom-div-icon',
        html: getMapIconSvg(),
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });
      setCustomIcon(pin);
    });
  }, []);

  return { customIcon };
};
