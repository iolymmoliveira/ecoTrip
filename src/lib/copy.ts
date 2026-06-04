export interface CopyStrings {
  h1: string;
  subtitle: string;
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
  h1: 'Descubra o impacto da sua viagem',
  subtitle: 'Calcule emissões de CO2 e escolha rotas mais sustentáveis',
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
