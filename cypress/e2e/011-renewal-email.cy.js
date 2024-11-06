describe('Renewal email page ', function () {
  it('should prevent access', function () {
    cy.visit('/renewal-email', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('Move to next page', function () {
  beforeEach(() => {
    cy.visit('/renewal-intro');

    cy.get('h1').should('contain', 'Apply for trap renewals');
    cy.get('#main-content form button.naturescot-forward-button').click();
  });

  it('should allow access if the user visits all the pages in order', function () {
    cy.visit('/renewal-email');
    cy.get('h1').should('contain', 'What is your email address?');
  });

  it('should display error if the user submits an empty form', function () {
    cy.visit('/renewal-email');
    cy.get('h1').should('contain', 'What is your email address?');

    cy.get('#main-content form button.naturescot-forward-button').click();

    cy.get('h2#error-summary-title').should('contain', 'There is a problem');

    cy.get('.govuk-error-summary ul li a').should('contain', 'Enter a valid email address');
  });

  it('should display error if the user submits an invalid email address', function () {
    cy.visit('/renewal-email');
    cy.get('h1').should('contain', 'What is your email address?');

    cy.get('input[type="text"]#email').type('NOTVALIDEMAIL', {delay: 1});

    cy.get('#main-content form button.naturescot-forward-button').click();

    cy.get('h2#error-summary-title').should('contain', 'There is a problem');

    cy.get('.govuk-error-summary ul li a').should('contain', 'Enter a valid email address');
  });

  it('should navigate to address page on valid form submission', function () {
    cy.visit('/renewal-email');
    cy.get('h1').should('contain', 'What is your email address?');

    cy.get('input[type="text"]#email').type('test@test.com', {delay: 1});

    cy.get('#main-content form button.naturescot-forward-button').click();

    cy.get('h1').should('contain', 'secure link to renew');
  });
});
