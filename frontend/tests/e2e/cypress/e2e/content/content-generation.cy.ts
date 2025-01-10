describe('Content Generation', () => {
  beforeEach(() => {
    cy.login('test@example.com', 'password123');
    cy.visit('/content');
  });

  it('should generate blog content', () => {
    const params = {
      type: 'blog',
      keywords: ['seo tips', 'content marketing'],
      tone: 'professional'
    };
    
    cy.generateContent(params);
    
    // Verify generated content
    cy.get('[data-cy=generated-content]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[data-cy=content-keywords]')
      .should('contain', 'seo tips')
      .and('contain', 'content marketing');
  });

  it('should optimize existing content', () => {
    // First generate content
    cy.generateContent({
      type: 'blog',
      keywords: ['digital marketing']
    });
    
    // Then optimize it
    cy.get('[data-cy=optimize-content]').click();
    cy.get('[data-cy=optimization-suggestions]').should('be.visible');
    cy.get('[data-cy=apply-suggestions]').click();
    
    // Verify optimization applied
    cy.get('[data-cy=optimization-score]')
      .invoke('text')
      .then(parseFloat)
      .should('be.gt', 80);
  });

  it('should generate meta descriptions', () => {
    cy.generateContent({
      type: 'meta',
      keywords: ['seo tool']
    });
    
    // Verify meta description
    cy.get('[data-cy=meta-description]')
      .should('be.visible')
      .invoke('text')
      .should('have.length.lte', 160);
  });

  it('should save content templates', () => {
    const templateName = 'Blog Template';
    
    // Generate and save template
    cy.generateContent({
      type: 'blog',
      keywords: ['template test']
    });
    
    cy.get('[data-cy=save-template]').click();
    cy.get('[data-cy=template-name]').type(templateName);
    cy.get('[data-cy=confirm-save-template]').click();
    
    // Verify template saved
    cy.get('[data-cy=templates-list]')
      .should('contain', templateName);
  });

  it('should analyze content readability', () => {
    cy.generateContent({
      type: 'blog',
      keywords: ['readability test']
    });
    
    // Check readability score
    cy.get('[data-cy=analyze-readability]').click();
    cy.get('[data-cy=readability-score]').should('be.visible');
    cy.get('[data-cy=readability-suggestions]').should('be.visible');
  });
});
