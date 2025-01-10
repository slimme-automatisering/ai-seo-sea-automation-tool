import { Router } from 'express';
import { ContentController } from '../controllers/content/ContentController';
import { SeoController } from '../controllers/seo/SeoController';
import { GoogleAdsController } from '../controllers/google/GoogleAdsController';
import { KeywordController } from '../controllers/keyword/KeywordController';
import { CompetitorController } from '../controllers/competitor/CompetitorController';
import { MonitoringController } from '../controllers/monitoring/MonitoringController';

// Services
import { ContentGenerationService } from '../services/seo/ContentGenerationService';
import { SeoAnalysisService } from '../services/seo/SeoAnalysisService';
import { GoogleAdsService } from '../services/google/GoogleAdsService';
import { KeywordResearchService } from '../services/keyword/KeywordResearchService';
import { CompetitorTrackingService } from '../services/competitor/CompetitorTrackingService';
import { ConfigService } from '../services/config/ConfigService';

// Middleware
import { authenticate } from '../middleware/auth';
import { rateLimiter } from '../middleware/rateLimiter';
import { validateRequest } from '../middleware/validation';

export function setupApiRoutes(configService: ConfigService): Router {
    const router = Router();

    // Instantieer services
    const contentService = new ContentGenerationService(configService);
    const seoService = new SeoAnalysisService();
    const adsService = new GoogleAdsService(configService);
    const keywordService = new KeywordResearchService(configService);
    const competitorService = new CompetitorTrackingService(
        configService,
        seoService,
        keywordService
    );

    // Instantieer controllers
    const contentController = new ContentController(contentService);
    const seoController = new SeoController(seoService);
    const adsController = new GoogleAdsController(adsService);
    const keywordController = new KeywordController(keywordService);
    const competitorController = new CompetitorController(competitorService);
    const monitoringController = new MonitoringController();

    // Content routes
    router.post(
        '/content/generate',
        authenticate,
        rateLimiter,
        validateRequest,
        contentController.generateContent
    );
    
    router.post(
        '/content/optimize',
        authenticate,
        rateLimiter,
        validateRequest,
        contentController.optimizeContent
    );

    // SEO routes
    router.post(
        '/seo/analyze',
        authenticate,
        rateLimiter,
        validateRequest,
        seoController.analyzePage
    );
    
    router.get(
        '/seo/suggestions',
        authenticate,
        rateLimiter,
        seoController.getSuggestions
    );
    
    router.post(
        '/seo/monitor',
        authenticate,
        rateLimiter,
        validateRequest,
        seoController.startMonitoring
    );

    // Google Ads routes
    router.post(
        '/ads/campaigns',
        authenticate,
        rateLimiter,
        validateRequest,
        adsController.createCampaign
    );
    
    router.get(
        '/ads/campaigns/:id',
        authenticate,
        rateLimiter,
        adsController.getCampaignDetails
    );
    
    router.get(
        '/ads/campaigns/:id/performance',
        authenticate,
        rateLimiter,
        adsController.getCampaignPerformance
    );

    // Keyword routes
    router.post(
        '/keywords/research',
        authenticate,
        rateLimiter,
        validateRequest,
        keywordController.researchKeywords
    );
    
    router.get(
        '/keywords/analyze/:keyword',
        authenticate,
        rateLimiter,
        keywordController.analyzeKeyword
    );
    
    router.get(
        '/keywords/suggestions',
        authenticate,
        rateLimiter,
        keywordController.getKeywordSuggestions
    );

    // Competitor routes
    router.post(
        '/competitors/track',
        authenticate,
        rateLimiter,
        validateRequest,
        competitorController.trackCompetitor
    );
    
    router.get(
        '/competitors/:id/analysis',
        authenticate,
        rateLimiter,
        competitorController.getCompetitorAnalysis
    );
    
    router.get(
        '/competitors/:id/gaps',
        authenticate,
        rateLimiter,
        competitorController.getContentGaps
    );

    // Monitoring routes
    router.get(
        '/monitoring/health',
        monitoringController.healthCheck
    );
    
    router.get(
        '/monitoring/live',
        monitoringController.livenessProbe
    );
    
    router.get(
        '/monitoring/ready',
        monitoringController.readinessProbe
    );
    
    router.get(
        '/monitoring/metrics',
        authenticate,
        monitoringController.getMetrics
    );
    
    router.get(
        '/monitoring/system',
        authenticate,
        monitoringController.getSystemStatus
    );

    return router;
}
