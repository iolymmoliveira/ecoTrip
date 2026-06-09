export interface LocationSuggestion {
  id: string;
  text: string;
  lat: number;
  lng: number;
}

export interface LocationProvider {
  search(query: string, countryCodes: string[]): Promise<LocationSuggestion[]>;
}

export interface ReverseGeocodeResult {
  address: string;
}
