declare global {
  namespace Cypress {
    interface Chainable {
      loginAsTeacher(): Chainable<void>
      loginAsStudent(): Chainable<void>
    }
  }
}

Cypress.Commands.add('loginAsTeacher', () => {
  cy.request('POST', 'http://localhost:8080/api/auth/login', {
    emailOrMatricule: 'teacher@test.com',
    password: 'password123'
  }).then(response => {
    localStorage.setItem('token', response.body.token);
  });
});

Cypress.Commands.add('loginAsStudent', () => {
  cy.request('POST', 'http://localhost:8080/api/auth/login', {
    emailOrMatricule: 'student@test.com',
    password: 'password123'
  }).then(response => {
    localStorage.setItem('token', response.body.token);
  });
});
