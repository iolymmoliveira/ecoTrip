import { TransportType } from '@/stores/useTripStore';

export interface TransportRule {
  maxPassengers: number;
  supportsFuel: boolean;
  supportsLuggage: boolean;
  supportsWeightPerPerson: boolean;
}

export const TRANSPORT_RULES: Record<TransportType, TransportRule> = {
  car: {
    maxPassengers: 8,
    supportsFuel: true,
    supportsLuggage: false,
    supportsWeightPerPerson: false,
  },

  motorcycle: {
    maxPassengers: 2,
    supportsFuel: true,
    supportsLuggage: false,
    supportsWeightPerPerson: false,
  },

  bus: {
    maxPassengers: 120,
    supportsFuel: false,
    supportsLuggage: false,
    supportsWeightPerPerson: false,
  },

  train: {
    maxPassengers: 1500,
    supportsFuel: false,
    supportsLuggage: false,
    supportsWeightPerPerson: false,
  },

  plane: {
    maxPassengers: 850,
    supportsFuel: false,
    supportsLuggage: true,
    supportsWeightPerPerson: true,
  },

  bicycle: {
    maxPassengers: 1,
    supportsFuel: false,
    supportsLuggage: false,
    supportsWeightPerPerson: false,
  },

  walking: {
    maxPassengers: 1,
    supportsFuel: false,
    supportsLuggage: false,
    supportsWeightPerPerson: false,
  },

  truck: {
    maxPassengers: 3,
    supportsFuel: true,
    supportsLuggage: false,
    supportsWeightPerPerson: false,
  },

  ship: {
    maxPassengers: 6000,
    supportsFuel: false,
    supportsLuggage: true,
    supportsWeightPerPerson: true,
  },
};

export const FUEL_OPTIONS = [
  'Gasolina',
  'Etanol',
  'Diesel',
  'GNV - Gás Natural Veicular',
  'Elétrico',
  'QAV - Querosene de Aviação',
  'SAF - Combustível Sustentável de Aviação',
  'GAV - Gasolina de Aviação',
  'Bunker - Óleo Combustível',
  'Diesel Marítimo',
  'GNL - Gás Natural Liquefeito',
] as const;
