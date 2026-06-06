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

import { TransportType } from '@/stores/useTripStore';

export interface TransportOption {
  id: TransportType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const TRANSPORT_OPTIONS: TransportOption[] = [
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
