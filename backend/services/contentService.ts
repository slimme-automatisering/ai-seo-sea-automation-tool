import prisma from '../utils/prisma';
import { Logger } from '../utils/logger';

const logger = new Logger('ContentService');

export interface ContentGenerationRequest {
  userId: string;
  type: string;
  keywords: string[];
  targetLength?: number;
  tone?: string;
}

export interface GeneratedContent {
  id: string;
  content: string;
  metadata: any;
}

export class ContentService {
  async generateContent(request: ContentGenerationRequest): Promise<GeneratedContent> {
    try {
      logger.info('Generating content', { request });

      // Here would be the actual content generation logic
      // This is just a placeholder
      const content = await prisma.content.create({
        data: {
          userId: request.userId,
          type: request.type,
          content: 'Generated content placeholder',
          metadata: {
            keywords: request.keywords,
            length: request.targetLength,
            tone: request.tone
          }
        }
      });

      return {
        id: content.id,
        content: content.content,
        metadata: content.metadata
      };
    } catch (error) {
      logger.error('Error generating content:', error);
      throw error;
    }
  }

  async getContentById(id: string): Promise<GeneratedContent | null> {
    try {
      const content = await prisma.content.findUnique({
        where: { id }
      });

      if (!content) {
        return null;
      }

      return {
        id: content.id,
        content: content.content,
        metadata: content.metadata
      };
    } catch (error) {
      logger.error('Error fetching content:', error);
      throw error;
    }
  }
}

export const contentService = new ContentService();
