describe('Confirm page directly', function () {
  it('should prevent access', function () {
    cy.visit('/confirm', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('Confirm page ', function () {
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

    // ~GET `/address`~
    cy.get('select[name=address]').select('10092032547');
    // POST `/address`
    cy.get('button.govuk-button[name=addressFound][value=yes]').click();
  });

  it('should allow access if the user visits all the pages in order', function () {
    cy.visit('/confirm');
    cy.get('h1').should('contain', 'Check your answers');
  });

  it('should display an error if the user does not click the confirm declaration checkbox', function () {
    cy.visit('/confirm');
    cy.get('h1').should('contain', 'Check your answers');

    cy.get('#main-content form button.naturescot-forward-button').click();

    cy.get('h2#error-summary-title').should('contain', 'There is a problem');

    cy.get('.govuk-error-summary ul li a').should('contain', 'You must confirm the information');
  });
});
