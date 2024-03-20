describe('Renewal postcode page ', function () {
  it('should prevent access', function () {
    cy.visit('/renewal-postcode', {failOnStatusCode: false});
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
  });

  it('should allow access if the user visits all the pages in order', function () {
    cy.visit('/renewal-postcode');
    cy.get('h1').should('contain', 'What is your postcode?');
  });

  it('should display error if the user submits an empty form', function () {
    cy.visit('/renewal-postcode');
    cy.get('h1').should('contain', 'What is your postcode?');

    cy.get('#main-content form button.naturescot-forward-button').click();

    cy.get('h2#error-summary-title').should('contain', 'There is a problem');

    cy.get('.govuk-error-summary ul li a').should('contain', 'Enter your postcode');
  });

  it('should display error if the user submits an invalid postcode', function () {
    cy.visit('/renewal-postcode');
    cy.get('h1').should('contain', 'What is your postcode?');

    cy.get('input[type="text"]#renewal-postcode').type('NOTAVALIDPOSTCODE', {delay: 1});

    cy.get('#main-content form button.naturescot-forward-button').click();

    cy.get('h2#error-summary-title').should('contain', 'There is a problem');

    cy.get('.govuk-error-summary ul li a').should('contain', 'Enter a valid postcode');
  });

  it('should navigate to address page on valid form submission', function () {
    cy.visit('/renewal-postcode');
    cy.get('h1').should('contain', 'What is your postcode?');

    cy.get('input[type="text"]#renewal-postcode').type('IV3 8NW', {delay: 1});

    cy.get('#main-content form button.naturescot-forward-button').click();

    cy.get('h1').should('contain', 'Renewal email success');
  });
});
