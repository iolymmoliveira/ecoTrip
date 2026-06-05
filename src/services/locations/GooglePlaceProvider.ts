import { Loader } from '@googlemaps/js-api-loader';
import { LocationProvider, LocationSuggestion } from './types';

export class GooglePlacesProvider implements LocationProvider {
  private isLoaded = false;
  private loader: Loader;
  private sessionToken: google.maps.places.AutocompleteSessionToken | null =
    null;

  constructor() {
    this.loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
      version: 'weekly',
      language: 'pt-BR',
    });
  }

  private async init(): Promise<void> {
    if (this.isLoaded) return;
    await this.loader.importLibrary('places');
    this.sessionToken = new google.maps.places.AutocompleteSessionToken();
    this.isLoaded = true;
  }

  async search(
    query: string,
    countryCodes: string[],
  ): Promise<LocationSuggestion[]> {
    await this.init();

    const { suggestions } =
      await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
        {
          input: query,
          includedRegionCodes: countryCodes,
          sessionToken: this.sessionToken ?? undefined,
        },
      );

    const validPredictions = suggestions.filter(
      (
        s,
      ): s is typeof s & {
        placePrediction: google.maps.places.PlacePrediction;
      } => s.placePrediction !== null,
    );

    const promises = validPredictions.map(async (suggestion, index) => {
      const place = suggestion.placePrediction.toPlace();
      await place.fetchFields({ fields: ['formattedAddress', 'location'] });

      return {
        id: `google-${index}-${suggestion.placePrediction.placeId}`,
        text:
          place.formattedAddress ?? suggestion.placePrediction.text.toString(),
        lat: place.location?.lat() ?? 0,
        lng: place.location?.lng() ?? 0,
      };
    });

    const results = await Promise.all(promises);
    this.sessionToken = new google.maps.places.AutocompleteSessionToken();

    return results.filter((r) => r.lat !== 0 && r.lng !== 0);
  }
}
