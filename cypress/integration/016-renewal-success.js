describe('Renewal success page ', function () {
  beforeEach(() => {
    cy.visit('/renewal-success');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.get('h1').should('contain', 'success');
  });
});
