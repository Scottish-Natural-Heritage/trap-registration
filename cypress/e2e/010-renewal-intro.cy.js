describe('Renewal intro page', function () {
  beforeEach(() => {
    cy.visit('/renewal-intro');
    cy.get('h1').should('contain', 'Apply for trap renewals');

    cy.get('#main-content form button.naturescot-forward-button').click();

    cy.url().should('include', '/renewal-registration');
    cy.get('h1').should('contain', 'Renewal registration number');
  });
});
