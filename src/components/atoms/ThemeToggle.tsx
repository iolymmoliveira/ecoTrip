'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const sunVariants: Variants = {
  initial: { opacity: 0, rotate: -90, scale: 0.6 },
  animate: { opacity: 1, rotate: 0, scale: 1 },
  exit: { opacity: 0, rotate: 90, scale: 0.6 },
};

const moonVariants: Variants = {
  initial: { opacity: 0, rotate: 90, scale: 0.6 },
  animate: { opacity: 1, rotate: 0, scale: 1 },
  exit: { opacity: 0, rotate: -90, scale: 0.6 },
};

const iconTransition = { duration: 0.2, ease: 'easeInOut' } as const;

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) return <div className="w-9 h-9" aria-hidden="true" />;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-xl hover:bg-(--bg-card-secondary) text-(--text-muted) hover:text-(--text-main) transition-colors focus:outline-none focus:ring-2 focus:ring-(--primary) overflow-hidden w-9 h-9 flex items-center justify-center"
      aria-label={isDark ? 'Ativar Modo Claro' : 'Ativar Modo Escuro'}
      data-testid="theme-toggle"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            variants={sunVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={iconTransition}
            className="flex items-center justify-center text-amber-400"
          >
            <Sun className="h-5 w-5 fill-amber-400/10 animate-pulse" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            variants={moonVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={iconTransition}
            className="flex items-center justify-center text-slate-700"
          >
            <Moon className="h-5 w-5 fill-slate-700/10" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};
