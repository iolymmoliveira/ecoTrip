'use client';

import { InteractiveMap } from '@/components/molecules';
import CalculatorForm from '@/components/organisms/CalculatorForm';
import { HeroSection } from '@/components/organisms/HeroSection';
import ResultSection from '@/components/organisms/ResultSection';
import { copy } from '@/lib/constants/copy';
import { CalculatorInputs, calculatorSchema } from '@/schemas/calculator';
import { useTripStore } from '@/stores/useTripStore';
import { calculateTripEmissions } from '@/services/calculatorService';
import { logger, trackBusinessEvent } from '@/lib/observability';

export default function Home() {
  const { results, setResults, currentTransport } = useTripStore();

  const handleCalculateTrip = async (data: CalculatorInputs) => {
    useTripStore.setState({ isCalculating: true, errorMessage: null });
    try {
      const validated = calculatorSchema.parse(data);
      const emissionsResult = calculateTripEmissions(validated);
      setResults(emissionsResult);
      trackBusinessEvent('calculator.calculate.success', {
        transport: currentTransport,
        mode: validated.mode,
        distanceOverride: Boolean(validated.distanceOverride),
      });
    } catch (error) {
      logger.error('Falha ao calcular emissões', error, {
        transport: currentTransport,
        mode: data.mode,
      });
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
    <>
      <HeroSection
        title={copy.hero.title}
        subtitle={copy.hero.subtitle}
        ctaPrimaryDesktop={copy.hero.ctaPrimaryDesktop}
        ctaPrimaryMobile={copy.hero.ctaPrimaryMobile}
        ctaSecondary={copy.hero.ctaSecondary}
        calculatorSectionId="calculadora"
        comparisonSectionId="comparativos"
      />

      <div className="flex flex-col flex-1 items-center justify-center w-full max-w-4xl mx-auto p-4 gap-6">
        <div className="w-full">
          <InteractiveMap target="origin" />
        </div>

        <section
          id="calculadora"
          className="w-full rounded-2xl border border-(--border) bg-(--bg-card) p-6 shadow-sm scroll-mt-20"
          aria-label="Calculadora de emissões de CO₂"
        >
          <CalculatorForm onCalculate={handleCalculateTrip} />
        </section>

        {results && (
          <section
            id="comparativos"
            className="w-full rounded-2xl border border-(--border) bg-(--bg-card) p-6 shadow-sm scroll-mt-20"
            aria-label="Comparativo de emissões por transporte"
          >
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
    </>
  );
}
