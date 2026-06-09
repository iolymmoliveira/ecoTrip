import { GooglePlacesProvider } from './locations/GooglePlaceProvider';
import { NominatimProvider } from './locations/NominatimProvider';
import { LocationProvider, LocationSuggestion } from './locations/types';
import { logger, trackExternalService } from '@/lib/observability';

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
      const suggestions = await this.googleProvider.search(query, countryCodes);
      trackExternalService('GooglePlaces', 200, undefined, {
        query,
        countryCodes,
        fallback: false,
      });
      return suggestions;
    } catch (error) {
      logger.warn(
        'Google Places indisponível ou limite atingido. Acionando OpenStreetMap...',
        { query, countryCodes, error: String(error) },
      );
      trackExternalService('GooglePlaces', undefined, undefined, {
        query,
        countryCodes,
        fallback: true,
      });
      return await this.fallbackProvider.search(query, countryCodes);
    }
  }
}

export const locationService = new LocationService();
