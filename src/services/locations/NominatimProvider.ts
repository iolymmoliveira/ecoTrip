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

  async reverseGeocode(lat: number, lng: number): Promise<string> {
    const response = await fetch(`/api/geocode-reverse?lat=${lat}&lng=${lng}`);
    if (!response.ok) throw new Error('Failed to reverse geocode');
    const data = await response.json();
    return data.address;
  }
}
