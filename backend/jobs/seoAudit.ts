import { Job } from 'bull';
import prisma from '../utils/prisma';
import { Logger } from '../utils/logger';
import { seoQueue } from '../utils/queue';
import { seoService, SEOAuditRequest } from '../services/seoService';
import { notificationService } from '../services/notificationService';

const logger = new Logger('SEOAuditJob');

interface SEOAuditJobData {
  userId: string;
  requestId: string;
  url: string;
  depth?: number;
  checkLinks?: boolean;
  checkImages?: boolean;
}

export const processSEOAudit = async (job: Job<SEOAuditJobData>) => {
  try {
    logger.info('Processing SEO audit job', { jobId: job.id });

    const { userId, requestId, ...auditRequest } = job.data;

    // Perform SEO audit
    const auditResult = await seoService.performAudit({
      userId,
      ...auditRequest
    });

    // Store the results
    await prisma.seoAuditResult.create({
      data: {
        requestId,
        userId,
        auditId: auditResult.id,
        status: 'completed',
        score: auditResult.score,
        findings: auditResult.findings
      }
    });

    // Notify user
    await notificationService.createNotification(
      userId,
      'seo_audit_complete',
      'SEO Audit Complete',
      `SEO audit for ${auditRequest.url} has been completed with a score of ${auditResult.score}`,
      {
        auditId: auditResult.id,
        score: auditResult.score,
        findingsCount: auditResult.findings.length
      }
    );

    logger.info('SEO audit job completed', { jobId: job.id });
    return { success: true, auditId: auditResult.id };
  } catch (error) {
    logger.error('Error processing SEO audit job:', error);
    
    // Update status to failed
    await prisma.seoAuditResult.update({
      where: { requestId: job.data.requestId },
      data: { status: 'failed', error: error.message }
    });

    // Notify user of failure
    await notificationService.createNotification(
      job.data.userId,
      'seo_audit_failed',
      'SEO Audit Failed',
      `There was an error performing the SEO audit for ${job.data.url}`,
      { error: error.message }
    );

    throw error;
  }
};

// Set up job processor
seoQueue.process(async (job: Job<SEOAuditJobData>) => {
  return processSEOAudit(job);
});
