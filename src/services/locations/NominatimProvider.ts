import { LocationProvider, LocationSuggestion } from './types';

export class NominatimProvider implements LocationProvider {
  async search(
    query: string,
    countryCodes: string[],
  ): Promise<LocationSuggestion[]> {
    const countries = countryCodes.join(',').toLowerCase();
    const response = await fetch(
      `/api/location-search?q=${encodeURIComponent(query)}&countries=${countries}`,
    );

    if (!response.ok) {
      throw new Error('Nominatim local API transfer failed');
    }

    return response.json();
  }
}
