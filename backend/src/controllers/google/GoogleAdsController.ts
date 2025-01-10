import { Request, Response } from 'express';
import { GoogleAdsService } from '../../services/google/GoogleAdsService';
import { Logger } from '../../utils/Logger';

export class GoogleAdsController {
    private adsService: GoogleAdsService;
    private logger: Logger;

    constructor(adsService: GoogleAdsService) {
        this.adsService = adsService;
        this.logger = new Logger('GoogleAdsController');
    }

    async createCampaign = async (req: Request, res: Response): Promise<void> => {
        try {
            const {
                name,
                budget,
                targetLocations,
                keywords,
                negativeKeywords,
                startDate,
                endDate
            } = req.body;

            if (!name || !budget || !targetLocations || !keywords) {
                res.status(400).json({
                    success: false,
                    error: 'Naam, budget, doellocaties en keywords zijn verplicht'
                });
                return;
            }

            const campaignId = await this.adsService.createCampaign({
                name,
                budget,
                targetLocations,
                keywords,
                negativeKeywords,
                startDate: startDate ? new Date(startDate) : undefined,
                endDate: endDate ? new Date(endDate) : undefined
            });

            res.status(201).json({
                success: true,
                data: { campaignId }
            });
        } catch (error) {
            this.logger.error('Error creating campaign:', error);
            res.status(500).json({
                success: false,
                error: 'Er is een fout opgetreden bij het aanmaken van de campagne'
            });
        }
    };

    async getCampaignDetails = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(400).json({
                    success: false,
                    error: 'Campaign ID is verplicht'
                });
                return;
            }

            const performance = await this.adsService.getCampaignPerformance(id);

            res.status(200).json({
                success: true,
                data: performance
            });
        } catch (error) {
            this.logger.error('Error getting campaign details:', error);
            res.status(500).json({
                success: false,
                error: 'Er is een fout opgetreden bij het ophalen van campagne details'
            });
        }
    };

    async getCampaignPerformance = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(400).json({
                    success: false,
                    error: 'Campaign ID is verplicht'
                });
                return;
            }

            const performance = await this.adsService.getCampaignPerformance(id);

            res.status(200).json({
                success: true,
                data: performance
            });
        } catch (error) {
            this.logger.error('Error getting campaign performance:', error);
            res.status(500).json({
                success: false,
                error: 'Er is een fout opgetreden bij het ophalen van campagne prestaties'
            });
        }
    };
}
