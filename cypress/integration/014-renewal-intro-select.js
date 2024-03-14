describe('Renewal intro select page ', function () {
  beforeEach(() => {
    cy.visit('/renewal-intro-select');

    cy.get('h1').should('contain', 'Renewal intro select');
    cy.get('#main-content form button.naturescot-forward-button').click();

    cy.url().should('include', '/renewal-check-answers');
    cy.get('h1').should('contain', 'Renewal check answers');
  });
});
