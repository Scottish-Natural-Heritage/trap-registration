describe('Renewal check answers page ', function () {
  beforeEach(() => {
    cy.visit('/renewal-check-answers');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/success');
  });
});
