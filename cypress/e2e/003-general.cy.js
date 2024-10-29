describe('General page directly', function () {
  it('should prevent access', function () {
    cy.visit('/general', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('General page ', function () {
  beforeEach(() => {
    // GET `/start`
    cy.visit('/start');

    // POST `/start`
    cy.get('#main-content form button.naturescot-forward-button').click();

    // ~GET `/gdpr`~
    // POST `/gdpr`
    cy.get('#main-content form button.naturescot-forward-button').click();

    // ~GET `/conviction`~
    // CLICK no
    cy.get('#main-content form input[type="radio"][value="no"]').click();
    // POST `/conviction`
    cy.get('#main-content form button.naturescot-forward-button').click();

    // ~GET `/eligible`~
    // POST `/eligible`
    cy.get('#main-content form button.naturescot-forward-button').click();
  });

  it('should allow access if the user visits all the pages in order', function () {
    cy.visit('/general');
    cy.get('h1').should('contain', 'general licences');
  });

  it('checking no checkboxs + main button should navigate to same page with error', function () {
    cy.visit('/general');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/general');
    cy.get('h2#error-summary-title').should('contain', 'There is a problem');
    cy.get('span#general-error').should('contain', 'You must confirm');
  });

  it('"GL01" checkbox + main button should navigate to meat-bait page', function () {
    cy.visit('/general');
    cy.get('#main-content form input[type="checkbox"]#general').click();
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/meat-bait');
  });

  it('"GL02" checkbox + main button should navigate to meat-baits page', function () {
    cy.visit('/general');
    cy.get('#main-content form input[type="checkbox"]#general-2').click();
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/meat-bait');
  });
});
