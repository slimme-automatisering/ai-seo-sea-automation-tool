import { ContentController } from '../../controllers/content/ContentController';
import { ContentGenerationService } from '../../services/seo/ContentGenerationService';
import { Request, Response } from 'express';

jest.mock('../../services/seo/ContentGenerationService');

describe('ContentController', () => {
    let contentController: ContentController;
    let mockContentService: jest.Mocked<ContentGenerationService>;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: jest.Mock;

    beforeEach(() => {
        mockContentService = {
            generateContent: jest.fn(),
            optimizeContent: jest.fn(),
        } as any;

        contentController = new ContentController(mockContentService);

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        mockNext = jest.fn();
    });

    describe('generateContent', () => {
        it('should return 400 when required fields are missing', async () => {
            mockRequest = {
                body: {}
            };

            await contentController.generateContent(
                mockRequest as Request,
                mockResponse as Response
            );

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                success: false,
                error: 'Type en keywords zijn verplicht'
            });
        });

        it('should generate content successfully', async () => {
            const mockContent = 'Generated content';
            mockContentService.generateContent.mockResolvedValue(mockContent);

            mockRequest = {
                body: {
                    type: 'blog',
                    keywords: ['test', 'keyword'],
                    tone: 'professional'
                }
            };

            await contentController.generateContent(
                mockRequest as Request,
                mockResponse as Response
            );

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                success: true,
                data: { content: mockContent }
            });
        });

        it('should handle service errors', async () => {
            mockContentService.generateContent.mockRejectedValue(new Error('Service error'));

            mockRequest = {
                body: {
                    type: 'blog',
                    keywords: ['test']
                }
            };

            await contentController.generateContent(
                mockRequest as Request,
                mockResponse as Response
            );

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                success: false,
                error: 'Er is een fout opgetreden bij het genereren van content'
            });
        });
    });

    describe('optimizeContent', () => {
        it('should return 400 when required fields are missing', async () => {
            mockRequest = {
                body: {}
            };

            await contentController.optimizeContent(
                mockRequest as Request,
                mockResponse as Response
            );

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                success: false,
                error: 'Content en keywords zijn verplicht'
            });
        });

        it('should optimize content successfully', async () => {
            const mockOptimizedContent = 'Optimized content';
            mockContentService.optimizeContent.mockResolvedValue(mockOptimizedContent);

            mockRequest = {
                body: {
                    content: 'Original content',
                    keywords: ['test', 'keyword']
                }
            };

            await contentController.optimizeContent(
                mockRequest as Request,
                mockResponse as Response
            );

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                success: true,
                data: { content: mockOptimizedContent }
            });
        });

        it('should handle service errors', async () => {
            mockContentService.optimizeContent.mockRejectedValue(new Error('Service error'));

            mockRequest = {
                body: {
                    content: 'Test content',
                    keywords: ['test']
                }
            };

            await contentController.optimizeContent(
                mockRequest as Request,
                mockResponse as Response
            );

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                success: false,
                error: 'Er is een fout opgetreden bij het optimaliseren van content'
            });
        });
    });
});
