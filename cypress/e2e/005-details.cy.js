describe('Details page directly', function () {
  it('should prevent access', function () {
    cy.visit('/details', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('Details page ', function () {
  beforeEach(() => {
    // GET `/start`
    cy.visit('/start');

    // POST `/start`
    cy.get('#main-content form button.naturescot-forward-button').click();

    // ~GET `/conviction`~
    // CLICK no
    cy.get('#main-content form input[type="radio"][value="no"]').click();
    // POST `/conviction`
    cy.get('#main-content form button.naturescot-forward-button').click();

    // ~GET `/general`~
    // CLICK GLO1
    cy.get('#main-content form input[type="checkbox"]#general').click();
    // POST `/general`
    cy.get('#main-content form button.naturescot-forward-button').click();

    // ~GET `/meat-bait`~
    // CLICK no
    cy.get('#main-content form input[type="radio"][value="no"]').click();
    // POST `/meat-bait`
    cy.get('#main-content form button.naturescot-forward-button').click();
  });

  it('should allow access if the user visits all the pages in order', function () {
    cy.visit('/details');
    cy.get('h1').should('contain', 'What are your details?');
  });

  it('blank entries + main button should navigate to same page with error', function () {
    cy.visit('/details');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/details');

    cy.get('h2#error-summary-title').should('contain', 'There is a problem');

    cy.get('.govuk-error-summary ul li a')
      .should('contain', 'Enter your full name')
      .and('contain', 'Enter your phone number')
      .and('contain', 'Enter your email address');

    cy.get('form fieldset .govuk-form-group--error')
      .and('contain', 'Enter your full name')
      .and('contain', 'Enter your phone number')
      .and('contain', 'Enter your email address');
  });

  it('filled-out entries + main button should navigate to site location page', function () {
    cy.visit('/details');

    cy.get('input[type="text"]#full-name').type('Nature Scot');
    cy.get('input[type="tel"]#phone-number').type('01463 725 000');
    cy.get('input[type="text"]#email-address').type('licensing@nature.scot');

    cy.get('#main-content form button.naturescot-forward-button').click();

    cy.url().should('include', '/postcode');
  });

  it('forbidden characters should generate errors', function () {
    cy.visit('/details');

    cy.get('input[type="text"]#full-name').type('<a href="">FakeNastyLink</a>');
    cy.get('input[type="text"]#email-address').type('licensing@nature.scot');
    cy.get('input[type="tel"]#phone-number').type('<a href="">FakeNastyLink</a>');

    cy.get('#main-content form button.naturescot-forward-button').click();

    cy.url().should('include', '/details');

    cy.get('h2#error-summary-title').should('contain', 'There is a problem');

    cy.get('.govuk-error-summary ul li a')
      .should(
        'contain',
        'Full name must only include letters a to z, and special characters such as hyphens, spaces and apostrophes'
      )
      .and(
        'contain',
        'Telephone number must only include letters a to z, and special characters such as hyphens, spaces and apostrophes'
      );

    cy.get('form fieldset .govuk-form-group--error')
      .and(
        'contain',
        'Full name must only include letters a to z, and special characters such as hyphens, spaces and apostrophes'
      )
      .and(
        'contain',
        'Telephone number must only include letters a to z, and special characters such as hyphens, spaces and apostrophes'
      );
  });
});
