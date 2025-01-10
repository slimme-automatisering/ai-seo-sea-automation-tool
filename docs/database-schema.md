# Database Schema Documentation

## 1. PostgreSQL Schema
### Users Table
- **id:** Primary key (UUID).
- **email:** Unique email address (string).
- **passwordHash:** Hashed password (string).
- **role:** User role (enum: Admin, Manager, User).

### Campaigns Table
- **id:** Primary key (UUID).
- **userId:** Foreign key referencing Users (UUID).
- **name:** Campaign name (string).
- **budget:** Campaign budget (float).
- **startDate:** Campaign start date (date).
- **endDate:** Campaign end date (date).

### Content Table
- **id:** Primary key (UUID).
- **campaignId:** Foreign key referencing Campaigns (UUID).
- **type:** Content type (enum: Blog Post, Product Description).
- **text:** Content text (string).
- **createdAt:** Content creation date (timestamp).

### Keywords Table
- **id:** Primary key (UUID).
- **campaignId:** Foreign key referencing Campaigns (UUID).
- **keyword:** Keyword (string).
- **cpc:** Cost per click (float).

## 2. MongoDB Schema
### Logs Collection
- **id:** Primary key (ObjectId).
- **timestamp:** Log timestamp (date).
- **level:** Log level (enum: info, warn, error).
- **message:** Log message (string).

### Analytics Collection
- **id:** Primary key (ObjectId).
- **campaignId:** Foreign key referencing Campaigns (UUID).
- **metrics:** Analytics data (object).

## 3. Relationships
- **Users → Campaigns:** One-to-many (a user can have multiple campaigns).
- **Campaigns → Content:** One-to-many (a campaign can have multiple content pieces).
- **Campaigns → Keywords:** One-to-many (a campaign can have multiple keywords).

## 4. Indexing
- **Users.email:** Unique index for fast lookups.
- **Campaigns.userId:** Index for filtering campaigns by user.
- **Keywords.keyword:** Index for fast keyword searches.

## 5. Migrations
- **Sequelize:** Use Sequelize migrations for PostgreSQL schema changes.
- **Mongoose:** Use Mongoose schema updates for MongoDB changes.

## 6. Backup Strategy
- **Automated Backups:** Daily backups of PostgreSQL and MongoDB.
- **Storage:** Backups stored in AWS S3 with versioning enabled.