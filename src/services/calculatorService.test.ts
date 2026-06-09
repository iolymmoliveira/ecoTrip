import { CalculatorInputs } from '@/schemas/calculator';
import {
  calculateHaversineDistance,
  calculateTripEmissions,
} from './calculatorService';

describe('Calculator Service', () => {
  describe('calculateHaversineDistance', () => {
    it('should calculate distance correctly between two coordinates', () => {
      // Coordinates for Sao Paulo (approx)
      const lat1 = -23.5505;
      const lon1 = -46.6333;
      // Coordinates for Rio de Janeiro (approx)
      const lat2 = -22.9068;
      const lon2 = -43.1729;

      const distance = calculateHaversineDistance(lat1, lon1, lat2, lon2);
      expect(distance).toBeGreaterThan(350);
      expect(distance).toBeLessThan(370);
    });
  });

  describe('calculateTripEmissions', () => {
    const defaultPayload: CalculatorInputs = {
      mode: 'simple',
      origin: { address: 'A', latitude: -23.5505, longitude: -46.6333 },
      destination: { address: 'B', latitude: -22.9068, longitude: -43.1729 },
      passengers: 1,
      currentTransport: 'car',
      compareTransport: false,
    };

    it('should calculate emissions in simple mode using Haversine', () => {
      const result = calculateTripEmissions(defaultPayload);
      expect(result.distance).toBeGreaterThan(350);
      expect(result.totalEmissions).toBeCloseTo(result.distance * 0.18, 1);
      expect(result.perCapitaEmissions).toBeCloseTo(result.totalEmissions, 1);
      expect(result.formulaUsed).toContain('Haversine');
    });

    it('should use distance override if provided', () => {
      const payload: CalculatorInputs = {
        ...defaultPayload,
        distanceOverride: 100,
      };
      const result = calculateTripEmissions(payload);
      expect(result.distance).toBe(100);
      expect(result.totalEmissions).toBeCloseTo(100 * 0.18, 1);
    });

    it('should handle custom mode with fuel type and degradation', () => {
      const payload: CalculatorInputs = {
        ...defaultPayload,
        mode: 'custom',
        distanceOverride: 100,
        fuelType: 'Etanol',
        passengers: 4,
      };
      // Car baseFactor (0.18) * Etanol multiplier (0.42) = 0.0756
      // Degradation weight = (passengers - 1) * 70 = 3 * 70 = 210 kg
      // Degradation factor = 0.0005
      // Total factor = 0.0756 + 210 * 0.0005 = 0.0756 + 0.105 = 0.1806
      // Total emissions = 100 * 0.1806 = 18.06
      // Per capita = 18.06 / 4 = 4.515
      const result = calculateTripEmissions(payload);
      expect(result.totalEmissions).toBeCloseTo(18.06, 1);
      expect(result.perCapitaEmissions).toBeCloseTo(4.52, 1);
    });
  });
});
