import { Job } from 'bull';
import prisma from '../utils/prisma';
import { Logger } from '../utils/logger';
import { contentQueue } from '../utils/queue';
import { contentService, ContentGenerationRequest } from '../services/contentService';
import { seoService } from '../services/seoService';
import { notificationService } from '../services/notificationService';

const logger = new Logger('ContentGenerationJob');

interface ContentJobData {
  userId: string;
  requestId: string;
  type: string;
  keywords: string[];
  targetLength?: number;
  tone?: string;
}

export const processContentGeneration = async (job: Job<ContentJobData>) => {
  try {
    logger.info('Processing content generation job', { jobId: job.id });

    const { userId, requestId, ...contentRequest } = job.data;

    // Generate content
    const generatedContent = await contentService.generateContent({
      userId,
      ...contentRequest
    });

    // Perform SEO analysis on generated content
    const seoAudit = await seoService.performAudit({
      userId,
      url: 'content://' + generatedContent.id,
      checkLinks: true,
      checkImages: true
    });

    // Store the results
    await prisma.contentGenerationResult.create({
      data: {
        requestId,
        userId,
        contentId: generatedContent.id,
        seoAuditId: seoAudit.id,
        status: 'completed'
      }
    });

    // Notify user
    await notificationService.createNotification(
      userId,
      'content_generation_complete',
      'Content Generation Complete',
      'Your content has been generated and analyzed.',
      {
        contentId: generatedContent.id,
        seoAuditId: seoAudit.id
      }
    );

    logger.info('Content generation job completed', { jobId: job.id });
    return { success: true, contentId: generatedContent.id, seoAuditId: seoAudit.id };
  } catch (error) {
    logger.error('Error processing content generation job:', error);
    
    // Update status to failed
    await prisma.contentGenerationResult.update({
      where: { requestId: job.data.requestId },
      data: { status: 'failed', error: error.message }
    });

    // Notify user of failure
    await notificationService.createNotification(
      job.data.userId,
      'content_generation_failed',
      'Content Generation Failed',
      'There was an error generating your content.',
      { error: error.message }
    );

    throw error;
  }
};

// Set up job processor
contentQueue.process(async (job: Job<ContentJobData>) => {
  return processContentGeneration(job);
});
