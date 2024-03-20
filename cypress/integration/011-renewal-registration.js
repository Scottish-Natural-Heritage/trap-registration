describe('Renewal registration page ', function () {
  it('should prevent access', function () {
    cy.visit('/renewal-registration', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('Move to next page', function () {
  beforeEach(() => {
    cy.visit('/renewal-intro');

    cy.get('h1').should('contain', 'Renewal intro');
    cy.get('#main-content form button.naturescot-forward-button').click();
  });

  it('should allow access if the user visits all the pages in order', function () {
    cy.visit('/renewal-registration');
    cy.get('h1').should('contain', 'What is the registration number?');
  });

  it('Valid input followed by continue button should navigate to renewal postcode', () => {
    cy.visit('/renewal-registration');
    cy.get('input').type('12345');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/renewal-postcode');
    cy.get('h1').should('contain', 'Renewal postcode');
  });

  it('Empty input followed by continue button should present an error and ask user to re-enter', () => {
    cy.visit('/renewal-registration');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/renewal-registration');

    cy.get('h2#error-summary-title').should('contain', 'There is a problem');
    cy.get('#renewal-registration-number-error').should('contain', 'Enter the registration number');
  });

  it('Whitespace input followed by continue button should present an error and ask user to re-enter', () => {
    cy.visit('/renewal-registration');
    cy.get('input').type('     ');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/renewal-registration');

    cy.get('h2#error-summary-title').should('contain', 'There is a problem');
    cy.get('#renewal-registration-number-error').should('contain', 'Enter the registration number');
  });

  it('Invalid input followed by continue button should present an error and ask user to re-enter', () => {
    cy.visit('/renewal-registration');
    cy.get('input').type('123456');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/renewal-registration');

    cy.get('h2#error-summary-title').should('contain', 'There is a problem');
    cy.get('#renewal-registration-number-error').should('contain', 'Enter the registration number');
  });

  it('Invalid input followed by continue button should present an error and ask user to re-enter', () => {
    cy.visit('/renewal-registration');
    cy.get('input').type('abcde');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/renewal-registration');

    cy.get('h2#error-summary-title').should('contain', 'There is a problem');
    cy.get('#renewal-registration-number-error').should('contain', 'Enter the registration number');
  });
});
