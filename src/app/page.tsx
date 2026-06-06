'use client';
import {
  TransportSelector,
  LocationAutocomplete,
  InteractiveMap,
} from '@/components/molecules';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

export default function Home() {
  const handleAddressSelect = (
    address: string,
    coordinates: { lat: number; lng: number },
  ) => {
    console.log('Endereço selecionado:', address);
    console.log('Coordenadas:', coordinates);
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center  w-full max-w-4xl mx-auto">
      <TransportSelector />
      <br />
      <LocationAutocomplete
        label="Origem"
        placeholder="Digite o local de partida..."
        onAddressSelect={handleAddressSelect}
      />
      <br />
      <div className="w-full">
        <InteractiveMap target="origin" />
      </div>
    </div>
  );
}
