'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTripStore } from '@/stores/useTripStore';
import { NominatimProvider } from '@/services/locations/NominatimProvider';
import type L from 'leaflet';

const MapContainer = dynamic(
  () => import('react-leaflet').then((m) => m.MapContainer),
  {
    ssr: false,
  },
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((m) => m.TileLayer),
  {
    ssr: false,
  },
);

const Marker = dynamic(() => import('react-leaflet').then((m) => m.Marker), {
  ssr: false,
});

const MapCenterUpdater = dynamic(
  () =>
    import('react-leaflet').then((m) => {
      return function CenterUpdater({
        position,
      }: {
        position: [number, number];
      }) {
        const map = m.useMap();

        useEffect(() => {
          map.setView(position);
        }, [map, position]);

        return null;
      };
    }),
  {
    ssr: false,
  },
);

interface InteractiveMapProps {
  target: 'origin' | 'destination';
}

const DEFAULT_POSITION: [number, number] = [-25.4284, -49.2733];

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ target }) => {
  const markerRef = useRef<L.Marker>(null);
  const providerRef = useRef(new NominatimProvider());
  const [customIcon, setCustomIcon] = useState<L.DivIcon | null>(null);
  const locationData = useTripStore((state) => state[target]);
  const setOrigin = useTripStore((state) => state.setOrigin);
  const setDestination = useTripStore((state) => state.setDestination);

  useEffect(() => {
    import('leaflet').then((L) => {
      const pin = L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div
            style="
              width:32px;
              height:32px;
              background:#10b981;
              border-radius:9999px;
              border:2px solid white;
              display:flex;
              align-items:center;
              justify-content:center;
              box-shadow:0 4px 12px rgba(0,0,0,.2);
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.74a2 2 0 0 1-2.602 0C8.139 20.193 2.6 14.993 2.6 10a8 8 0 1 1 14.8 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      setCustomIcon(pin);
    });
  }, []);

  const position: [number, number] =
    typeof locationData?.latitude === 'number' &&
    typeof locationData?.longitude === 'number'
      ? [locationData.latitude, locationData.longitude]
      : DEFAULT_POSITION;

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

      if (target === 'origin') {
        setOrigin(updatedLocation);
      } else {
        setDestination(updatedLocation);
      }
    } catch (error) {
      console.error('Erro ao processar geocoding reverso no arraste:', error);
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
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{
          height: '100%',
          width: '100%',
        }}
      >
        <MapCenterUpdater position={position} />

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          ref={markerRef}
          position={position}
          draggable
          icon={customIcon}
          eventHandlers={{
            dragend: handleDragEnd,
          }}
        />
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
