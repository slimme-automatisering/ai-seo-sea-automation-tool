describe('Campaign Management', () => {
  beforeEach(() => {
    cy.login('test@example.com', 'password123');
    cy.visit('/campaigns');
  });

  it('should create new campaign', () => {
    const campaignName = 'Test Campaign';
    const budget = 1000;
    
    cy.createCampaign(campaignName, budget);
    
    // Verify campaign created
    cy.get('[data-cy=campaign-list]')
      .should('contain', campaignName);
    cy.get('[data-cy=campaign-budget]')
      .should('contain', budget);
  });

  it('should edit campaign settings', () => {
    // Create campaign first
    cy.createCampaign('Edit Test', 1000);
    
    // Edit campaign
    cy.get('[data-cy=campaign-row]').first().click();
    cy.get('[data-cy=edit-campaign]').click();
    cy.get('[data-cy=campaign-name]').clear().type('Updated Campaign');
    cy.get('[data-cy=save-changes]').click();
    
    // Verify changes
    cy.get('[data-cy=campaign-list]')
      .should('contain', 'Updated Campaign');
  });

  it('should manage campaign keywords', () => {
    cy.createCampaign('Keyword Test', 1000);
    
    // Add keywords
    cy.get('[data-cy=campaign-row]').first().click();
    cy.get('[data-cy=manage-keywords]').click();
    cy.get('[data-cy=keyword-input]').type('test keyword');
    cy.get('[data-cy=add-keyword]').click();
    
    // Verify keyword added
    cy.get('[data-cy=keyword-list]')
      .should('contain', 'test keyword');
  });

  it('should show campaign performance metrics', () => {
    cy.createCampaign('Performance Test', 1000);
    
    // View performance
    cy.get('[data-cy=campaign-row]').first().click();
    cy.get('[data-cy=view-performance]').click();
    
    // Check metrics
    cy.get('[data-cy=impressions]').should('be.visible');
    cy.get('[data-cy=clicks]').should('be.visible');
    cy.get('[data-cy=conversions]').should('be.visible');
    cy.get('[data-cy=cost]').should('be.visible');
  });

  it('should set campaign scheduling', () => {
    cy.createCampaign('Schedule Test', 1000);
    
    // Set schedule
    cy.get('[data-cy=campaign-row]').first().click();
    cy.get('[data-cy=campaign-schedule]').click();
    cy.get('[data-cy=start-date]').type('2025-02-01');
    cy.get('[data-cy=end-date]').type('2025-02-28');
    cy.get('[data-cy=save-schedule]').click();
    
    // Verify schedule
    cy.get('[data-cy=campaign-dates]')
      .should('contain', '2025-02-01')
      .and('contain', '2025-02-28');
  });
});
