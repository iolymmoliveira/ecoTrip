'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const MotionLink = motion(Link);

export const Footer: React.FC = () => {
  const { mounted } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      data-testid="app-footer"
      className="w-full bg-(--bg-main) border-t border-(--border) py-8 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-(--text-muted)">
          <div className="text-(--primary) flex items-center justify-center">
            <Leaf className="h-4 w-4 fill-(--primary)/10" />
          </div>
          <span className="text-sm font-medium tracking-tight">
            EcoTrip &copy; {currentYear}
          </span>
        </div>

        <div className="text-sm text-(--text-muted) font-sans">
          <span>Developed with 💚 by </span>
          <MotionLink
            href="https://github.com/iolymmoliveira"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-(--text-main) hover:text-(--primary) transition-colors focus:outline-none focus:ring-2 focus:ring-(--primary) rounded px-1"
            whileHover={{ y: -1 }}
            whileTap={{ y: 0 }}
            animate={mounted ? { opacity: 1 } : { opacity: 0 }}
          >
            Ioly Oliveira
          </MotionLink>
        </div>
      </div>
    </footer>
  );
};
