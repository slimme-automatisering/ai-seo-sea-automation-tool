describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should successfully login with valid credentials', () => {
    cy.login('test@example.com', 'password123');
    cy.url().should('eq', Cypress.config().baseUrl + '/dashboard');
    cy.get('[data-cy=welcome-message]').should('be.visible');
  });

  it('should show error with invalid credentials', () => {
    cy.login('invalid@example.com', 'wrongpassword');
    cy.get('[data-cy=error-message]')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
    cy.url().should('include', '/login');
  });

  it('should require email validation', () => {
    cy.get('[data-cy=email-input]').type('notanemail');
    cy.get('[data-cy=password-input]').type('password123');
    cy.get('[data-cy=login-button]').click();
    cy.get('[data-cy=email-error]')
      .should('be.visible')
      .and('contain', 'Please enter a valid email');
  });

  it('should require password', () => {
    cy.get('[data-cy=email-input]').type('test@example.com');
    cy.get('[data-cy=login-button]').click();
    cy.get('[data-cy=password-error]')
      .should('be.visible')
      .and('contain', 'Password is required');
  });

  it('should allow password reset request', () => {
    cy.get('[data-cy=forgot-password]').click();
    cy.url().should('include', '/reset-password');
    cy.get('[data-cy=email-input]').type('test@example.com');
    cy.get('[data-cy=reset-button]').click();
    cy.get('[data-cy=success-message]')
      .should('be.visible')
      .and('contain', 'Password reset instructions sent');
  });
});
