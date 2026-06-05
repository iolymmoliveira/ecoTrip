'use client';
import {
  TransportSelector,
  LocationAutocomplete,
} from '@/components/molecules';

export default function Home() {
  const handleAddressSelect = (
    address: string,
    coordinates: { lat: number; lng: number },
  ) => {
    console.log('Endereço selecionado:', address);
    console.log('Coordenadas:', coordinates);
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <TransportSelector />
      <br />
      <LocationAutocomplete
        label="Origem"
        placeholder="Digite o local de partida..."
        onAddressSelect={handleAddressSelect}
      />
    </div>
  );
}
