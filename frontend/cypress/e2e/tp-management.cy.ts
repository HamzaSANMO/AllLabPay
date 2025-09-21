describe('TP Management', () => {
  it('should create and publish TP', () => {
    cy.loginAsTeacher(); // Custom command
    cy.visit('/teacher/tps');
    cy.get('button').contains('Créer TP').click();
    cy.get('input[placeholder="Titre"]').type('TP Test');
    cy.get('select').select('Maths');
    cy.get('input[placeholder="Prix"]').type('5000');
    cy.get('input[placeholder="Capacité"]').type('20');
    cy.get('input[type="date"]').first().type('2025-09-01');
    cy.get('input[type="date"]').last().type('2025-09-10');
    cy.get('button').contains('Enregistrer').click();
    cy.get('button').contains('Publier').click();
    cy.contains('PUBLISHED').should('be.visible');
  });
});
