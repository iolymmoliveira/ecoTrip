import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'default';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit = '',
  description,
  icon,
  badge,
  variant = 'default',
}) => {
  const variantStyles = {
    default: 'border-(--border) bg-(--bg-card) text-(--text-main)',
    primary:
      'border-emerald-500/20 bg-emerald-500/5 text-emerald-950 dark:text-emerald-50',
    success:
      'border-green-500/20 bg-green-500/5 text-green-950 dark:text-green-50',
    warning:
      'border-amber-500/20 bg-amber-500/5 text-amber-950 dark:text-amber-50',
    danger: 'border-rose-500/20 bg-rose-500/5 text-rose-950 dark:text-rose-50',
  };

  return (
    <div
      className={`relative flex flex-col justify-between p-5 rounded-2xl border transition-all hover:shadow-md ${variantStyles[variant]}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-(--text-muted)">
            {title}
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl tracking-tight font-bold text-(--text-main)">
              {value}
            </span>
            {unit && (
              <span className="text-sm font-semibold text-(--text-muted) ml-1">
                {unit}
              </span>
            )}
          </div>
        </div>
        {icon && (
          <div className="p-2.5 rounded-xl bg-(--bg-card-secondary) text-(--primary)">
            {icon}
          </div>
        )}
      </div>

      {(description || badge) && (
        <div className="flex items-center justify-between gap-4 mt-4 pt-3 border-t border-(--border)/30">
          {description && (
            <p className="text-xs text-(--text-muted) font-medium leading-relaxed">
              {description}
            </p>
          )}
          {badge}
        </div>
      )}
    </div>
  );
};
