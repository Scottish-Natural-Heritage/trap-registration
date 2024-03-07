describe('Renewal registration page ', function () {
  beforeEach(() => {
    cy.visit('/renewal-registration');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/renewal-postcode');
  });
});
