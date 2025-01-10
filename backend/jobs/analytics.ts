import { Job } from 'bull';
import { prisma } from '../utils/prisma';
import { logger } from '../utils/logger';
import { Queues } from '../utils/queue';
import { fetchAnalytics } from '../services/analyticsService';
import { analyzeCompetitors } from '../services/competitorService';
import { sendNotification } from '../services/notificationService';

// Process analytics update jobs
Queues.analytics.process('hourly-update', async (job: Job) => {
  try {
    logger.info('Starting hourly analytics update');
    
    // Update job progress
    await job.progress(10);
    
    // Haal alle actieve websites op
    const websites = await prisma.website.findMany({
      include: {
        campaigns: {
          where: {
            status: 'ACTIVE',
          },
        },
      },
    });
    
    let processed = 0;
    const total = websites.length;
    
    // Update analytics voor elke website
    for (const website of websites) {
      try {
        // Haal analytics data op
        const analyticsData = await fetchAnalytics(website.url);
        
        // Sla analytics op
        await prisma.analytics.create({
          data: {
            websiteId: website.id,
            pageViews: analyticsData.pageViews,
            uniqueVisitors: analyticsData.uniqueVisitors,
            bounceRate: analyticsData.bounceRate,
            avgTimeOnSite: analyticsData.avgTimeOnSite,
          },
        });
        
        // Update campagne metrics
        for (const campaign of website.campaigns) {
          const campaignMetrics = analyticsData.campaigns[campaign.id];
          if (campaignMetrics) {
            await prisma.campaignMetrics.create({
              data: {
                campaignId: campaign.id,
                impressions: campaignMetrics.impressions,
                clicks: campaignMetrics.clicks,
                ctr: campaignMetrics.ctr,
                averageCpc: campaignMetrics.averageCpc,
                spend: campaignMetrics.spend,
                conversions: campaignMetrics.conversions,
              },
            });
          }
        }
        
        processed++;
        await job.progress(Math.floor((processed / total) * 100));
        
      } catch (error) {
        logger.error(`Error updating analytics for website ${website.id}:`, error);
        // Continue met volgende website
        continue;
      }
    }
    
    logger.info('Hourly analytics update completed');
    
    return { processed, total };
  } catch (error) {
    logger.error('Error in hourly analytics update job:', error);
    throw error;
  }
});

// Process competitor analysis jobs
Queues.analytics.process('competitor-analysis', async (job: Job) => {
  try {
    logger.info('Starting weekly competitor analysis');
    
    // Update job progress
    await job.progress(10);
    
    // Haal alle websites met competitors op
    const websites = await prisma.website.findMany({
      include: {
        competitors: true,
      },
    });
    
    let processed = 0;
    const total = websites.length;
    
    // Analyseer competitors voor elke website
    for (const website of websites) {
      try {
        const competitorAnalysis = await analyzeCompetitors(
          website.url,
          website.competitors.map(c => c.url)
        );
        
        // Update competitor metrics
        for (const competitor of website.competitors) {
          const metrics = competitorAnalysis[competitor.url];
          if (metrics) {
            await prisma.competitorMetrics.create({
              data: {
                competitorId: competitor.id,
                organicKeywords: metrics.organicKeywords,
                paidKeywords: metrics.paidKeywords,
                estimatedTraffic: metrics.estimatedTraffic,
                estimatedBudget: metrics.estimatedBudget,
                averagePosition: metrics.averagePosition,
              },
            });
          }
        }
        
        // Stuur notificatie als er significante veranderingen zijn
        if (competitorAnalysis.significantChanges) {
          await sendNotification({
            type: 'COMPETITOR_CHANGES',
            userId: website.userId,
            data: {
              websiteUrl: website.url,
              changes: competitorAnalysis.significantChanges,
            },
          });
        }
        
        processed++;
        await job.progress(Math.floor((processed / total) * 100));
        
      } catch (error) {
        logger.error(`Error analyzing competitors for website ${website.id}:`, error);
        // Continue met volgende website
        continue;
      }
    }
    
    logger.info('Weekly competitor analysis completed');
    
    return { processed, total };
  } catch (error) {
    logger.error('Error in weekly competitor analysis job:', error);
    throw error;
  }
});
