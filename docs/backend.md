# Backend Documentation

## 1. Backend Framework
- **Framework:** Node.js with Express.js
  - Node.js and Express.js are chosen for their lightweight and scalable nature, making them ideal for handling the app’s backend requirements.

## 2. Database
- **Primary Database:** PostgreSQL
  - PostgreSQL is recommended for structured data (e.g., user accounts, campaign data, billing information) due to its robustness, scalability, and support for complex queries.
- **Secondary Database:** MongoDB
  - MongoDB is recommended for unstructured or semi-structured data (e.g., AI-generated content, logs, analytics) due to its flexibility and schema-less design.
- **Recommendation:** Use PostgreSQL for relational data and MongoDB for NoSQL use cases. This hybrid approach ensures optimal performance and flexibility.

### Database Schema Diagram
```mermaid
USERS ||--o{ CAMPAIGNS : "manages"
  USERS {
    string id
    string email
    string passwordHash
    string role
  }
  CAMPAIGNS {
    string id
    string userId
    string name
    float budget
    date startDate
    date endDate
  }
  CONTENT {
    string id
    string campaignId
    string type
    string text
    date createdAt
  }
  KEYWORDS {
    string id
    string campaignId
    string keyword
    float cpc
  }
}
  
 ```
 ---

## 3. Authentication
- **Authentication Method:** OAuth 2.0
  - OAuth 2.0 will be used for Admin and Manager roles, allowing them to log in with their Google accounts and directly connect with Google APIs.
- **User Invitations:** Admins can invite User roles through their Google accounts and control permissions.
- **2FA (Two-Factor Authentication):** An additional security layer will be implemented for all roles using OAuth 2.0.

---

## 4. API Design
- **RESTful APIs:** For integrations with external APIs (e.g., Google Ads API, WordPress REST API).
- **GraphQL:** For internal data queries requiring flexibility and scalability (e.g., fetching SEO/SEA performance data, dashboard visualizations).
- **WebSockets:** For real-time communication (e.g., live updates, notifications).
- **Security and Rate Limiting:** Strong security measures (e.g., HTTPS, input validation) and rate limiting will be implemented to prevent API misuse.

---

## Backend Architecture Diagram
```mermaid
graph TD
  A[Client] --> B[Frontend (React.js)]
  B --> C[Backend (Node.js + Express.js)]
  C --> D[REST API]
  C --> E[GraphQL API]
  C --> F[WebSockets]
  D --> G[External APIs (Google Ads, WordPress)]
  E --> H[Internal Queries (SEO/SEA Data)]
  F --> I[Real-Time Updates]
  C --> J[PostgreSQL]
  C --> K[MongoDB]
  J --> L[Structured Data (Users, Campaigns)]
  K --> M[Unstructured Data (Logs, Analytics)]
```
---

## 5. Third-Party Integrations
- **Payment Gateways:**
  - **Stripe:** For international users.
  - **PayPal:** For international users.
  - **Mollie:** For the European market.
- **Analytics:**
  - **Google Analytics:** For tracking user behavior and campaign performance.
- **SEO Tools:**
  - **Yoast SEO API:** For WordPress SEO optimization.
  - **Screaming Frog API:** For technical SEO analysis. 
- **AI and Machine Learning:**
  - **OpenAI API:** For content generation and optimization.
  - **TensorFlow.js:** For training NLP models to generate or optimize meta descriptions.
  - **Scikit-learn:** For data analysis.
  - **Hugging Face Transformers:** For NLP tasks (e.g., sentiment analysis, text summarization).
  - **ResNet50:** For image analysis and alt-text generation.
- **Social Media Advertising**
  - **Meta Marketing API:** For future Facebook and Instagram advertising automation.
  - **TikTok Ads API:** For future TikTok Ads automation.
  - **LinkedIn Marketing API:** For future LinkedIn Ads automation.
  - **Twitter Ads API:** For future Twitter Ads automation.
- **Email Marketing**
  - **Mailchimp API:** For future email marketing automation.
- **Monitoring and Logging**
  - **New Relic API:** For performance monitoring.

---

## 6. Caching
- **Redis:** For in-memory caching of frequently accessed data (e.g., analytics, competitor data).
- **Memcached:** For distributed caching (optional, depending on scaling needs).
- **Recommendation:** Start with Redis for its simplicity and performance. Memcached can be added later if distributed caching becomes necessary.

---

## 7. Background Jobs
- **Celery:** For Python-based background tasks (e.g., automated backups, environment secrets generation).
- **Bull:** For Node.js-based background tasks (e.g., connection testing, CSRF testing).

---

## 8. File Storage
- **Cloud Storage:** AWS S3 or Google Cloud Storage will be used for storing and managing files (e.g., images, documents).
- **Recommendation:** AWS S3 is preferred for its scalability and integration with other AWS services.

---

## 9. Security
- **HTTPS:** For secure communication.
- **Input Validation:** To prevent SQL injection and XSS attacks.
- **Rate Limiting:** To prevent API abuse.
- **Security Headers:** To enhance HTTP security.
- **Audit Logging:** For tracking and monitoring user actions.
- **Spam Detection:** To filter out spammy content.
- **Bot Protection:** To prevent bot abuse.
- **DDoS Prevention:** To mitigate distributed denial-of-service attacks.
- **Fraud Detection:** To identify and prevent fraudulent activities.

---

## 10. Logging and Monitoring
- **Logging:** Winston (Node.js) for structured logging.
- **Monitoring:** Prometheus and Grafana for real-time monitoring and visualization.
- **Performance Monitoring:** New Relic for application performance insights.

---

## 11. Testing & CI/CD
- **Unit Testing:** Jest for snapshot testing.
- **End-to-End Testing:** Cypress for testing user flows.
- **CI/CD:** GitHub Actions for automated testing and deployment.
- **Code Quality Analysis:** SonarQube for code quality and security checks.
- **Security Scans:** Automated security scans integrated into the CI/CD pipeline.
- **GitHub CI/CD:** For continuous integration and deployment.

---