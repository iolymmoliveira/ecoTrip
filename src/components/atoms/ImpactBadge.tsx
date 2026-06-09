import React from 'react';

export type ImpactLevel = 'low' | 'medium' | 'high';

interface ImpactBadgeProps {
  level: ImpactLevel;
}

export const ImpactBadge: React.FC<ImpactBadgeProps> = ({ level }) => {
  const configs = {
    low: {
      bg: 'bg-emerald-500/10 dark:bg-emerald-400/10',
      border: 'border-emerald-500/20 dark:border-emerald-400/20',
      text: 'text-emerald-700 dark:text-emerald-400',
      label: 'Baixo Impacto',
    },
    medium: {
      bg: 'bg-amber-500/10 dark:bg-amber-400/10',
      border: 'border-amber-500/20 dark:border-amber-400/20',
      text: 'text-amber-700 dark:text-amber-400',
      label: 'Médio Impacto',
    },
    high: {
      bg: 'bg-rose-500/10 dark:bg-rose-400/10',
      border: 'border-rose-500/20 dark:border-rose-400/20',
      text: 'text-rose-700 dark:text-rose-400',
      label: 'Alto Impacto',
    },
  };

  const current = configs[level];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${current.bg} ${current.border} ${current.text}`}
      data-testid={`impact-badge-${level}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
      {current.label}
    </span>
  );
};
