import { ExternalApiError } from '@/lib/errors';
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
      throw new ExternalApiError(
        'Nominatim local API transfer failed',
        'Nominatim',
        response.status,
        { query, countries },
      );
    }

    return response.json();
  }

  async reverseGeocode(lat: number, lng: number): Promise<string> {
    const response = await fetch(`/api/geocode-reverse?lat=${lat}&lng=${lng}`);
    if (!response.ok) {
      throw new ExternalApiError(
        'Failed to reverse geocode',
        'Nominatim',
        response.status,
        { lat, lng },
      );
    }
    const data = await response.json();
    return data.address;
  }
}
