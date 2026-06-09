import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/atoms/Button';
import {
  HeroQuickStats,
  QuickStat,
} from '@/components/molecules/HeroQuickStats';

const QUICK_STATS: QuickStat[] = [
  { icon: '🍃', label: 'Emissão média', value: '4.1 kg CO₂' },
  { icon: '🚗', label: 'Comparativo', value: 'Carro vs Ônibus' },
  { icon: '🌍', label: 'Percurso', value: '1.450 km' },
];

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaPrimaryDesktop: string;
  ctaPrimaryMobile: string;
  ctaSecondary: string;
  calculatorSectionId: string;
  comparisonSectionId: string;
}

interface HeroCTAsProps {
  primaryDesktopLabel: string;
  primaryMobileLabel: string;
  secondaryLabel: string;
  calculatorId: string;
  comparisonId: string;
}

const HeroCTAs: React.FC<HeroCTAsProps> = ({
  primaryDesktopLabel,
  primaryMobileLabel,
  secondaryLabel,
  calculatorId,
  comparisonId,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
      <Button
        variant="primary"
        onClick={() => scrollTo(calculatorId)}
        aria-label={`${primaryDesktopLabel} – ir para a calculadora`}
        className="hover:bg-primary-hover"
        data-testid="hero-cta-primary"
      >
        <span className="hidden sm:inline">{primaryDesktopLabel}</span>
        <span className="sm:hidden">{primaryMobileLabel}</span>
      </Button>

      <Button
        variant="secondary"
        onClick={() => scrollTo(comparisonId)}
        aria-label={`${secondaryLabel} – ir para comparativos`}
        data-testid="hero-cta-secondary"
      >
        {secondaryLabel}
      </Button>
    </div>
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  ctaPrimaryDesktop,
  ctaPrimaryMobile,
  ctaSecondary,
  calculatorSectionId,
  comparisonSectionId,
}) => {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden bg-(--bg-main) md:bg-linear-to-br md:from-(--bg-main) md:via-(--bg-card-secondary) md:to-(--border)"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-5 pt-12 pb-10 sm:px-8 md:px-12 md:pt-16 md:pb-14 lg:px-16 md:grid md:grid-cols-2 md:items-center md:gap-12 lg:gap-16">
        <div className="flex flex-col gap-6">
          <h1
            id="hero-heading"
            className="text-3xl font-extrabold leading-tight tracking-tight text-(--text-main) md:text-4xl lg:text-5xl"
          >
            {title}
          </h1>

          <div className="relative w-full aspect-4/3 max-h-72 md:hidden">
            <Image
              src="/ecotrip.png"
              alt="Globo terrestre com rotas de viagem e calculadora EcoTrip — ilustração da ferramenta de cálculo de emissões de CO₂"
              fill
              sizes="(max-width: 768px) 90vw"
              style={{ objectFit: 'contain' }}
              loading="eager"
              fetchPriority="high"
            />
          </div>

          <p className="text-base leading-relaxed text-(--text-muted) md:text-lg">
            {subtitle}
          </p>

          <HeroCTAs
            primaryDesktopLabel={ctaPrimaryDesktop}
            primaryMobileLabel={ctaPrimaryMobile}
            secondaryLabel={ctaSecondary}
            calculatorId={calculatorSectionId}
            comparisonId={comparisonSectionId}
          />

          <HeroQuickStats
            sectionTitle="Resultados Rápidos"
            stats={QUICK_STATS}
          />
        </div>

        <div className="hidden md:flex md:items-center md:justify-center relative w-full aspect-square">
          <Image
            src="/ecotrip.png"
            alt="Globo terrestre com rotas de viagem e calculadora EcoTrip — ilustração da ferramenta de cálculo de emissões de CO₂"
            fill
            sizes="(min-width: 768px) 50vw"
            style={{ objectFit: 'contain' }}
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
};
