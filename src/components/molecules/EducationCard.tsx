import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/atoms/Button';

interface EducationCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
}

export const EducationCard: React.FC<EducationCardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  href,
}) => {
  const isClickable = Boolean(href);

  return (
    <article className="group relative bg-bg-card-secondary border border-border rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-md focus-within:ring-2 focus-within:ring-primary">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="flex-1 order-2 md:order-1">
          <h3 className="text-xl md:text-2xl font-bold text-text-main mb-3 tracking-tight">
            {isClickable && href ? (
              <Link
                href={href}
                className="outline-none focus:underline group-hover:text-primary transition-colors duration-200"
              >
                {title}
              </Link>
            ) : (
              title
            )}
          </h3>
          <p className="text-sm md:text-base text-text-muted leading-relaxed">
            {description}
          </p>
        </div>

        {imageSrc && imageAlt && (
          <div className="relative w-full md:w-36 h-36 order-1 md:order-2 flex justify-center md:justify-end shrink-0 select-none">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={144}
              height={144}
              sizes="(max-width: 768px) 100vw, 144px"
              className="object-contain transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}
      </div>

      {isClickable && href && (
        <div className="mt-6 pt-2 order-3">
          <Button asChild variant="secondary">
            <Link href={href} tabIndex={-1}>
              Saiba mais
            </Link>
          </Button>
        </div>
      )}
    </article>
  );
};
