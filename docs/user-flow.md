## User Flow Documentation

## 1. Onboarding Flow
### Steps:
1. **Sign-Up:**
   - User visits the app and clicks on "Sign Up."
   - User enters their email and password or signs up with Google (OAuth 2.0).
   - User verifies their email address (if required).
2. **Login:**
   - User enters their email and password or logs in with Google.
   - If 2FA is enabled, user enters the verification code sent to their email or phone.
3. **Role Selection:**
   - User selects their role (Admin, Manager, or User) based on their permissions.
4. **Initial Setup:**
   - User connects their WordPress/WooCommerce website.
   - User integrates third-party APIs (e.g., Google Ads, SEMrush, Ahrefs).
   - User sets up their first campaign or content generation parameters.

### Mermaid Diagram:
```mermaid
graph TD
  A[User Visits App] --> B[Sign Up]
  B --> C{Sign Up Method}
  C -->|Email/Password| D[Enter Email & Password]
  C -->|Google OAuth| E[Sign Up with Google]
  D --> F[Verify Email]
  E --> G[Login with Google]
  F --> G
  G --> H{2FA Enabled?}
  H -->|Yes| I[Enter Verification Code]
  H -->|No| J[Select Role]
  I --> J
  J --> K[Connect WordPress/WooCommerce]
  K --> L[Integrate Third-Party APIs]
  L --> M[Set Up First Campaign or Content]
```

---

## 2. User Flow
- De user flow documentatie is consistent en biedt een duidelijk overzicht van de stappen die gebruikers doorlopen bij het gebruik van de applicatie.
- De onboarding flow en alternatieve stromen zijn goed gedocumenteerd.

### Steps:
1. **Dashboard Overview:**
   - User logs in and lands on the dashboard.
   - Dashboard displays key metrics (e.g., ROI, CPC, traffic) using charts and cards.
2. **Campaign Management:**
   - User navigates to the "Campaigns" section.
   - User creates a new campaign or optimizes an existing one.
   - User sets bidding strategies, budgets, and targeting options.
3. **Content Creation:**
   - User navigates to the "Content" section.
   - User inputs parameters for AI-generated content (e.g., keywords, tone, length).
   - User reviews and publishes the generated content.
4. **Competitor Analysis:**
   - User navigates to the "Competitors" section.
   - User selects competitors to analyze.
   - User views actionable insights and raw data.
5. **Keyword Optimization:**
   - User navigates to the "Keywords" section.
   - User views keyword suggestions (e.g., long-tail, negative keywords).
   - User applies keyword recommendations to campaigns or content.
6. **Reports and Analytics:**
   - User navigates to the "Reports" section.
   - User views detailed analytics and exports data.

### Mermaid Diagram:
```mermaid
graph TD
  A[User Logs In] --> B[Dashboard Overview]
  B --> C[Campaign Management]
  C --> D[Create/Optimize Campaign]
  D --> E[Set Bidding Strategies & Budgets]
  B --> F[Content Creation]
  F --> G[Input Content Parameters]
  G --> H[Review & Publish Content]
  B --> I[Competitor Analysis]
  I --> J[Select Competitors]
  J --> K[View Insights & Data]
  B --> L[Keyword Optimization]
  L --> M[View Keyword Suggestions]
  M --> N[Apply Recommendations]
  B --> O[Reports & Analytics]
  O --> P[View Detailed Analytics]
  P --> Q[Export Data]
```

---

## 3. Error Handling
### Scenarios:
1. **Invalid Login:**
   - Display error message: "Invalid email or password."
   - Provide option to reset password.
2. **Failed API Calls:**
   - Display error message: "Failed to fetch data. Please try again."
   - Log error for debugging.
3. **Network Issues:**
   - Display error message: "Network error. Please check your connection."
   - Provide option to retry.
4. **Invalid Input:**
   - Display error message: "Please fill out all required fields correctly."
   - Highlight invalid fields.

### Mermaid Diagram:
```mermaid
graph TD
  A[User Action] --> B{Success?}
  B -->|Yes| C[Proceed to Next Step]
  B -->|No| D{Error Type}
  D -->|Invalid Login| E[Display Error: Invalid Email/Password]
  D -->|Failed API Call| F[Display Error: Failed to Fetch Data]
  D -->|Network Issue| G[Display Error: Network Error]
  D -->|Invalid Input| H[Display Error: Invalid Input]
  E --> I[Provide Reset Password Option]
  F --> J[Log Error & Retry Option]
  G --> K[Retry Option]
  H --> L[Highlight Invalid Fields]
```

---

## 4. Edge Cases
### Scenarios:
1. **Offline Mode:**
   - Allow users to view cached data (e.g., recent campaigns, content).
   - Display warning: "You are offline. Some features may not be available."
2. **Incomplete Data:**
   - Display placeholder content or default values.
   - Log missing data for debugging.
3. **Expired Sessions:**
   - Redirect users to the login page.
   - Display message: "Your session has expired. Please log in again."

### Mermaid Diagram:
```mermaid
graph TD
  A[User Action] --> B{Edge Case?}
  B -->|Yes| C{Edge Case Type}
  B -->|No| D[Proceed Normally]
  C -->|Offline Mode| E[Display Cached Data]
  E --> F[Show Warning: Offline Mode]
  C -->|Incomplete Data| G[Display Placeholder Content]
  G --> H[Log Missing Data]
  C -->|Expired Session| I[Redirect to Login]
  I --> J[Display Message: Session Expired]
```

---

## 5. Alternative Flows
### Scenarios:
1. **Guest Mode:**
   - Allow users to explore the app without signing up.
   - Limit access to core features (e.g., view demo campaigns, content).
2. **Skip Onboarding:**
   - Allow users to skip the initial setup and configure settings later.
3. **Role Switching:**
   - Allow Admins to switch between roles (e.g., Admin → Manager → User).

### Mermaid Diagram:
```mermaid
graph TD
  A[User Action] --> B{Alternative Flow?}
  B -->|Yes| C{Flow Type}
  B -->|No| D[Proceed Normally]
  C -->|Guest Mode| E[Explore App Without Sign-Up]
  E --> F[Limit Access to Core Features]
  C -->|Skip Onboarding| G[Skip Initial Setup]
  G --> H[Configure Settings Later]
  C -->|Role Switching| I[Switch Roles]
  I --> J[Update Permissions & Access]
```

---

## 6. User Permissions
### Roles:
1. **Admin:**
   - Full access to all features and data.
   - Can manage users, budgets, and competition.
2. **Manager:**
   - Access to campaigns, ads, and analytics.
   - Can export data and view performance metrics.
3. **User:**
   - Access to content creation and product optimization.
   - Can manage cross-selling and technical SEO.

### Mermaid Diagram:
```mermaid
graph TD
  A[User Role] --> B{Admin?}
  B -->|Yes| C[Full Access]
  B -->|No| D{Manager?}
  D -->|Yes| E[Access to Campaigns & Analytics]
  D -->|No| F[Access to Content & SEO]
  C --> G[Manage Users, Budgets, Competition]
  E --> H[Export Data & View Metrics]
  F --> I[Manage Content & Cross-Selling]
```

---

## 7. Notifications
### Triggers:
1. **Campaign Updates:**
   - Notify users when a campaign is optimized or completed.
2. **Content Ready:**
   - Notify users when AI-generated content is ready for review.
3. **Competitor Alerts:**
   - Notify users when competitors change their strategies (e.g., new keywords, ad spend).

### Mermaid Diagram:
```mermaid
graph TD
  A[Trigger Event] --> B{Notification Type}
  B -->|Campaign Update| C[Notify: Campaign Optimized/Completed]
  B -->|Content Ready| D[Notify: Content Ready for Review]
  B -->|Competitor Alert| E[Notify: Competitor Strategy Changed]
  C --> F[Display Notification]
  D --> F
  E --> F
```

---