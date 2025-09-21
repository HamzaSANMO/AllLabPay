describe('Authentication', () => {
  it('should register and login', () => {
    cy.visit('/register');
    cy.get('input[placeholder="Email"]').type('test@student.com');
    cy.get('input[placeholder="Matricule"]').type('MAT123');
    cy.get('input[placeholder="Password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/login');

    cy.get('input[placeholder="Email or Matricule"]').type('test@student.com');
    cy.get('input[placeholder="Password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/student');
  });
});
