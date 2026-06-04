import React from 'react';
import Script from 'next/script';
import { themeScript } from '@/lib/themeScript';

export const ThemeScript: React.FC = () => {
  return (
    <Script
      id="theme-script"
      dangerouslySetInnerHTML={{ __html: themeScript }}
    />
  );
};
