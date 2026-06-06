'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calculator } from 'lucide-react';
import { CalculatorInputs, calculatorSchema } from '@/schemas/calculator';
import { useTripStore } from '@/stores/useTripStore';
import { copy } from '@/lib/copy';
import { TRANSPORT_RULES, FUEL_OPTIONS } from '@/lib/constants/transports';
import { Button } from '../atoms/Button';
import { z } from 'zod';
import {
  LocationAutocomplete,
  TransportSelector,
  CalculatorModeSelector,
  TransportComparisonSelector,
} from '../molecules';

type FormInputs = z.input<typeof calculatorSchema>;
type FormOutput = z.output<typeof calculatorSchema>;

interface CalculatorFormProps {
  onCalculate: (data: CalculatorInputs) => Promise<void> | void;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  onCalculate,
}) => {
  const {
    mode,
    currentTransport,
    origin,
    destination,
    passengers,
    weightPerPerson,
    luggageWeight,
    fuelType,
    compareTransport,
    comparisonTransports,
    distanceOverride,
    setOrigin,
    setDestination,
    setPassengers,
    setWeightPerPerson,
    setLuggageWeight,
    setFuelType,
    setCompareTransport,
    isCalculating,
  } = useTripStore();

  const transportRule = TRANSPORT_RULES[currentTransport];

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
      weightPerPerson,
      luggageWeight,
      fuelType,
      distanceOverride,
    },
  });

  useEffect(() => {
    setValue('mode', mode);
  }, [mode, setValue]);

  useEffect(() => {
    if (passengers > transportRule.maxPassengers) {
      setPassengers(transportRule.maxPassengers);
      setValue('passengers', transportRule.maxPassengers);
    }
  }, [
    currentTransport,
    passengers,
    transportRule.maxPassengers,
    setPassengers,
    setValue,
  ]);

  const handleOriginSelect = (
    address: string,
    coords: {
      lat: number;
      lng: number;
    },
  ) => {
    const originData = {
      address,
      latitude: coords.lat,
      longitude: coords.lng,
    };
    setOrigin(originData);
    setValue('origin', originData);
    clearErrors('origin');
  };

  const handleDestinationSelect = (
    address: string,
    coords: {
      lat: number;
      lng: number;
    },
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

  const onSubmit = async (data: FormOutput) => {
    try {
      await onCalculate({
        ...data,
        currentTransport,
        compareTransport,
        comparisonTransports,
      } as CalculatorInputs);
    } catch {
      setError('root', {
        type: 'manual',
        message: copy.error,
      });
    }
  };

  const activeError =
    errors.origin?.message ||
    errors.destination?.message ||
    errors.passengers?.message ||
    errors.weightPerPerson?.message ||
    errors.luggageWeight?.message ||
    errors.root?.message;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-6 font-sans"
      noValidate
    >
      <CalculatorModeSelector />

      <div className="flex flex-col gap-4 md:flex-row">
        <LocationAutocomplete
          target="origin"
          label="Origem"
          placeholder="Cidade, rua ou ponto de partida..."
          onAddressSelect={handleOriginSelect}
          testId="form-origin"
        />

        <LocationAutocomplete
          target="destination"
          label="Destino"
          placeholder="Cidade, rua ou ponto de chegada..."
          onAddressSelect={handleDestinationSelect}
          testId="form-destination"
        />
      </div>

      <TransportSelector />

      {mode === 'custom' && (
        <div className="grid gap-4 animate-fadeIn md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-(--text-main)">
              Passageiros
            </label>

            <input
              type="number"
              min={1}
              max={transportRule.maxPassengers}
              value={passengers}
              onChange={(e) => {
                const value = Number(e.target.value) || 1;
                const safeValue = Math.min(value, transportRule.maxPassengers);
                setPassengers(safeValue);
                setValue('passengers', safeValue);
              }}
              className="w-full rounded-xl border border-(--border) bg-(--bg-card) px-3 py-2.5"
            />

            <span className="text-xs text-(--text-muted)">
              Máximo: {transportRule.maxPassengers}
            </span>
          </div>

          {transportRule.supportsFuel && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-(--text-main)">
                Combustível
              </label>

              <select
                value={fuelType ?? ''}
                onChange={(e) => {
                  setFuelType(e.target.value);
                  setValue('fuelType', e.target.value);
                }}
                className="w-full rounded-xl border border-(--border) bg-(--bg-card) px-3 py-2.5"
              >
                <option value="">Selecione</option>

                {FUEL_OPTIONS.map((fuel) => (
                  <option key={fuel} value={fuel}>
                    {fuel}
                  </option>
                ))}
              </select>
            </div>
          )}

          {transportRule.supportsWeightPerPerson && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-(--text-main)">
                Peso por pessoa (kg)
              </label>

              <input
                type="number"
                min={0}
                value={weightPerPerson ?? ''}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setWeightPerPerson(value);
                  setValue('weightPerPerson', value);
                }}
                className="w-full rounded-xl border border-(--border) bg-(--bg-card) px-3 py-2.5"
              />
            </div>
          )}

          {transportRule.supportsLuggage && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-(--text-main)">
                Peso da mala (kg)
              </label>

              <input
                type="number"
                min={0}
                value={luggageWeight ?? ''}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setLuggageWeight(value);
                  setValue('luggageWeight', value);
                }}
                className="w-full rounded-xl border border-(--border) bg-(--bg-card) px-3 py-2.5"
              />
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between rounded-xl border border-(--border) p-4">
        <div className="flex flex-col">
          <span className="font-medium">Comparar outros meios</span>

          <span className="text-xs text-(--text-muted)">
            Exibir comparação de emissões
          </span>
        </div>

        <input
          type="checkbox"
          checked={compareTransport}
          onChange={(e) => setCompareTransport(e.target.checked)}
          className="h-5 w-5"
        />
      </div>

      {compareTransport && <TransportComparisonSelector />}

      <div
        aria-live="assertive"
        className="min-h-5 text-xs font-medium text-red-500"
      >
        {activeError && <span>⚠️ {activeError}</span>}
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={isCalculating}
        data-testid="form-submit-button"
        className="flex items-center justify-center gap-2"
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
