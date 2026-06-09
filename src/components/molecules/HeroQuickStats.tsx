import React from 'react';
import { HeroStatCard } from '@/components/atoms/HeroStatCard';

export interface QuickStat {
  icon: string;
  label: string;
  value: string;
}

interface HeroQuickStatsProps {
  sectionTitle: string;
  stats: QuickStat[];
}

export const HeroQuickStats: React.FC<HeroQuickStatsProps> = ({
  sectionTitle,
  stats,
}) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-3 text-(--text-main) md:sr-only">
        {sectionTitle}
      </h2>

      <div
        className="flex flex-row gap-3 overflow-x-auto pb-1 scrollbar-none [-webkit-overflow-scrolling:touch]"
        role="list"
        aria-label={sectionTitle}
      >
        {stats.map((stat) => (
          <div key={stat.label} role="listitem" className="flex-shrink-0">
            <HeroStatCard
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
