describe('Renewal check answers page ', function () {
  it('should prevent access', function () {
    cy.visit('/renewal-check-answers', {failOnStatusCode: false});

    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('Navigate to renewal-check-answers', function () {
  beforeEach(() => {
    cy.visit(
      '/renewal-login?token=eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiO' +
        'jQ3Njc2NzQ1NTgsInN1YiI6Ii0xIn0.XSHX6QB8robVaEuXVeHKbBed13uAdWvLBaNe' +
        'GCYPAWWlw7Fm7bafXMPUQQE69TNc8DbjUgaRDxKvS2ju5uZziw'
    );

    cy.get('h1').should('contain', 'Select a trap to renew');
    cy.get('a.govuk-link').contains('Renew').first().click();
  });

  it('should display an error if the user does not click the confirm declaration checkbox', function () {
    cy.visit('/renewal-check-answers', {failOnStatusCode: false});

    cy.get('h1').should('contain', 'Check your renewal details');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.get('h2#error-summary-title').should('contain', 'There is a problem');
    cy.get('.govuk-error-summary ul li a').should('contain', 'You must confirm the information');
  });

  it('should navigate back to renewal-check-answers after updating personal details', function () {
    cy.get('a.govuk-link[href*="/renewal-details#full-name"]').click();
    cy.get('h1').should('contain', 'What are your details?');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.get('h1').should('contain', 'Is this email correct?');
    cy.get('input[type=radio][name=emailValidation][value="yes"]').click();
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.get('h1').should('contain', 'Check your renewal details');
  });

  it('should navigate back to renewal-check-answers after updating address details', function () {
    cy.get('a.govuk-link[href*="/renewal-postcode#postcode"]').click();
    cy.get('h1').should('contain', 'What is your postcode?');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.get('h1').should('contain', 'Select your address');
    cy.get('form button.naturescot-forward-button').click();
    cy.get('input[type="text"]#addressCounty').type('Highlands');
    cy.get('form button.naturescot-forward-button').click();
    cy.get('h1').should('contain', 'Check your renewal details');
  });

  it('should navigate back to renewal-check-answers after updating wildlife crime details', function () {
    cy.get('a.govuk-link[href*="/renewal-conviction#conviction"]').click();
    cy.get('h1').should('contain', 'Have you been convicted of a wildlife crime?');
    cy.get('#main-content form input[type="radio"][value="no"]').click();
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.get('h1').should('contain', 'Check your renewal details');
  });

  it('should navigate back to renewal-check-answers after updating general licence details', function () {
    cy.get('a.govuk-link[href*="/renewal-general#general"]').first().click();
    cy.get('h1').should('contain', 'general licences');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.get('h1').should('contain', 'Check your renewal details');
  });

  it('should navigate back to renewal-check-answers after updating general licence details', function () {
    cy.get('a.govuk-link[href*="/renewal-meat-bait#meatbait"]').click();
    cy.get('h1').should('contain', 'intend to use meat baits');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.get('h1').should('contain', 'Check your renewal details');
  });
});
