import { useTripStore } from './useTripStore';

describe('useTripStore (Zustand)', () => {
  beforeEach(() => {
    // Reseta o estado do store antes de cada teste
    useTripStore.getState().resetCalculator();
  });

  it('should initialize with correct default values', () => {
    const state = useTripStore.getState();

    expect(state.mode).toBe('simple');
    expect(state.origin).toBeNull();
    expect(state.destination).toBeNull();
    expect(state.passengers).toBe(1);
    expect(state.results).toBeNull();
  });

  it('should update trip inputs correctly through actions', () => {
    const mockLocation = {
      address: 'Curitiba, PR',
      latitude: -25.4296,
      longitude: -49.2713,
    };

    useTripStore.getState().setMode('custom');
    useTripStore.getState().setOrigin(mockLocation);
    useTripStore.getState().setPassengers(4);

    const updatedState = useTripStore.getState();
    expect(updatedState.mode).toBe('custom');
    expect(updatedState.origin).toEqual(mockLocation);
    expect(updatedState.passengers).toBe(4);
  });
});
