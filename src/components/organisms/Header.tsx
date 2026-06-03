'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Leaf, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const Header: React.FC = () => {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <header
      data-testid="app-header"
      className="sticky top-0 z-50 w-full bg-(--bg-main) backdrop-blur-md border-b border-(--border) transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="#"
          className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-(--primary) rounded-lg p-1"
          aria-label="EcoTrip Página Inicial"
          data-testid="logo-link"
        >
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="text-(--primary) flex items-center justify-center"
          >
            <Leaf className="h-6 w-6 fill-(--primary)/10" />
          </motion.div>
          <span className="font-sans font-bold text-xl tracking-tight bg-linear-to-r from-green-600 to-emerald-500 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
            EcoTrip
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-(--bg-card-secondary) text-(--text-muted) hover:text-(--text-main) transition-all focus:outline-none focus:ring-2 focus:ring-(--primary)"
            aria-label={
              mounted && theme === 'dark'
                ? 'Ativar Modo Claro'
                : 'Ativar Modo Escuro'
            }
            data-testid="theme-toggle"
            id="theme-toggle-btn"
          >
            {mounted && theme === 'dark' ? (
              <Sun className="h-5 w-5 text-amber-400 animate-pulse" />
            ) : (
              <Moon className="h-5 w-5 text-slate-700 hover:rotate-12 transition-transform" />
            )}
          </button>

          <Link
            href="https://github.com/iolymmoliveira/ecoTrip/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl hover:bg-(--bg-card-secondary) text-(--text-muted) hover:text-(--text-main) transition-all focus:outline-none focus:ring-2 focus:ring-(--primary)"
            aria-label="Código fonte no GitHub"
            data-testid="github-link"
          >
            <svg
              className="h-5 w-5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.061.069-.061 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
};
