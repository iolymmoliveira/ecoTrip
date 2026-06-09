import React from 'react';
import { TransportType } from '@/stores/useTripStore';
import { ImpactBadge, ImpactLevel } from '../atoms/ImpactBadge';
import { MetricCard } from '../molecules/MetricCard';
import { EmissionChart } from '../molecules/EmissionChart';
import { EquivalencyList } from '../molecules/EquivalencyList';
import { Leaf, Milestone, Compass, TreeDeciduous } from 'lucide-react';

interface ResultSectionProps {
  totalEmissions: number;
  perCapitaEmissions: number;
  impactLevel: ImpactLevel;
  treesToOffset: number;
  comparisons: Record<TransportType, number>;
  currentTransport: TransportType;
  distance: number;
  formulaUsed: string;
}

export const ResultSection: React.FC<ResultSectionProps> = ({
  totalEmissions,
  perCapitaEmissions,
  impactLevel,
  treesToOffset,
  comparisons,
  currentTransport,
  distance,
  formulaUsed,
}) => {
  return (
    <div
      className="w-full flex flex-col gap-6 animate-fadeIn"
      data-testid="result-section"
    >
      <div className="flex flex-col gap-1.5 border-b border-(--border) pb-4">
        <h2 className="text-xl font-bold tracking-tight text-(--text-main) flex items-center gap-2">
          <Leaf className="h-5 w-5 text-(--primary)" />
          Resultado da Análise Ambiental
        </h2>
        <p className="text-sm text-(--text-muted)">
          Confira o impacto ecológico detalhado da sua viagem e veja
          alternativas de compensação.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="flex flex-col gap-6">
          <MetricCard
            title="Emissão Individual"
            value={perCapitaEmissions}
            unit="kg CO₂"
            description="Emissões estimadas por passageiro para o percurso."
            icon={<Leaf className="h-6 w-6" />}
            badge={<ImpactBadge level={impactLevel} />}
            variant={
              impactLevel === 'low'
                ? 'success'
                : impactLevel === 'medium'
                  ? 'warning'
                  : 'danger'
            }
          />

          <MetricCard
            title="Compensação Necessária"
            value={treesToOffset}
            unit={treesToOffset === 1 ? 'árvore' : 'árvores'}
            description="Árvores necessárias por ano para neutralizar o CO₂ da viagem."
            icon={<TreeDeciduous className="h-6 w-6" />}
            variant="success"
          />
        </div>

        <div className="lg:col-span-1">
          <EmissionChart
            comparisons={comparisons}
            currentTransport={currentTransport}
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 p-5 rounded-2xl border border-(--border) bg-(--bg-card)">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-(--text-muted)">
                Resumo da Viagem
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs border-b border-(--border)/30 pb-2">
                <span className="text-(--text-muted) flex items-center gap-1.5">
                  <Milestone className="h-3.5 w-3.5" /> Distância
                </span>
                <span className="font-bold text-(--text-main)">
                  {distance} km
                </span>
              </div>

              <div className="flex items-center justify-between text-xs border-b border-(--border)/30 pb-2">
                <span className="text-(--text-muted) flex items-center gap-1.5">
                  <Compass className="h-3.5 w-3.5" /> Metodologia
                </span>
                <span className="font-bold text-(--text-main) text-right">
                  {formulaUsed}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-(--text-muted)">
                  Emissão Total da Viagem
                </span>
                <span className="font-bold text-(--text-main)">
                  {totalEmissions} kg CO₂
                </span>
              </div>
            </div>
          </div>

          <EquivalencyList co2Kg={perCapitaEmissions} />
        </div>
      </div>
    </div>
  );
};
export default ResultSection;
