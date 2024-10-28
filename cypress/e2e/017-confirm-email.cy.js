describe('Confirm email page directly', function () {
  it('should prevent access', function () {
    cy.visit('/confirm-email', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('Confirm email page ', function () {
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
    cy.visit('/confirm-email');
    cy.get('h1').should('contain', 'Is this email correct?');
  });

  it('sends the user to "postcode" if "no" is selected and an updated email is provided and submitted', () => {
    cy.visit('/confirm-email');
    cy.get('input[type=radio][name=emailValidation][value="no"]').click();
    cy.get('input[type=text][name=emailChange]').type('nature.scot.updated@example.org');
    cy.get('button.govuk-button').click();

    cy.get('h1').contains('postcode', {matchCase: false});
  });

  it('returns with error if no radio button is selected and page is submitted', () => {
    cy.get('button.govuk-button').click();

    cy.get('h1').contains('Is this email correct?', {matchCase: false});
    cy.get('.govuk-error-summary__title').contains('There is a problem', {matchCase: false});
    cy.get('.govuk-error-summary__body').contains('Confirm if the stated email is correct or not', {matchCase: false});
    cy.get('#emailValidation-error').contains('Select yes or no', {matchCase: false});
  });

  it('returns with error if no radio button is selected and page is submitted', () => {
    cy.get('input[type=radio][name=emailValidation][value="no"]').click();
    cy.get('button.govuk-button').click();

    cy.get('h1').contains('Is this email correct?', {matchCase: false});
    cy.get('.govuk-error-summary__title').contains('There is a problem', {matchCase: false});
    cy.get('.govuk-error-summary__body').contains('Enter an email address', {matchCase: false});
    cy.get('#emailChange-error').contains('Enter an email address', {matchCase: false});
  });

  it('returns with error if no radio button is selected, and an incorrected email provided and page is submitted', () => {
    cy.get('input[type=radio][name=emailValidation][value="no"]').click();
    cy.get('input[type=text][name=emailChange]').type('nature.scot.updated');

    cy.get('button.govuk-button').click();

    cy.get('h1').contains('Is this email correct?', {matchCase: false});
    cy.get('.govuk-error-summary__title').contains('There is a problem', {matchCase: false});
    cy.get('.govuk-error-summary__body').contains(
      'Enter an email address in the correct format, like name@example.com',
      {matchCase: false}
    );
    cy.get('#emailChange-error').contains('Enter an email address in the correct format, like name@example.com', {
      matchCase: false
    });
  });
});
