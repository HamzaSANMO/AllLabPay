describe('Mobile UI', () => {
  beforeEach(() => {
    cy.viewport('iphone-6');
  });

  it('should display TP list correctly', () => {
    cy.loginAsStudent();
    cy.visit('/student/tps');
    cy.get('.bg-white').should('have.length.greaterThan', 0);
  });
});
