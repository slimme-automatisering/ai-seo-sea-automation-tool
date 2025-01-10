import { Job } from 'bull';
import { prisma } from '../utils/prisma';
import { logger } from '../utils/logger';
import { Queues } from '../utils/queue';
import { generateContent } from '../services/contentService';
import { optimizeContent } from '../services/seoService';
import { sendNotification } from '../services/notificationService';

// Process content generation jobs
Queues.contentGeneration.process(async (job: Job) => {
  const { websiteId, contentType, keywords, tone, length } = job.data;
  
  try {
    logger.info(`Starting content generation for website ${websiteId}`);
    
    // Update job progress
    await job.progress(10);
    
    // Haal website data op
    const website = await prisma.website.findUnique({
      where: { id: websiteId },
      include: {
        keywords: true,
      },
    });
    
    if (!website) {
      throw new Error(`Website ${websiteId} not found`);
    }
    
    await job.progress(20);
    
    // Genereer content
    const generatedContent = await generateContent({
      type: contentType,
      keywords,
      tone,
      length,
      websiteContext: website.url,
    });
    
    await job.progress(60);
    
    // Optimaliseer content voor SEO
    const optimizedContent = await optimizeContent(generatedContent, keywords);
    
    await job.progress(80);
    
    // Sla content op
    const contentItem = await prisma.contentItem.create({
      data: {
        websiteId,
        type: contentType,
        title: optimizedContent.title,
        content: optimizedContent.content,
        metaTitle: optimizedContent.metaTitle,
        metaDescription: optimizedContent.metaDescription,
        keywords,
        url: optimizedContent.suggestedUrl,
        aiGenerated: true,
      },
    });
    
    await job.progress(90);
    
    // Stuur notificatie
    await sendNotification({
      type: 'CONTENT_GENERATED',
      userId: website.userId,
      data: {
        websiteUrl: website.url,
        contentId: contentItem.id,
        contentType,
      },
    });
    
    await job.progress(100);
    
    logger.info(`Content generation completed for website ${websiteId}`);
    
    return contentItem;
  } catch (error) {
    logger.error(`Error in content generation job for website ${websiteId}:`, error);
    throw error;
  }
});
