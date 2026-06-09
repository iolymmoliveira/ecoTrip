'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { copy } from '@/lib/constants/copy';
import { LinkedInIcon } from '../atoms/icons/LinkedInIcon';

const MotionLink = motion.create(Link);

export const Footer: React.FC = () => {
  const { mounted } = useTheme();

  if (!mounted) {
    return (
      <footer
        className="w-full border-t border-(--border) bg-(--bg-main) py-6 transition-colors duration-300"
        aria-hidden="true"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10" />
      </footer>
    );
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer
      data-testid="app-footer"
      className="w-full border-t border-(--border) bg-(--bg-main) text-(--text-muted) transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-sans">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center gap-1.5 font-semibold text-(--text-main)">
            <Leaf className="h-4 w-4 text-(--primary) fill-(--primary)/10" />
            <span>EcoTrip</span>
          </div>
          <p className="text-xs sm:text-sm">
            &copy; {currentYear} | All rights reserved.
          </p>
        </div>

        <div className="text-xs text-(--text-muted)/80 flex items-center gap-1">
          Developed with{' '}
          <span className="text-(--primary) font-serif text-sm">💚</span>
        </div>

        <div className="flex items-center gap-2">
          <MotionLink
            href={copy.links.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl hover:bg-(--bg-card-secondary) text-(--text-muted) hover:text-(--text-main) transition-all focus:outline-none focus:ring-2 focus:ring-(--primary)"
            aria-label="Perfil profissional no LinkedIn"
            data-testid="linkedin-link"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LinkedInIcon className="h-5 w-5" />
          </MotionLink>
        </div>
      </div>
    </footer>
  );
};
