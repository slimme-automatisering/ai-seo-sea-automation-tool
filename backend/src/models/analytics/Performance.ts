/**
 * TODO: Implement Performance Model
 * 
 * @description
 * Database model voor performance metrics.
 * 
 * @schema
 * ```prisma
 * model Performance {
 *   id          String   @id @default(uuid())
 *   timestamp   DateTime @default(now())
 *   
 *   // SEO Metrics
 *   organicTraffic    Int
 *   rankings          Json
 *   backlinks         Int
 *   
 *   // SEA Metrics
 *   adImpressions     Int
 *   adClicks          Int
 *   adCost            Float
 *   conversions       Int
 *   
 *   // Analytics
 *   bounceRate        Float
 *   avgSessionTime    Int
 *   pageviews         Int
 *   
 *   // Relations
 *   campaignId String?
 *   campaign   Campaign? @relation(fields: [campaignId], references: [id])
 *   
 *   @@index([timestamp])
 *   @@index([campaignId])
 * }
 * ```
 * 
 * @example
 * ```typescript
 * import { Performance } from '@prisma/client';
 * 
 * interface PerformanceMetrics {
 *   seo: {
 *     organicTraffic: number;
 *     rankings: Record<string, number>;
 *     backlinks: number;
 *   };
 *   sea: {
 *     impressions: number;
 *     clicks: number;
 *     cost: number;
 *     conversions: number;
 *   };
 *   analytics: {
 *     bounceRate: number;
 *     avgSessionTime: number;
 *     pageviews: number;
 *   };
 * }
 * ```
 */
