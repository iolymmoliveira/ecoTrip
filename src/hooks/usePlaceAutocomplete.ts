'use client';

import { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export type SuggestionItem = {
  id: string;
  text: string;
  prediction: google.maps.places.PlacePrediction;
};

interface UsePlaceAutocompleteProps {
  onAddressSelect: (
    address: string,
    coordinates: { lat: number; lng: number },
  ) => void;
}

export const usePlaceAutocomplete = ({
  onAddressSelect,
}: UsePlaceAutocompleteProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    const loadPlaces = async () => {
      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
          version: 'weekly',
          language: 'pt-BR',
        });

        await loader.importLibrary('places');

        if (isMountedRef.current) setIsLoaded(true);
      } catch (error) {
        console.error('Erro ao carregar Places API:', error);
        if (isMountedRef.current) setLoadError(true);
      }
    };

    loadPlaces();

    return () => {
      isMountedRef.current = false;
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const searchPlaces = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      setIsSearching(true);

      const { suggestions: results } =
        await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
          {
            input: query,
            includedRegionCodes: ['BR'],
          },
        );

      if (!isMountedRef.current) return;

      const mappedSuggestions: SuggestionItem[] = results
        .filter(
          (
            s,
          ): s is typeof s & {
            placePrediction: google.maps.places.PlacePrediction;
          } => s.placePrediction !== null,
        )
        .map((suggestion, index) => ({
          id: `${index}-${suggestion.placePrediction.placeId}`,
          text: suggestion.placePrediction.text.toString(),
          prediction: suggestion.placePrediction,
        }));

      setSuggestions(mappedSuggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Erro ao buscar sugestões:', error);
      if (isMountedRef.current) setSuggestions([]);
    } finally {
      if (isMountedRef.current) setIsSearching(false);
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      searchPlaces(value);
    }, 300);
  };

  const handleSuggestionSelect = async (suggestion: SuggestionItem) => {
    try {
      const place = suggestion.prediction.toPlace();
      await place.fetchFields({ fields: ['formattedAddress', 'location'] });

      if (!isMountedRef.current) return;

      const address = place.formattedAddress ?? suggestion.text;
      const lat = place.location?.lat();
      const lng = place.location?.lng();

      if (lat == null || lng == null) return;

      setInputValue(address);
      setShowSuggestions(false);
      onAddressSelect(address, { lat, lng });
    } catch (error) {
      console.error('Erro ao selecionar local:', error);
    }
  };

  return {
    inputValue,
    isLoaded,
    loadError,
    isSearching,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    handleInputChange,
    handleSuggestionSelect,
  };
};
