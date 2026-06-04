import { create } from 'zustand';
import { LocationData } from '@/schemas/calculator';

export type TransportType =
  | 'plane'
  | 'car'
  | 'bus'
  | 'train'
  | 'motorcycle'
  | 'walking'
  | 'bicycle'
  | 'truck'
  | 'ship';

interface TripResult {
  co2Kg: number;
  trees: number;
  transportEmissions: {
    car: number;
    bus: number;
    train: number;
    plane: number;
    motorcycle: number;
    walking: number;
    bicycle: number;
    truck: number;
    ship: number;
  };
}

interface TripState {
  mode: 'simple' | 'custom';
  currentTransport: TransportType;
  origin: LocationData | null;
  destination: LocationData | null;
  passengers: number;
  distanceOverride?: number;

  results: TripResult | null;
  isCalculating: boolean;
  errorMessage: string | null;

  setMode: (mode: 'simple' | 'custom') => void;
  setTransport: (transport: TransportType) => void;
  setOrigin: (origin: LocationData | null) => void;
  setDestination: (destination: LocationData | null) => void;
  setPassengers: (passengers: number) => void;
  setDistanceOverride: (distance?: number) => void;
  setResults: (results: TripResult | null) => void;
  resetCalculator: () => void;
}

const initialInputs = {
  mode: 'simple' as const,
  currentTransport: 'car' as TransportType,
  origin: null,
  destination: null,
  passengers: 1,
  distanceOverride: undefined,
};

export const useTripStore = create<TripState>((set) => ({
  ...initialInputs,
  results: null,
  isCalculating: false,
  errorMessage: null,

  setMode: (mode) => set(() => ({ mode })),
  setTransport: (transport) => set(() => ({ currentTransport: transport })),
  setOrigin: (origin) => set(() => ({ origin, errorMessage: null })),
  setDestination: (destination) =>
    set(() => ({ destination, errorMessage: null })),
  setPassengers: (passengers) => set(() => ({ passengers })),
  setDistanceOverride: (distanceOverride) => set(() => ({ distanceOverride })),
  setResults: (results) => set(() => ({ results, isCalculating: false })),

  resetCalculator: () =>
    set(() => ({
      ...initialInputs,
      results: null,
      errorMessage: null,
    })),
}));
