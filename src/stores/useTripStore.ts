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
  selectedLocationTarget: 'origin' | 'destination';
  passengers: number;
  distanceOverride?: number;
  weightPerPerson?: number;
  luggageWeight?: number;
  fuelType?: string;
  compareTransport: boolean;
  comparisonTransports: TransportType[];
  results: TripResult | null;
  isCalculating: boolean;
  errorMessage: string | null;

  setMode: (mode: 'simple' | 'custom') => void;
  setTransport: (transport: TransportType) => void;
  setOrigin: (origin: LocationData | null) => void;
  setDestination: (destination: LocationData | null) => void;
  setSelectedLocationTarget: (target: 'origin' | 'destination') => void;
  setPassengers: (passengers: number) => void;
  setDistanceOverride: (distance?: number) => void;
  setWeightPerPerson: (weight: number) => void;
  setLuggageWeight: (weight: number) => void;
  setFuelType: (fuel: string) => void;
  setCompareTransport: (compare: boolean) => void;
  setComparisonTransports: (transports: TransportType[]) => void;
  toggleComparisonTransport: (transport: TransportType) => void;
  setResults: (results: TripResult | null) => void;
  resetCalculator: () => void;
}

const initialInputs = {
  mode: 'simple' as const,
  currentTransport: 'car' as TransportType,
  origin: null,
  destination: null,
  selectedLocationTarget: 'origin' as const,
  passengers: 1,
  distanceOverride: undefined,
  weightPerPerson: undefined,
  luggageWeight: undefined,
  fuelType: undefined,
  compareTransport: false,
  comparisonTransports: [] as TransportType[],
};

export const useTripStore = create<TripState>((set) => ({
  ...initialInputs,
  results: null,
  isCalculating: false,
  errorMessage: null,

  setMode: (mode) => set({ mode }),
  setTransport: (transport) => set({ currentTransport: transport }),
  setOrigin: (origin) => set({ origin, errorMessage: null }),
  setDestination: (destination) => set({ destination, errorMessage: null }),
  setSelectedLocationTarget: (selectedLocationTarget) =>
    set({ selectedLocationTarget }),
  setPassengers: (passengers) => set({ passengers }),
  setDistanceOverride: (distanceOverride) => set({ distanceOverride }),
  setWeightPerPerson: (weightPerPerson) => set({ weightPerPerson }),
  setLuggageWeight: (luggageWeight) => set({ luggageWeight }),
  setFuelType: (fuelType) => set({ fuelType }),
  setCompareTransport: (compareTransport) => set({ compareTransport }),
  setComparisonTransports: (comparisonTransports) =>
    set({ comparisonTransports }),
  toggleComparisonTransport: (transport) =>
    set((state) => {
      const exists = state.comparisonTransports.includes(transport);
      return {
        comparisonTransports: exists
          ? state.comparisonTransports.filter((item) => item !== transport)
          : [...state.comparisonTransports, transport],
      };
    }),
  setResults: (results) => set({ results, isCalculating: false }),
  resetCalculator: () =>
    set({ ...initialInputs, results: null, errorMessage: null }),
}));
