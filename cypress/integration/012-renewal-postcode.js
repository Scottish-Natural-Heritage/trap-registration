describe('Renewal postcode page ', function () {
  beforeEach(() => {
    cy.visit('/renewal-postcode');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/renewal-email-success');
  });
});
