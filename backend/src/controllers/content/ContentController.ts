import { Request, Response } from 'express';
import { ContentGenerationService } from '../../services/seo/ContentGenerationService';
import { Logger } from '../../utils/Logger';

export class ContentController {
    private contentService: ContentGenerationService;
    private logger: Logger;

    constructor(contentService: ContentGenerationService) {
        this.contentService = contentService;
        this.logger = new Logger('ContentController');
    }

    async generateContent = async (req: Request, res: Response): Promise<void> => {
        try {
            const { type, keywords, tone, length, context } = req.body;

            if (!type || !keywords) {
                res.status(400).json({
                    success: false,
                    error: 'Type en keywords zijn verplicht'
                });
                return;
            }

            const content = await this.contentService.generateContent({
                type,
                keywords,
                tone,
                length,
                context
            });

            res.status(200).json({
                success: true,
                data: { content }
            });
        } catch (error) {
            this.logger.error('Error generating content:', error);
            res.status(500).json({
                success: false,
                error: 'Er is een fout opgetreden bij het genereren van content'
            });
        }
    };

    async optimizeContent = async (req: Request, res: Response): Promise<void> => {
        try {
            const { content, keywords } = req.body;

            if (!content || !keywords) {
                res.status(400).json({
                    success: false,
                    error: 'Content en keywords zijn verplicht'
                });
                return;
            }

            const optimizedContent = await this.contentService.optimizeContent(
                content,
                keywords
            );

            res.status(200).json({
                success: true,
                data: { content: optimizedContent }
            });
        } catch (error) {
            this.logger.error('Error optimizing content:', error);
            res.status(500).json({
                success: false,
                error: 'Er is een fout opgetreden bij het optimaliseren van content'
            });
        }
    };
}
