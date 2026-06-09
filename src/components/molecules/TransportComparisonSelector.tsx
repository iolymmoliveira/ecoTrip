'use client';

import { TransportButton } from '../atoms/TransportButton';
import { useTripStore, TransportType } from '@/stores/useTripStore';
import { TRANSPORT_OPTIONS } from '@/lib/constants/transportOptions';

export const TransportComparisonSelector = () => {
  const { currentTransport, comparisonTransports, toggleComparisonTransport } =
    useTripStore();

  const available = TRANSPORT_OPTIONS.filter(
    (transport) => transport.id !== currentTransport,
  );

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Comparar com</label>

      <div className="grid grid-cols-3 gap-2">
        {available.map((transport) => (
          <TransportButton
            key={transport.id}
            label={transport.label}
            icon={transport.icon}
            isActive={
              comparisonTransports?.includes(transport.id as TransportType) ??
              false
            }
            onClick={() =>
              toggleComparisonTransport(transport.id as TransportType)
            }
            testId={`compare-${transport.id}`}
          />
        ))}
      </div>
    </div>
  );
};
