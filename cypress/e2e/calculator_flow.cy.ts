describe('Fluxo principal - Cálculo de Emissões (E2E)', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/location-search*', {
      statusCode: 200,
      body: [
        {
          id: 'osm-sp',
          text: 'São Paulo - SP, Brasil',
          lat: -23.5505,
          lng: -46.6333,
        },
        {
          id: 'osm-rj',
          text: 'Rio de Janeiro - RJ, Brasil',
          lat: -22.9068,
          lng: -43.1729,
        },
      ],
    }).as('locationSearch');
    cy.intercept('GET', '/api/geocode-reverse*', {
      statusCode: 200,
      body: { address: 'Mocked address' },
    }).as('reverse');

    cy.visit('/');
  });

  it('preenche origem e destino, seleciona transporte e mostra resultado', () => {
    cy.get('[data-testid="form-origin-input"]').type('São');
    cy.wait('@locationSearch');
    cy.get('#form-origin-suggestions').contains('São Paulo').click();
    cy.get('[data-testid="form-destination-input"]').type('Rio');
    cy.wait('@locationSearch');
    cy.get('#form-destination-suggestions').contains('Rio de Janeiro').click();
    cy.get('[data-testid="transport-btn-car"]').click();
    cy.get('[data-testid="transport-btn-car"]').should(
      'have.attr',
      'data-active',
    );
    cy.get('[data-testid="form-submit-button"]').click();
    cy.get('[data-testid="result-section"]', { timeout: 10000 }).should(
      'be.visible',
    );
    cy.get('[data-testid="result-section"]').contains(
      'Resultado da Análise Ambiental',
    );
    cy.get('[data-testid="result-section"]').contains(/\d+\s*km/);
    cy.get('[data-testid="result-section"]').contains(/kg CO₂/);
  });
});
