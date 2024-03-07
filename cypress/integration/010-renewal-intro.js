describe('Renewal intro page', function () {
  it('should navigate to next page', function () {
    cy.visit('/renewal-intro');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/renewal-registration');
  });
});
