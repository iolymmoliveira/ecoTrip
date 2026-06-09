'use client';

import React from 'react';
import { useTripStore } from '@/stores/useTripStore';
import { TransportButton } from '../atoms/TransportButton';
import { TRANSPORT_OPTIONS } from '@/lib/constants/transportOptions';

export const TransportSelector: React.FC = () => {
  const { mode, currentTransport, setTransport } = useTripStore();

  const visibleOptions =
    mode === 'custom' ? TRANSPORT_OPTIONS : TRANSPORT_OPTIONS.slice(0, 5);

  return (
    <div
      className="w-full flex flex-col gap-2 font-sans"
      data-testid="transport-selector-container"
    >
      <label className="text-sm font-medium text-(--text-main)">
        Meio de Transporte
      </label>

      <div
        className="grid grid-cols-4 sm:flex sm:flex-row items-center gap-2 w-full"
        role="group"
        aria-label="Selecione o meio de transporte"
      >
        {visibleOptions.map((option) => (
          <TransportButton
            key={option.id}
            label={option.label}
            icon={option.icon}
            isActive={currentTransport === option.id}
            onClick={() => setTransport(option.id)}
            testId={`transport-btn-${option.id}`}
          />
        ))}
      </div>
    </div>
  );
};
