export interface HeroCopy {
  title: string;
  subtitle: string;
  ctaPrimaryDesktop: string;
  ctaPrimaryMobile: string;
  ctaSecondary: string;
  quickStatsSectionTitle: string;
}

export interface EducationCopy {
  sectionTitle: string;
  cards: {
    id: string;
    title: string;
    description: string;
    imageSrc?: string;
    imageAlt?: string;
    href?: string;
  }[];
}

export interface CopyStrings {
  hero: HeroCopy;
  labels: {
    simple: string;
    custom: string;
    description: string;
  };
  result: {
    main: string;
    equivalent: string;
  };
  emptyState: string;
  error: string;
  seo: {
    title: string;
    description: string;
    ogImage: string;
  };
  links: {
    github: string;
    linkedIn: string;
  };
  education: EducationCopy;
}

export const copy: CopyStrings = {
  hero: {
    title: 'Descubra o impacto ambiental das suas viagens.',
    subtitle:
      'Calcule emissões de CO2, compare meios de transporte e escolha rotas mais sustentáveis',
    ctaPrimaryDesktop: 'Calcular Agora',
    ctaPrimaryMobile: 'Calculadora Agora',
    ctaSecondary: 'Ver Comparativos',
    quickStatsSectionTitle: 'Resultados Rápidos',
  },
  labels: {
    simple: 'Modo Simples',
    custom: 'Modo Personalizado',
    description:
      'Modo Simples usa estimativas padrão; Personalizado permite ajustar passageiros e distância.',
  },
  result: {
    main: 'Sua viagem emite {co2Kg} kg de CO2',
    equivalent: 'Isso equivale a {trees} árvores por mês (estimado)',
  },
  emptyState: 'Insira origem e destino para calcular as emissões.',
  error:
    'Não conseguimos calcular a rota. Verifique origem/destino e tente novamente.',
  seo: {
    title: 'EcoTrip — Calculadora de Emissões de Viagem',
    description:
      'Calcule o CO2 da sua viagem e descubra opções mais sustentáveis. Compare carros, ônibus, trem e avião.',
    ogImage: '/og-image.png',
  },
  links: {
    github: 'https://github.com/iolymmoliveira',
    linkedIn: 'https://www.linkedin.com/in/iolymmoliveira',
  },
  education: {
    sectionTitle: 'Conscientização Ambiental',
    cards: [
      {
        id: 'card-co2',
        title: 'Por que reduzir CO₂?',
        description:
          'Entenda como pequenos desvios nas suas rotas diárias ajudam a combater o aquecimento global e a melhorar a qualidade do ar nas cidades.',
        imageSrc: '/globe.png',
        imageAlt: 'Ilustração vetorial do planeta Terra cercado por árvores.',
      },
      {
        id: 'card-transport',
        title: 'Transportes mais sustentáveis',
        description:
          'Descubra o impacto real de cada modal — de trens a veículos elétricos — e aprenda a priorizar opções de menor pegada ecológica.',
        imageSrc: '/transport.png',
        imageAlt:
          'Ilustração de um ônibus ecológico verde em uma estrada com um selo de aprovação, simboliza a escolha do transporte coletivo como uma opção sustentável e validada para a redução de emissões.',
      },
    ],
  },
};
