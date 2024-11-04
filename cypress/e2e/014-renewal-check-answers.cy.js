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

    cy.get('h1').should('contain', 'Renewal login');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.get('h1').should('contain', 'Check your renewal details');
  });

  it('should display an error if the user does not click the confirm declaration checkbox', function () {
    cy.visit('/renewal-check-answers', {failOnStatusCode: false});

    cy.get('h1').should('contain', 'Check your renewal details');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.get('h2#error-summary-title').should('contain', 'There is a problem');
    cy.get('.govuk-error-summary ul li a').should('contain', 'You must confirm the information');
  });
});
