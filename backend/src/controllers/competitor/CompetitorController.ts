import { Request, Response } from 'express';
import { CompetitorTrackingService } from '../../services/competitor/CompetitorTrackingService';
import { Logger } from '../../utils/Logger';

export class CompetitorController {
    private competitorService: CompetitorTrackingService;
    private logger: Logger;

    constructor(competitorService: CompetitorTrackingService) {
        this.competitorService = competitorService;
        this.logger = new Logger('CompetitorController');
    }

    async trackCompetitor = async (req: Request, res: Response): Promise<void> => {
        try {
            const { url, keywords, trackingFrequency } = req.body;

            if (!url || !keywords || !trackingFrequency) {
                res.status(400).json({
                    success: false,
                    error: 'URL, keywords en tracking frequency zijn verplicht'
                });
                return;
            }

            const analysis = await this.competitorService.trackCompetitor({
                url,
                keywords,
                trackingFrequency
            });

            res.status(200).json({
                success: true,
                data: analysis
            });
        } catch (error) {
            this.logger.error('Error tracking competitor:', error);
            res.status(500).json({
                success: false,
                error: 'Er is een fout opgetreden bij het tracken van de concurrent'
            });
        }
    };

    async getCompetitorAnalysis = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(400).json({
                    success: false,
                    error: 'Competitor ID is verplicht'
                });
                return;
            }

            // TODO: Implementeer ophalen van opgeslagen competitor analyse
            res.status(501).json({
                success: false,
                error: 'Deze functionaliteit is nog niet geïmplementeerd'
            });
        } catch (error) {
            this.logger.error('Error getting competitor analysis:', error);
            res.status(500).json({
                success: false,
                error: 'Er is een fout opgetreden bij het ophalen van de concurrent analyse'
            });
        }
    };

    async getContentGaps = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(400).json({
                    success: false,
                    error: 'Competitor ID is verplicht'
                });
                return;
            }

            // TODO: Implementeer ophalen van content gaps
            res.status(501).json({
                success: false,
                error: 'Deze functionaliteit is nog niet geïmplementeerd'
            });
        } catch (error) {
            this.logger.error('Error getting content gaps:', error);
            res.status(500).json({
                success: false,
                error: 'Er is een fout opgetreden bij het ophalen van content gaps'
            });
        }
    };
}
