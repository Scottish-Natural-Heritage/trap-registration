describe('Renewal success page ', function () {
  it('should prevent access', function () {
    cy.visit('/renewal-success', {failOnStatusCode: false});
    cy.get('h2').should('contain', 'What happens next');
  });
});
