describe('Renewal check answers page ', function () {
  it('should prevent access', function () {
    cy.visit('/renewal-check-answers', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('Move to next page', function () {
  beforeEach(() => {
    cy.visit('/renewal-intro-select');

    cy.get('h1').should('contain', 'Renewal intro select');
    cy.get('#main-content form button.naturescot-forward-button').click();

    cy.get('h1').should('contain', 'Renewal check answers');
    cy.get('#main-content form button.naturescot-forward-button').click();

    cy.url().should('include', '/renewal-success');
    cy.get('h1').should('contain', 'Renewal success');
  });
});
