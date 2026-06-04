describe('Home & Transport Selector Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows ecoTrip button and initial layout structure', () => {
    cy.contains('EcoTrip').should('be.visible');
    cy.get('[data-testid="transport-selector-container"]').should('be.visible');
  });

  it('renders only 5 core transport options by default (Simple Mode)', () => {
    cy.get('[data-testid="transport-btn-car"]').should('be.visible');
    cy.get('[data-testid="transport-btn-motorcycle"]').should('be.visible');
    cy.get('[data-testid="transport-btn-bus"]').should('be.visible');
    cy.get('[data-testid="transport-btn-walking"]').should('be.visible');
    cy.get('[data-testid="transport-btn-bicycle"]').should('be.visible');
  });

  it('allows selecting a transport and updates its visual state', () => {
    cy.get('[data-testid="transport-btn-bus"]')
      .scrollIntoView()
      .should('be.visible');
    cy.get('[data-testid="transport-btn-bus"]').click();
    cy.get('[data-testid="transport-btn-bus"]', { timeout: 8000 }).should(
      'have.attr',
      'data-active',
    );
  });
});
