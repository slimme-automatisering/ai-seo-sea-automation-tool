# API Documentation

## 1. RESTful APIs
### Campaigns
- **GET /campaigns:** Get all campaigns.
- **POST /campaigns:** Create a new campaign.
- **GET /campaigns/{id}:** Get a specific campaign.
- **PUT /campaigns/{id}:** Update a specific campaign.
- **DELETE /campaigns/{id}:** Delete a specific campaign.

### Content
- **GET /content:** Get all content.
- **POST /content:** Create new content.
- **GET /content/{id}:** Get specific content.
- **PUT /content/{id}:** Update specific content.
- **DELETE /content/{id}:** Delete specific content.

### Keywords
- **GET /keywords:** Get all keywords.
- **POST /keywords:** Create new keywords.
- **GET /keywords/{id}:** Get specific keywords.
- **PUT /keywords/{id}:** Update specific keywords.
- **DELETE /keywords/{id}:** Delete specific keywords.

## 2. GraphQL APIs
### Queries
- **getCampaigns:** Fetch all campaigns.
- **getContent:** Fetch all content.
- **getKeywords:** Fetch all keywords.

### Mutations
- **createCampaign:** Create a new campaign.
- **updateCampaign:** Update an existing campaign.
- **createContent:** Create new content.
- **updateContent:** Update existing content.

## 3. WebSockets
- **Real-Time Updates:** Use WebSockets to send real-time updates (e.g., campaign status, content readiness).

## 4. Error Handling
- **Status Codes:** Use standard HTTP status codes (e.g., 200 for success, 400 for bad requests).
- **Error Messages:** Include descriptive error messages in the response body.

## 5. Rate Limiting
- **API Rate Limiting:** Implement rate limiting to prevent abuse (e.g., 100 requests/minute).
- **IP Blocking:** Block IPs that exceed rate limits or show suspicious activity.

## 6. Security
- **HTTPS:** Use HTTPS for secure communication.
- **Authentication:** Use OAuth 2.0 for user authentication.
- **Authorization:** Use role-based access control (RBAC) to restrict access to sensitive endpoints.