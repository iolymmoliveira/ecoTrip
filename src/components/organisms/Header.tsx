'use client';

import React from 'react';
import { Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ThemeToggle } from '../atoms/ThemeToggle';
import { GitHubIcon } from '../atoms/icons/GitHubIcon';
import { copy } from '@/lib/copy';

export const Header: React.FC = () => {
  return (
    <header
      data-testid="app-header"
      className="sticky top-0 z-50 w-full bg-(--bg-main) backdrop-blur-md border-b border-(--border) transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
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
          <ThemeToggle />
          <Link
            href={copy.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl hover:bg-(--bg-card-secondary) text-(--text-muted) hover:text-(--text-main) transition-all focus:outline-none focus:ring-2 focus:ring-(--primary)"
            aria-label="Código fonte no GitHub"
            data-testid="github-link"
          >
            <GitHubIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
};
