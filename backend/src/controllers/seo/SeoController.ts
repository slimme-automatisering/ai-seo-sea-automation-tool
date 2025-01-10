import { Request, Response } from 'express';
import { SeoAnalysisService } from '../../services/seo/SeoAnalysisService';
import { Logger } from '../../utils/Logger';

export class SeoController {
    private seoService: SeoAnalysisService;
    private logger: Logger;

    constructor(seoService: SeoAnalysisService) {
        this.seoService = seoService;
        this.logger = new Logger('SeoController');
    }

    async analyzePage = async (req: Request, res: Response): Promise<void> => {
        try {
            const { url } = req.body;

            if (!url) {
                res.status(400).json({
                    success: false,
                    error: 'URL is verplicht'
                });
                return;
            }

            const analysis = await this.seoService.analyzePage(url);

            res.status(200).json({
                success: true,
                data: analysis
            });
        } catch (error) {
            this.logger.error('Error analyzing page:', error);
            res.status(500).json({
                success: false,
                error: 'Er is een fout opgetreden bij de SEO analyse'
            });
        }
    };

    async getSuggestions = async (req: Request, res: Response): Promise<void> => {
        try {
            const { url } = req.query;

            if (!url) {
                res.status(400).json({
                    success: false,
                    error: 'URL is verplicht'
                });
                return;
            }

            const analysis = await this.seoService.analyzePage(url.toString());
            
            // Filter alleen de suggesties uit de analyse
            const suggestions = analysis.suggestions;

            res.status(200).json({
                success: true,
                data: { suggestions }
            });
        } catch (error) {
            this.logger.error('Error getting suggestions:', error);
            res.status(500).json({
                success: false,
                error: 'Er is een fout opgetreden bij het ophalen van suggesties'
            });
        }
    };

    async startMonitoring = async (req: Request, res: Response): Promise<void> => {
        try {
            const { url, frequency } = req.body;

            if (!url || !frequency) {
                res.status(400).json({
                    success: false,
                    error: 'URL en frequency zijn verplicht'
                });
                return;
            }

            // TODO: Implementeer monitoring logica
            // Dit zou een achtergrondtaak moeten starten die periodiek de URL analyseert

            res.status(200).json({
                success: true,
                message: 'SEO monitoring gestart'
            });
        } catch (error) {
            this.logger.error('Error starting monitoring:', error);
            res.status(500).json({
                success: false,
                error: 'Er is een fout opgetreden bij het starten van monitoring'
            });
        }
    };
}
