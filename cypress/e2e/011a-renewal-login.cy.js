describe('Renewal intro page', function () {
  beforeEach(() => {
    cy.visit(
      '/renewal-login?token=eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjQ3Njc2NzQ1NTgsInN1YiI6Ii0xIn0.XSHX6QB8robVaEuXVeHKbBed13uAdWvLBaNeGCYPAWWlw7Fm7bafXMPUQQE69TNc8DbjUgaRDxKvS2ju5uZziw'
    );
    cy.get('h1').should('contain', 'Select a trap to renew');
  });

  it('Should have a link to renew registration', function () {
    cy.get('a').should('contain', 'Renew');
  });
});
