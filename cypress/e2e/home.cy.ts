describe('Home', () => {
  it('shows ecoTrip button', () => {
    cy.visit('/');
    cy.contains('EcoTrip').should('be.visible');
  });
});
