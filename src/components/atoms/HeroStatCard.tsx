import React from 'react';

export interface HeroStatCardProps {
  icon: string;
  label: string;
  value: string;
}

export const HeroStatCard: React.FC<HeroStatCardProps> = ({
  icon,
  label,
  value,
}) => {
  return (
    <article
      className="flex flex-col gap-1 px-4 py-3 min-w-[130px] rounded-xl border border-(--border) bg-(--bg-card)/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-200"
      aria-label={`${label}: ${value}`}
    >
      <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-(--text-muted)">
        <span aria-hidden="true">{icon}</span>
        {label}
      </span>
      <span className="text-lg font-extrabold tracking-tight text-(--text-main)">
        {value}
      </span>
    </article>
  );
};
