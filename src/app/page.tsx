'use client';

import { InteractiveMap } from '@/components/molecules';
import CalculatorForm from '@/components/organisms/CalculatorForm';
import { copy } from '@/lib/copy';
import { CalculatorInputs } from '@/schemas/calculator';
import { useTripStore } from '@/stores/useTripStore';

async function fetchTripEmissions(payload: CalculatorInputs) {
  const response = await fetch('/api/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Failed to calculate');
  return response.json();
}

export default function Home() {
  const { results, setResults } = useTripStore();

  const handleCalculateTrip = async (data: CalculatorInputs) => {
    useTripStore.setState({ isCalculating: true, errorMessage: null });
    try {
      const emissionsResult = await fetchTripEmissions(data);
      setResults(emissionsResult);
    } catch (error) {
      useTripStore.setState({
        isCalculating: false,
        errorMessage: copy.error,
      });
      throw error;
    }
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
        <section className="w-full animate-fadeIn p-4 bg-green-50 rounded-xl text-green-800 border border-green-200">
          <p className="font-semibold">
            {copy.result.main.replace('{co2Kg}', results.co2Kg.toString())}
          </p>
          <p className="text-sm opacity-90 mt-1">
            {copy.result.equivalent.replace(
              '{trees}',
              results.trees.toString(),
            )}
          </p>
        </section>
      )}
    </div>
  );
}
