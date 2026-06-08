import { CalculatorInputs } from '@/schemas/calculator';
import { TransportType } from '@/stores/useTripStore';

export interface CalculationResult {
  distance: number;
  totalEmissions: number;
  perCapitaEmissions: number;
  formulaUsed: string;
  co2Kg: number;
  trees: number;
  transportEmissions: Record<TransportType, number>;
}

interface TransportFactor {
  baseFactor: number;
  isColetivo: boolean;
  fuelMultipliers?: Record<string, number>;
  degradationFactor?: number;
}

export const TRANSPORT_FACTORS: Record<TransportType, TransportFactor> = {
  car: {
    baseFactor: 0.18,
    isColetivo: true,
    fuelMultipliers: {
      Gasolina: 1.0,
      Etanol: 0.42,
      Diesel: 1.15,
      'GNV - Gás Natural Veicular': 0.75,
      Elétrico: 0.1,
    },
    degradationFactor: 0.0005,
  },
  motorcycle: {
    baseFactor: 0.08,
    isColetivo: true,
    fuelMultipliers: {
      Gasolina: 1.0,
      Etanol: 0.42,
    },
    degradationFactor: 0.0002,
  },
  bus: {
    baseFactor: 0.03,
    isColetivo: true,
  },
  train: {
    baseFactor: 0.015,
    isColetivo: true,
  },
  plane: {
    baseFactor: 0.15,
    isColetivo: true,
    degradationFactor: 0.0001,
  },
  truck: {
    baseFactor: 0.27,
    isColetivo: false,
    fuelMultipliers: {
      Diesel: 1.0,
      Gasolina: 0.9,
      Etanol: 0.5,
      'GNV - Gás Natural Veicular': 0.78,
      Elétrico: 0.15,
    },
    degradationFactor: 0.0008,
  },
  ship: {
    baseFactor: 0.025,
    isColetivo: true,
    degradationFactor: 0.00005,
  },
  bicycle: {
    baseFactor: 0,
    isColetivo: false,
  },
  walking: {
    baseFactor: 0,
    isColetivo: false,
  },
};

export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(2));
}

export function calculateTripEmissions(
  inputs: CalculatorInputs,
): CalculationResult {
  const mode = inputs.mode;
  const transportType = inputs.currentTransport as TransportType;
  const passengers = Math.max(1, inputs.passengers || 1);
  let distance = 0;
  let formulaUsed = '';

  if (inputs.distanceOverride && inputs.distanceOverride > 0) {
    distance = inputs.distanceOverride;
    formulaUsed = 'Distância Manual';
  } else if (inputs.origin && inputs.destination) {
    distance = calculateHaversineDistance(
      inputs.origin.latitude,
      inputs.origin.longitude,
      inputs.destination.latitude,
      inputs.destination.longitude,
    );
    formulaUsed = 'Haversine';
  }

  const calculateSingle = (type: TransportType, isMainTransport = false) => {
    const factorConfig = TRANSPORT_FACTORS[type];
    if (factorConfig.baseFactor === 0) {
      return { total: 0, perCapita: 0 };
    }

    if (mode === 'simple' || !isMainTransport) {
      if (factorConfig.isColetivo) {
        if (type === 'car' || type === 'motorcycle') {
          const total = distance * factorConfig.baseFactor;
          const perCapita = total / passengers;
          return { total, perCapita };
        } else {
          const perCapita = distance * factorConfig.baseFactor;
          const total = perCapita * passengers;
          return { total, perCapita };
        }
      } else {
        const total = distance * factorConfig.baseFactor;
        const perCapita = total / passengers;
        return { total, perCapita };
      }
    } else {
      let baseFactor = factorConfig.baseFactor;

      if (factorConfig.fuelMultipliers && inputs.fuelType) {
        const multiplier = factorConfig.fuelMultipliers[inputs.fuelType];
        if (multiplier !== undefined) {
          baseFactor *= multiplier;
        }
      }

      let totalEmissions = 0;
      if (factorConfig.degradationFactor) {
        let additionalWeight = 0;

        if (type === 'plane' || type === 'ship') {
          const personWeight = inputs.weightPerPerson ?? 70;
          const luggage = inputs.luggageWeight ?? 0;
          additionalWeight = passengers * personWeight + luggage;
        } else if (type === 'truck') {
          additionalWeight = (passengers - 1) * 70;
        } else if (type === 'car' || type === 'motorcycle') {
          additionalWeight = (passengers - 1) * 70;
        }

        totalEmissions =
          distance *
          (baseFactor + additionalWeight * factorConfig.degradationFactor);
      } else {
        if (
          factorConfig.isColetivo &&
          type !== 'car' &&
          type !== 'motorcycle'
        ) {
          totalEmissions = distance * baseFactor * passengers;
        } else {
          totalEmissions = distance * baseFactor;
        }
      }

      const perCapitaEmissions = totalEmissions / passengers;
      return { total: totalEmissions, perCapita: perCapitaEmissions };
    }
  };

  const { total, perCapita } = calculateSingle(transportType, true);

  if (mode === 'custom') {
    formulaUsed += ' + Degradabilidade';
  } else {
    formulaUsed += ' + Fator de Emissão Base';
  }

  const transportEmissions = {} as Record<TransportType, number>;
  const allTransports: TransportType[] = [
    'car',
    'bus',
    'train',
    'plane',
    'motorcycle',
    'walking',
    'bicycle',
    'truck',
    'ship',
  ];

  allTransports.forEach((type) => {
    const res = calculateSingle(type, false);
    transportEmissions[type] = parseFloat(res.perCapita.toFixed(2));
  });

  const co2Kg = parseFloat(perCapita.toFixed(2));
  const trees = Math.max(1, Math.ceil(co2Kg / 15));

  return {
    distance: parseFloat(distance.toFixed(2)),
    totalEmissions: parseFloat(total.toFixed(2)),
    perCapitaEmissions: co2Kg,
    formulaUsed,
    co2Kg,
    trees,
    transportEmissions,
  };
}
