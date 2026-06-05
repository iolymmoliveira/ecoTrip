'use client';

import React, { useEffect, useRef } from 'react';
import { Loader2, MapPin } from 'lucide-react';
import { usePlaceAutocomplete } from '@/hooks/usePlaceAutocomplete';

interface LocationAutocompleteProps {
  label: string;
  placeholder: string;
  onAddressSelect: (
    address: string,
    coordinates: { lat: number; lng: number },
  ) => void;
  testId?: string;
}

export const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  label,
  placeholder,
  onAddressSelect,
  testId = 'location-autocomplete',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    inputValue,
    isLoaded,
    loadError,
    isSearching,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    handleInputChange,
    handleSuggestionSelect,
  } = usePlaceAutocomplete({ onAddressSelect });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowSuggestions]);

  if (loadError) {
    return (
      <div className="font-sans text-xs font-medium text-red-500">
        Erro ao carregar o seletor de mapas.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex w-full flex-col gap-1.5 font-sans"
      data-testid={`${testId}-container`}
    >
      <label className="text-sm font-medium text-(--text-main)">{label}</label>

      <div className="relative">
        <MapPin className="absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 text-(--text-muted) pointer-events-none" />

        {!isLoaded ? (
          <div className="flex w-full items-center gap-2 rounded-xl border border-(--border) bg-(--bg-card) py-2.5 pr-3 pl-10 text-sm text-(--text-muted)">
            <Loader2 className="h-4 w-4 animate-spin text-(--primary)" />
            <span>Carregando localizações...</span>
          </div>
        ) : (
          <>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              placeholder={placeholder}
              autoComplete="off"
              data-testid={`${testId}-input`}
              className="w-full rounded-xl border border-(--border) bg-(--bg-card) py-2.5 pr-10 pl-10 text-sm text-(--text-main) transition-all duration-200 placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--primary) focus:ring-offset-2"
            />

            {isSearching && (
              <Loader2 className="absolute top-1/2 right-3 z-10 h-4 w-4 -translate-y-1/2 animate-spin text-(--primary)" />
            )}

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-50 mt-1 max-h-72 w-full overflow-y-auto rounded-xl border border-(--border) bg-(--bg-card) shadow-lg">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    type="button"
                    onClick={() => handleSuggestionSelect(suggestion)}
                    className="flex w-full items-start gap-2 px-3 py-3 text-left text-sm text-(--text-main) transition-colors hover:bg-(--bg-hover)"
                  >
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-(--text-muted)" />
                    <span>{suggestion.text}</span>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
