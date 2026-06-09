import React from 'react';
import { TransportType } from '@/stores/useTripStore';
import { useTripStore } from '@/stores/useTripStore';
import { TRANSPORT_OPTIONS } from '@/lib/constants/transportOptions';

interface EmissionChartProps {
  comparisons: Record<TransportType, number>;
  currentTransport: TransportType;
}

export const EmissionChart: React.FC<EmissionChartProps> = ({
  comparisons,
  currentTransport,
}) => {
  const maxVal = Math.max(...Object.values(comparisons), 0.1);
  const { comparisonTransports } = useTripStore();
  const sortedOptions = [...TRANSPORT_OPTIONS]
    .map((option) => ({
      ...option,
      value: comparisons[option.id] ?? 0,
    }))
    .filter(
      (opt) =>
        opt.id === currentTransport || comparisonTransports.includes(opt.id),
    )
    .sort((a, b) => b.value - a.value);

  return (
    <div className="flex flex-col gap-4 p-5 rounded-2xl border border-(--border) bg-(--bg-card)">
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-(--text-muted)">
          Comparativo de Emissões
        </h3>
        <p className="text-xs text-(--text-muted)">
          Emissões de CO₂ equivalente por passageiro (kg CO₂)
        </p>
      </div>

      <div className="flex flex-col gap-3.5 mt-2">
        {sortedOptions.map((opt) => {
          const percentage = Math.min(
            100,
            Math.max(2, (opt.value / maxVal) * 100),
          );
          const isSelected = opt.id === currentTransport;
          const Icon = opt.icon;

          return (
            <div
              key={opt.id}
              className={`flex flex-col gap-1 p-2 rounded-xl transition-all ${
                isSelected
                  ? 'bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500/20 dark:border-emerald-400/20'
                  : 'hover:bg-(--bg-card-secondary)/40 border border-transparent'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2 text-(--text-main)">
                  <Icon
                    className={`h-4 w-4 ${isSelected ? 'text-(--primary)' : 'text-(--text-muted)'}`}
                  />
                  <span>{opt.label}</span>
                  {isSelected && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-(--primary) bg-(--bg-card) border border-(--primary)/20 px-1.5 py-0.5 rounded">
                      Seu Meio
                    </span>
                  )}
                </div>
                <span className="text-(--text-main)">{opt.value} kg</span>
              </div>

              <div className="h-2.5 w-full bg-(--bg-card-secondary) rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                    isSelected ? 'bg-(--primary)' : 'bg-(--text-muted)/40'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
