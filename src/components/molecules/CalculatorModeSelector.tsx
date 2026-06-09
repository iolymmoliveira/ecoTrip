'use client';

import { Button } from '@/components/atoms/Button';
import { copy } from '@/lib/constants/copy';
import { useTripStore } from '@/stores/useTripStore';

export const CalculatorModeSelector = () => {
  const { mode, setMode } = useTripStore();

  const options = [
    { value: 'simple', label: copy.labels.modes.simple },
    { value: 'custom', label: copy.labels.modes.custom },
  ] as const;

  return (
    <div className="flex gap-2">
      {options.map(({ value, label }) => (
        <Button
          key={value}
          type="button"
          variant={mode === value ? 'primary' : 'secondary'}
          className="rounded-xl px-4 py-2 text-sm font-medium"
          onClick={() => setMode(value)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};
