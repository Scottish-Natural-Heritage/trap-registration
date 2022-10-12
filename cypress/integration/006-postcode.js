describe('Postcode page directly', function () {
  it('should prevent access', function () {
    cy.visit('/postcode', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});
