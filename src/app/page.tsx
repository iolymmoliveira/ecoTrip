'use client';

import { InteractiveMap } from '@/components/molecules';
import CalculatorForm from '@/components/organisms/CalculatorForm';
import ResultSection from '@/components/organisms/ResultSection';
import { copy } from '@/lib/copy';
import { CalculatorInputs, calculatorSchema } from '@/schemas/calculator';
import { useTripStore } from '@/stores/useTripStore';
import { calculateTripEmissions } from '@/lib/services/calculatorService';

export default function Home() {
  const { results, setResults, currentTransport } = useTripStore();

  const handleCalculateTrip = async (data: CalculatorInputs) => {
    useTripStore.setState({ isCalculating: true, errorMessage: null });
    try {
      const validated = calculatorSchema.parse(data);
      const emissionsResult = calculateTripEmissions(validated);
      setResults(emissionsResult);
    } catch (error) {
      useTripStore.setState({
        isCalculating: false,
        errorMessage: copy.error,
      });
      throw error;
    }
  };

  const getImpactLevel = (emissions: number) => {
    if (emissions < 50) return 'low';
    if (emissions < 200) return 'medium';
    return 'high';
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center w-full max-w-4xl mx-auto p-4 gap-6">
      <div className="w-full">
        <InteractiveMap target="origin" />
      </div>

      <section className="w-full rounded-2xl border border-(--border) bg-(--bg-card) p-6 shadow-sm">
        <CalculatorForm onCalculate={handleCalculateTrip} />
      </section>

      {results && (
        <section className="w-full rounded-2xl border border-(--border) bg-(--bg-card) p-6 shadow-sm">
          <ResultSection
            totalEmissions={results.totalEmissions}
            perCapitaEmissions={results.perCapitaEmissions}
            impactLevel={getImpactLevel(results.perCapitaEmissions)}
            treesToOffset={results.trees}
            comparisons={results.transportEmissions}
            currentTransport={currentTransport}
            distance={results.distance}
            formulaUsed={results.formulaUsed}
          />
        </section>
      )}
    </div>
  );
}
