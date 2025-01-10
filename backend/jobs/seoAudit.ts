import { Job } from 'bull';
import { prisma } from '../utils/prisma';
import { logger } from '../utils/logger';
import { Queues } from '../utils/queue';
import { runSeoAudit } from '../services/seoService';
import { sendNotification } from '../services/notificationService';

// Process SEO audit jobs
Queues.seoAudit.process(async (job: Job) => {
  const { websiteId } = job.data;
  
  try {
    logger.info(`Starting SEO audit for website ${websiteId}`);
    
    // Update job progress
    await job.progress(10);
    
    // Haal website data op
    const website = await prisma.website.findUnique({
      where: { id: websiteId },
      include: {
        contentItems: true,
        keywords: true,
      },
    });
    
    if (!website) {
      throw new Error(`Website ${websiteId} not found`);
    }
    
    await job.progress(20);
    
    // Voer SEO audit uit
    const auditResult = await runSeoAudit(website);
    
    await job.progress(80);
    
    // Sla resultaten op
    const seoAudit = await prisma.seoAudit.create({
      data: {
        websiteId,
        score: auditResult.score,
        issues: auditResult.issues,
        recommendations: auditResult.recommendations,
        metrics: auditResult.metrics,
      },
    });
    
    await job.progress(90);
    
    // Stuur notificatie als er kritieke issues zijn
    if (auditResult.criticalIssues > 0) {
      await sendNotification({
        type: 'SEO_AUDIT_CRITICAL',
        userId: website.userId,
        data: {
          websiteUrl: website.url,
          criticalIssues: auditResult.criticalIssues,
          auditId: seoAudit.id,
        },
      });
    }
    
    await job.progress(100);
    
    logger.info(`SEO audit completed for website ${websiteId}`);
    
    return seoAudit;
  } catch (error) {
    logger.error(`Error in SEO audit job for website ${websiteId}:`, error);
    throw error;
  }
});
