describe('Keyword Research', () => {
  beforeEach(() => {
    cy.login('test@example.com', 'password123');
    cy.visit('/keywords');
  });

  it('should perform keyword research', () => {
    const keywords = ['seo tools', 'keyword research'];
    cy.analyzeKeywords(keywords);
    
    // Verify results table
    cy.get('[data-cy=keyword-results-table]').should('be.visible');
    cy.get('[data-cy=keyword-row]').should('have.length.at.least', keywords.length);
    
    // Check metrics are present
    cy.get('[data-cy=search-volume]').should('be.visible');
    cy.get('[data-cy=keyword-difficulty]').should('be.visible');
    cy.get('[data-cy=cpc]').should('be.visible');
  });

  it('should filter keyword results', () => {
    cy.analyzeKeywords(['digital marketing']);
    
    // Test volume filter
    cy.get('[data-cy=volume-filter]').type('1000');
    cy.get('[data-cy=apply-filters]').click();
    cy.get('[data-cy=keyword-row]').each(($row) => {
      cy.wrap($row)
        .find('[data-cy=search-volume]')
        .invoke('text')
        .then(parseFloat)
        .should('be.gte', 1000);
    });
  });

  it('should export keyword data', () => {
    cy.analyzeKeywords(['content marketing']);
    cy.get('[data-cy=export-button]').click();
    
    // Verify download
    cy.readFile('cypress/downloads/keyword-research.csv').should('exist');
  });

  it('should save keyword lists', () => {
    const listName = 'Test Keywords';
    cy.analyzeKeywords(['seo optimization']);
    
    // Save list
    cy.get('[data-cy=save-list-button]').click();
    cy.get('[data-cy=list-name-input]').type(listName);
    cy.get('[data-cy=confirm-save]').click();
    
    // Verify saved
    cy.get('[data-cy=saved-lists]')
      .should('contain', listName);
  });

  it('should show keyword trends', () => {
    cy.analyzeKeywords(['seo trends']);
    cy.get('[data-cy=show-trends]').click();
    
    // Verify trend graph
    cy.get('[data-cy=trend-graph]').should('be.visible');
    cy.get('[data-cy=trend-period]').select('6 months');
    cy.get('[data-cy=trend-data-points]').should('have.length', 6);
  });
});
