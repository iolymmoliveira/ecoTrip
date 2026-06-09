import React from 'react';
import { EducationCopy } from '@/lib/constants/copy';
import { EducationCard } from '@/components/molecules/EducationCard';

interface EducationSectionProps {
  data: EducationCopy;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ data }) => {
  return (
    <section
      id="educacao"
      aria-labelledby="education-heading"
      className="w-full rounded-2xl border border-border bg-bg-card p-6 shadow-sm scroll-mt-20 mt-6"
    >
      <h2
        id="education-heading"
        className="text-2xl font-bold text-text-main mb-6 tracking-tight"
      >
        {data.sectionTitle}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {data.cards.map((card) => (
          <EducationCard
            key={card.id}
            title={card.title}
            description={card.description}
            imageSrc={card.imageSrc}
            imageAlt={card.imageAlt}
            href={card.href}
          />
        ))}
      </div>
    </section>
  );
};
