// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
// ***********************************************************

import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      // Custom commands here
      login(email: string, password: string): Chainable<void>;
      logout(): Chainable<void>;
      createCampaign(name: string, budget: number): Chainable<void>;
      analyzeKeywords(keywords: string[]): Chainable<void>;
      generateContent(params: {
        type: string;
        keywords: string[];
        tone?: string;
      }): Chainable<void>;
    }
  }
}

// Prevent uncaught exceptions from failing tests
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
