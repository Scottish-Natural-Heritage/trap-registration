describe('Renewal email success page ', function () {
  it('should prevent access', function () {
    cy.visit('/renewal-email-success', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('Move to next page', function () {
  beforeEach(() => {
    cy.visit('/renewal-intro');
    cy.get('h1').should('contain', 'Renewal intro');
    cy.get('#main-content form button.naturescot-forward-button').click();

    cy.get('h1').should('contain', 'Renewal registration number');
    cy.get('#main-content form button.naturescot-forward-button').click();

    cy.get('h1').should('contain', 'Renewal postcode');
    cy.get('#main-content form button.naturescot-forward-button').click();

    cy.get('h1').should('contain', 'Renewal email success');
  });
});
