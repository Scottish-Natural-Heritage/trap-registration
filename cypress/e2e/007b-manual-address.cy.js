describe('Manual address page directly', function () {
  it('should prevent access', function () {
    cy.visit('/manual-address', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('Manual address page ', function () {
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

    // ~GET `/details`~
    // FILL the form
    cy.get('input[type="text"]#full-name').type('Nature Scot', {delay: 1});
    cy.get('input[type="tel"]#phone-number').type('01463 725 000', {delay: 1});
    cy.get('input[type="text"]#email-address').type('licensing@nature.scot', {delay: 1});
    // POST `/details`
    cy.get('#main-content form button.naturescot-forward-button').click();

		// ~GET `/check-email`~
    // FILL the form
		cy.get('input[type=radio][name=emailValidation][value="yes"]').click();

		 // POST `/check-email`
		 cy.get('#main-content form button.naturescot-forward-button').click();

    // ~GET `/postcode`~
    cy.get('input[type="text"]#address-postcode').type('IV3 8NW', {delay: 1});
    // POST `/postcode`
    cy.get('#main-content form button.naturescot-forward-button').click();
    // POST `/postcode`
    cy.get('#main-content form button.govuk-button--secondary').click();
  });

  it('should allow access if the user visits all the pages in order', function () {
    cy.visit('/manual-address');
    cy.get('h1').should('contain', 'What is your address?');
  });

  it('blank entries + main button should navigate to same page with error', function () {
    cy.visit('/manual-address');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/manual-address');

    cy.get('h2#error-summary-title').should('contain', 'There is a problem');

    cy.get('.govuk-error-summary ul li a')
      .should('contain', 'Enter the building and street')
      .and('contain', 'Enter the town or city')
      .and('contain', 'Enter the county');

    cy.get('.govuk-form-group--error .govuk-error-message')
      .and('contain', 'Enter the building and street')
      .and('contain', 'Enter the town or city')
      .and('contain', 'Enter the county');
  });

  it('filled-out entries + main button should navigate to site location page', function () {
    cy.visit('/manual-address');
    cy.get('input[type="text"]#addressLine1').type('Great Glen House');
    cy.get('input[type="text"]#addressTown').type('Inverness');
    cy.get('input[type="text"]#addressCounty').type('Highlands');

    cy.get('#main-content form button.naturescot-forward-button').click();

    cy.url().should('include', '/confirm');
  });

  it('forbidden characters should generate errors', function () {
    cy.visit('/manual-address');

    cy.get('input[type="text"]#addressLine1').type('<a href="">FakeNastyLink</a>');
    cy.get('input[type="text"]#addressLine2').type('<a href="">FakeNastyLink</a>');
    cy.get('input[type="text"]#addressTown').type('<a href="">FakeNastyLink</a>');
    cy.get('input[type="text"]#addressCounty').type('<a href="">FakeNastyLink</a>');

    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/manual-address');

    cy.get('h2#error-summary-title').should('contain', 'There is a problem');

    cy.get('.govuk-error-summary ul li a')
      .should(
        'contain',
        'Address line 1 must only include letters a to z, and special characters such as hyphens, spaces and apostrophes'
      )
      .and(
        'contain',
        'Address line 2 must only include letters a to z, and special characters such as hyphens, spaces and apostrophes'
      )
      .and(
        'contain',
        'Town or city must only include letters a to z, and special characters such as hyphens, spaces and apostrophes'
      )
      .and(
        'contain',
        'County must only include letters a to z, and special characters such as hyphens, spaces and apostrophes'
      );

    cy.get('form .govuk-form-group--error')
      .and(
        'contain',
        'Address line 1 must only include letters a to z, and special characters such as hyphens, spaces and apostrophes'
      )
      .and(
        'contain',
        'Address line 2 must only include letters a to z, and special characters such as hyphens, spaces and apostrophes'
      )
      .and(
        'contain',
        'Town or city must only include letters a to z, and special characters such as hyphens, spaces and apostrophes'
      )
      .and(
        'contain',
        'County must only include letters a to z, and special characters such as hyphens, spaces and apostrophes'
      );
  });
});
