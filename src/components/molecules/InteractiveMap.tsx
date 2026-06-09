'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useTripStore } from '@/stores/useTripStore';
import { NominatimProvider } from '@/services/locations/NominatimProvider';
import { logger, trackBusinessEvent } from '@/lib/observability';
import { useMapIcon } from '@/hooks/useMapIcon';
import { useMapPosition } from '@/hooks/useMapPosition';
import { MAP_ATTRIBUTION, MAP_TILES_URL } from '@/lib/constants/map';
import type L from 'leaflet';

const MapContainer = dynamic(
  () => import('react-leaflet').then((m) => m.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((m) => m.TileLayer),
  { ssr: false },
);
const Marker = dynamic(() => import('react-leaflet').then((m) => m.Marker), {
  ssr: false,
});
const MapCenterUpdater = dynamic(
  () =>
    import('@/components/atoms/MapCenterUpdater').then(
      (m) => m.MapCenterUpdater,
    ),
  { ssr: false },
);

interface InteractiveMapProps {
  target?: 'origin' | 'destination';
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ target }) => {
  const markerRef = useRef<L.Marker>(null);
  const providerRef = useRef(new NominatimProvider());
  const { customIcon } = useMapIcon();
  const selectedLocationTarget = useTripStore(
    (state) => state.selectedLocationTarget,
  );

  const effectiveTarget = selectedLocationTarget || target || 'origin';

  const { position, initialCenter } = useMapPosition(effectiveTarget);
  const setOrigin = useTripStore((state) => state.setOrigin);
  const setDestination = useTripStore((state) => state.setDestination);

  const handleDragEnd = async () => {
    const marker = markerRef.current;
    if (!marker) return;
    const { lat, lng } = marker.getLatLng();

    try {
      const resolvedAddress = await providerRef.current.reverseGeocode(
        lat,
        lng,
      );
      const updatedLocation = {
        address: resolvedAddress,
        latitude: lat,
        longitude: lng,
      };

      trackBusinessEvent('map.reverseGeocode.success', {
        target: effectiveTarget,
        lat,
        lng,
      });

      if (effectiveTarget === 'origin') {
        setOrigin(updatedLocation);
      } else {
        setDestination(updatedLocation);
      }
    } catch (error) {
      logger.error('Erro ao processar geocoding reverso no arraste', error, {
        lat,
        lng,
        target: effectiveTarget,
      });
      trackBusinessEvent('map.reverseGeocode.failure', {
        target: effectiveTarget,
        lat,
        lng,
      });
    }
  };

  if (!customIcon) {
    return (
      <div className="flex h-72 w-full items-center justify-center rounded-xl border border-(--border) bg-(--bg-card)">
        <span className="text-sm text-(--text-muted)">Carregando mapa...</span>
      </div>
    );
  }

  return (
    <div className="h-72 w-full overflow-hidden rounded-xl border border-(--border) shadow-sm">
      <MapContainer
        center={initialCenter}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <MapCenterUpdater position={position} />

        <TileLayer attribution={MAP_ATTRIBUTION} url={MAP_TILES_URL} />

        <Marker
          ref={markerRef}
          position={position}
          draggable
          icon={customIcon}
          eventHandlers={{ dragend: handleDragEnd }}
        />
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
