'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalculatorInputs, calculatorSchema } from '@/schemas/calculator';
import { useTripStore } from '@/stores/useTripStore';
import { Calculator } from 'lucide-react';
import { LocationAutocomplete, TransportSelector } from '../molecules';
import { copy } from '@/lib/copy';
import { Button } from '../atoms/Button';

interface FormInputs {
  mode: 'simple' | 'custom';
  origin: CalculatorInputs['origin'] | null;
  destination: CalculatorInputs['destination'] | null;
  passengers: number;
  distanceOverride?: number;
}

interface CalculatorFormProps {
  onCalculate: (data: CalculatorInputs) => Promise<void> | void;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  onCalculate,
}) => {
  const {
    mode,
    origin,
    destination,
    passengers,
    distanceOverride,
    setOrigin,
    setDestination,
    setPassengers,
    setDistanceOverride,
    isCalculating,
  } = useTripStore();

  const {
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      mode,
      origin,
      destination,
      passengers,
      distanceOverride,
    },
  });

  const handleOriginSelect = (
    address: string,
    coords: { lat: number; lng: number },
  ) => {
    const originData = { address, latitude: coords.lat, longitude: coords.lng };
    setOrigin(originData);
    setValue('origin', originData);
    clearErrors('origin');
  };

  const handleDestinationSelect = (
    address: string,
    coords: { lat: number; lng: number },
  ) => {
    const destinationData = {
      address,
      latitude: coords.lat,
      longitude: coords.lng,
    };
    setDestination(destinationData);
    setValue('destination', destinationData);
    clearErrors('destination');
  };

  const onSubmit = async (data: FormInputs) => {
    try {
      await onCalculate(data as CalculatorInputs);
    } catch {
      setError('root', {
        type: 'manual',
        message: copy.error,
      });
    }
  };

  React.useEffect(() => {
    setValue('mode', mode);
  }, [mode, setValue]);

  const activeError =
    errors.origin?.message ||
    errors.destination?.message ||
    errors.passengers?.message ||
    errors.distanceOverride?.message ||
    errors.root?.message;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-5 font-sans"
      noValidate
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <LocationAutocomplete
          label="Origem"
          placeholder="Cidade, rua ou ponto de partida..."
          onAddressSelect={handleOriginSelect}
          testId="form-origin"
        />
        <LocationAutocomplete
          label="Destino"
          placeholder="Cidade, rua ou ponto de chegada..."
          onAddressSelect={handleDestinationSelect}
          testId="form-destination"
        />
      </div>

      <TransportSelector />

      {mode === 'custom' && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 animate-fadeIn">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="passengers-input"
              className="text-sm font-medium text-(--text-main)"
            >
              Nº de Passageiros
            </label>
            <input
              id="passengers-input"
              type="number"
              min={1}
              max={100}
              value={passengers}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10) || 1;
                setPassengers(val);
                setValue('passengers', val);
              }}
              className="w-full rounded-xl border border-(--border) bg-(--bg-card) px-3 py-2.5 text-sm text-(--text-main) outline-none transition-all focus:ring-2 focus:ring-(--primary)"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="distance-input"
              className="text-sm font-medium text-(--text-main)"
            >
              Distância Manual (km){' '}
              <span className="text-xs text-(--text-muted)">(Opcional)</span>
            </label>
            <input
              id="distance-input"
              type="number"
              min={0}
              placeholder="Ex: 450"
              value={distanceOverride ?? ''}
              onChange={(e) => {
                const val =
                  e.target.value === '' ? undefined : Number(e.target.value);
                setDistanceOverride(val);
                setValue('distanceOverride', val);
              }}
              className="w-full rounded-xl border border-(--border) bg-(--bg-card) px-3 py-2.5 text-sm text-(--text-main) outline-none transition-all focus:ring-2 focus:ring-(--primary)"
            />
          </div>
        </div>
      )}

      <div
        aria-live="assertive"
        id="calculator-error-region"
        className="min-h-5 text-xs font-medium text-red-500 transition-all duration-200"
      >
        {activeError && (
          <span className="flex items-center gap-1 animate-shake">
            ⚠️ {activeError}
          </span>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={isCalculating}
        data-testid="form-submit-button"
        className="flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
      >
        <Calculator
          className={`h-4 w-4 ${isCalculating ? 'animate-spin' : ''}`}
        />
        {isCalculating ? 'Calculando impacto...' : 'Calcular Emissões'}
      </Button>
    </form>
  );
};

export default CalculatorForm;
