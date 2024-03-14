describe('Renewal registration page ', function () {
  it('should prevent access', function () {
    cy.visit('/renewal-registration', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('Address page valid postcode scenario', function () {
  beforeEach(() => {
    cy.visit('/renewal-intro');

    cy.get('#main-content form button.naturescot-forward-button').click();

    cy.get('h1').should('contain', 'Renewal registration number');
  });
});
