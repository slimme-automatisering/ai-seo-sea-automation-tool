// Custom commands voor de SEO/SEA tool

// Login command
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('[data-cy=email-input]').type(email);
  cy.get('[data-cy=password-input]').type(password);
  cy.get('[data-cy=login-button]').click();
  cy.url().should('not.include', '/login');
});

// Logout command
Cypress.Commands.add('logout', () => {
  cy.get('[data-cy=user-menu]').click();
  cy.get('[data-cy=logout-button]').click();
  cy.url().should('include', '/login');
});

// Create campaign command
Cypress.Commands.add('createCampaign', (name: string, budget: number) => {
  cy.visit('/campaigns/new');
  cy.get('[data-cy=campaign-name]').type(name);
  cy.get('[data-cy=campaign-budget]').type(budget.toString());
  cy.get('[data-cy=create-campaign-button]').click();
  cy.url().should('include', '/campaigns');
});

// Analyze keywords command
Cypress.Commands.add('analyzeKeywords', (keywords: string[]) => {
  cy.visit('/keywords');
  keywords.forEach(keyword => {
    cy.get('[data-cy=keyword-input]').type(keyword);
    cy.get('[data-cy=add-keyword-button]').click();
  });
  cy.get('[data-cy=analyze-keywords-button]').click();
  cy.get('[data-cy=analysis-results]').should('be.visible');
});

// Generate content command
Cypress.Commands.add('generateContent', (params: {
  type: string;
  keywords: string[];
  tone?: string;
}) => {
  cy.visit('/content/new');
  cy.get('[data-cy=content-type]').select(params.type);
  params.keywords.forEach(keyword => {
    cy.get('[data-cy=keyword-input]').type(keyword);
    cy.get('[data-cy=add-keyword-button]').click();
  });
  if (params.tone) {
    cy.get('[data-cy=content-tone]').select(params.tone);
  }
  cy.get('[data-cy=generate-content-button]').click();
  cy.get('[data-cy=generated-content]').should('be.visible');
});
