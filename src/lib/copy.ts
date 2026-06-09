export interface HeroCopy {
  title: string;
  subtitle: string;
  ctaPrimaryDesktop: string;
  ctaPrimaryMobile: string;
  ctaSecondary: string;
  quickStatsSectionTitle: string;
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
};
