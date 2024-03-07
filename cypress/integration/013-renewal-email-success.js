describe('Renewal email success page ', function () {
  beforeEach(() => {
    cy.visit('/renewal-email-success');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.get('h1').should('contain', 'success');
  });
});
