'use client';

import React, { useEffect, useRef, useId } from 'react';
import { Loader2, MapPin } from 'lucide-react';
import { usePlaceAutocomplete } from '@/hooks/usePlaceAutocomplete';
import { useTripStore } from '@/stores/useTripStore';

interface LocationAutocompleteProps {
  label: string;
  placeholder: string;
  onAddressSelect: (
    address: string,
    coordinates: {
      lat: number;
      lng: number;
    },
  ) => void;
  countryCodes?: string[];
  debounceTime?: number;
  testId?: string;
  target?: 'origin' | 'destination';
}

export const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  label,
  placeholder,
  onAddressSelect,
  countryCodes = ['BR'],
  debounceTime = 700,
  testId = 'location-autocomplete',
  target,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputId = useId();

  const {
    inputValue,
    isSearching,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    handleInputChange,
    handleSuggestionSelect,
  } = usePlaceAutocomplete({
    onAddressSelect,
    countryCodes,
    debounceTime,
  });

  const setSelectedLocationTarget = useTripStore(
    (state) => state.setSelectedLocationTarget,
  );

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

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowSuggestions]);

  return (
    <div
      ref={containerRef}
      className="flex w-full flex-col gap-1.5 font-sans"
      data-testid={`${testId}-container`}
    >
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-(--text-main)"
      >
        {label}
      </label>

      <div className="relative">
        <MapPin className="pointer-events-none absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 text-(--text-muted)" />

        <input
          id={inputId}
          name={testId}
          type="text"
          value={inputValue}
          placeholder={placeholder}
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showSuggestions}
          aria-controls={`${testId}-suggestions`}
          data-testid={`${testId}-input`}
          onChange={(event) => handleInputChange(event.target.value)}
          onFocus={() => {
            if (target) setSelectedLocationTarget(target);
            if (suggestions.length > 0) setShowSuggestions(true);
          }}
          className="
            w-full
            rounded-xl
            border
            border-(--border)
            bg-(--bg-card)
            py-2.5
            pr-10
            pl-10
            text-sm
            text-(--text-main)
            placeholder:text-(--text-muted)
            transition-all
            duration-200
            focus:outline-none
            focus:ring-2
            focus:ring-(--primary)
            focus:ring-offset-2
          "
        />

        {isSearching && (
          <Loader2 className="absolute top-1/2 right-3 z-10 h-4 w-4 -translate-y-1/2 animate-spin text-(--primary)" />
        )}

        {showSuggestions && suggestions.length > 0 && (
          <div
            id={`${testId}-suggestions`}
            role="listbox"
            className="
              absolute
              z-50
              mt-1
              max-h-72
              w-full
              overflow-y-auto
              rounded-xl
              border
              border-(--border)
              bg-(--bg-card)
              shadow-lg
            "
          >
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                type="button"
                role="option"
                aria-selected={false}
                onClick={() => handleSuggestionSelect(suggestion)}
                className="
                  flex
                  w-full
                  items-start
                  gap-2
                  px-3
                  py-3
                  text-left
                  text-sm
                  text-(--text-main)
                  transition-colors
                  hover:bg-(--bg-hover)
                "
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-(--text-muted)" />
                <span>{suggestion.text}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationAutocomplete;
