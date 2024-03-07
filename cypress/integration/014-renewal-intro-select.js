describe('Renewal intro select page', function () {
  it('should navigate to next page', function () {
    cy.visit('/renewal-intro-select');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/renewal-check-answers');
  });
});
