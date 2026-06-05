import { GooglePlacesProvider } from './locations/GooglePlaceProvider';
import { NominatimProvider } from './locations/NominatimProvider';
import { LocationProvider, LocationSuggestion } from './locations/types';

export class LocationService {
  private googleProvider: LocationProvider;
  private fallbackProvider: LocationProvider;

  constructor() {
    this.googleProvider = new GooglePlacesProvider();
    this.fallbackProvider = new NominatimProvider();
  }

  async getSuggestions(
    query: string,
    countryCodes: string[],
  ): Promise<LocationSuggestion[]> {
    try {
      return await this.googleProvider.search(query, countryCodes);
    } catch (error) {
      console.warn(
        'Google Places indisponível ou limite atingido. Acionando OpenStreetMap...',
        error,
      );
      return await this.fallbackProvider.search(query, countryCodes);
    }
  }
}

export const locationService = new LocationService();
