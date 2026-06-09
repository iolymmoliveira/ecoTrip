'use client';

import { LocationSuggestion } from '@/services/locations/types';
import { locationService } from '@/services/LocationService';
import { logger, trackBusinessEvent } from '@/lib/observability';
import { useState, useEffect, useRef } from 'react';

interface UsePlaceAutocompleteProps {
  onAddressSelect: (
    address: string,
    coordinates: { lat: number; lng: number },
  ) => void;
  countryCodes: string[];
  debounceTime: number;
}

export const usePlaceAutocomplete = ({
  onAddressSelect,
  countryCodes,
  debounceTime,
}: UsePlaceAutocompleteProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const searchPlaces = async (query: string) => {
    if (query.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      setIsSearching(true);
      trackBusinessEvent('autocomplete.search', { query, countryCodes });
      const data = await locationService.getSuggestions(query, countryCodes);

      if (isMountedRef.current) {
        setSuggestions(data);
        setShowSuggestions(data.length > 0);
      }
    } catch (error) {
      logger.error('Erro na orquestração de busca', error, {
        query,
        countryCodes,
      });
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
    }, debounceTime);
  };

  const handleSuggestionSelect = (suggestion: LocationSuggestion) => {
    setInputValue(suggestion.text);
    setShowSuggestions(false);
    onAddressSelect(suggestion.text, {
      lat: suggestion.lat,
      lng: suggestion.lng,
    });
  };

  return {
    inputValue,
    isSearching,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    handleInputChange,
    handleSuggestionSelect,
  };
};
