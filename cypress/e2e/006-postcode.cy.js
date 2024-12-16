describe('Postcode page directly', function () {
  it('should prevent access', function () {
    cy.visit('/postcode', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('Postcode page ', function () {
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
  });

  it('should allow access if the user visits all the pages in order', function () {
    cy.visit('/postcode');
    cy.get('h1').should('contain', 'What is your postcode?');
  });

  it('should display error if the user submits an empty form', function () {
    cy.visit('/postcode');
    cy.get('h1').should('contain', 'What is your postcode?');

    cy.get('#main-content form button.naturescot-forward-button').click();

    cy.get('h2#error-summary-title').should('contain', 'There is a problem');

    cy.get('.govuk-error-summary ul li a').should('contain', 'Enter your postcode');
  });

  it('should display error if the user submits an invalid postcode', function () {
    cy.visit('/postcode');
    cy.get('h1').should('contain', 'What is your postcode?');

    cy.get('input[type="text"]#address-postcode').type('NOTAVALIDPOSTCODE', {delay: 1});

    cy.get('#main-content form button.naturescot-forward-button').click();

    cy.get('h2#error-summary-title').should('contain', 'There is a problem');

    cy.get('.govuk-error-summary ul li a').should('contain', 'Enter a valid postcode');
  });

  it('should navigate to address page on valid form submission', function () {
    cy.visit('/postcode');
    cy.get('h1').should('contain', 'What is your postcode?');

    cy.get('input[type="text"]#address-postcode').type('IV3 8NW', {delay: 1});

    cy.get('#main-content form button.naturescot-forward-button').click();

    cy.get('h1').should('contain', 'Select your address');
  });
});
