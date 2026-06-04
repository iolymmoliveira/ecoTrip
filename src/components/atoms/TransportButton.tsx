'use client';

import React from 'react';

interface TransportButtonProps {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
  onClick: () => void;
  testId: string;
}

export const TransportButton: React.FC<TransportButtonProps> = ({
  label,
  icon: Icon,
  isActive,
  onClick,
  testId,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={testId}
      data-active={isActive}
      aria-label={`Transporte por ${label}`}
      aria-pressed={isActive}
      className={`
        flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border text-xs font-medium transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--primary) focus:ring-offset-2 w-full
        ${
          isActive
            ? 'border-(--primary) bg-(--primary)/10 text-(--primary)'
            : 'border-(--border) bg-(--bg-card) text-(--text-muted) hover:bg-(--bg-card-secondary) hover:text-(--text-main)'
        }
      `}
    >
      <Icon className="h-5 w-5" />
      <span className="truncate max-w-full">{label}</span>
    </button>
  );
};
