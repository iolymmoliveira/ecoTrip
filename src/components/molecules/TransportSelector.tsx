'use client';

import React from 'react';
import {
  Plane,
  Car,
  BusFront,
  Train,
  Bike,
  Ship,
  Truck,
  Motorbike,
  Footprints,
} from 'lucide-react';
import { useTripStore, TransportType } from '@/stores/useTripStore';
import { TransportButton } from '../atoms/TransportButton';

interface TransportOption {
  id: TransportType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TRANSPORT_OPTIONS: TransportOption[] = [
  { id: 'car', label: 'Carro', icon: Car },
  { id: 'motorcycle', label: 'Moto', icon: Motorbike },
  { id: 'bus', label: 'Ônibus', icon: BusFront },
  { id: 'walking', label: 'A pé', icon: Footprints },
  { id: 'bicycle', label: 'Bicicleta', icon: Bike },
  { id: 'plane', label: 'Avião', icon: Plane },
  { id: 'truck', label: 'Caminhão', icon: Truck },
  { id: 'train', label: 'Trem', icon: Train },
  { id: 'ship', label: 'Navio', icon: Ship },
];

export const TransportSelector: React.FC = () => {
  const { mode, currentTransport, setTransport } = useTripStore();

  const visibleOptions =
    mode === 'custom' ? TRANSPORT_OPTIONS : TRANSPORT_OPTIONS.slice(0, 5);

  return (
    <div
      className="w-full flex flex-col gap-2 font-sans"
      data-testid="transport-selector-container"
    >
      <label className="text-sm font-medium text-(--text-main)">
        Meio de Transporte
      </label>

      <div
        className="grid grid-cols-4 sm:flex sm:flex-row items-center gap-2 w-full"
        role="group"
        aria-label="Selecione o meio de transporte"
      >
        {visibleOptions.map((option) => (
          <TransportButton
            key={option.id}
            label={option.label}
            icon={option.icon}
            isActive={currentTransport === option.id}
            onClick={() => setTransport(option.id)}
            testId={`transport-btn-${option.id}`}
          />
        ))}
      </div>
    </div>
  );
};
