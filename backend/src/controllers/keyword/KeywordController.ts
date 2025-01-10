import { Request, Response } from 'express';
import { KeywordResearchService } from '../../services/keyword/KeywordResearchService';
import { Logger } from '../../utils/Logger';

export class KeywordController {
    private keywordService: KeywordResearchService;
    private logger: Logger;

    constructor(keywordService: KeywordResearchService) {
        this.keywordService = keywordService;
        this.logger = new Logger('KeywordController');
    }

    async researchKeywords = async (req: Request, res: Response): Promise<void> => {
        try {
            const { seed, language, country, limit } = req.body;

            if (!seed || !language || !country) {
                res.status(400).json({
                    success: false,
                    error: 'Seed keyword, taal en land zijn verplicht'
                });
                return;
            }

            const keywords = await this.keywordService.researchKeywords({
                seed,
                language,
                country,
                limit
            });

            res.status(200).json({
                success: true,
                data: { keywords }
            });
        } catch (error) {
            this.logger.error('Error researching keywords:', error);
            res.status(500).json({
                success: false,
                error: 'Er is een fout opgetreden bij het keyword onderzoek'
            });
        }
    };

    async analyzeKeyword = async (req: Request, res: Response): Promise<void> => {
        try {
            const { keyword } = req.params;

            if (!keyword) {
                res.status(400).json({
                    success: false,
                    error: 'Keyword is verplicht'
                });
                return;
            }

            const analysis = await this.keywordService.analyzeKeywordDifficulty(keyword);

            res.status(200).json({
                success: true,
                data: analysis
            });
        } catch (error) {
            this.logger.error('Error analyzing keyword:', error);
            res.status(500).json({
                success: false,
                error: 'Er is een fout opgetreden bij de keyword analyse'
            });
        }
    };

    async getKeywordSuggestions = async (req: Request, res: Response): Promise<void> => {
        try {
            const { seed, language = 'nl', country = 'NL', limit = 100 } = req.query;

            if (!seed) {
                res.status(400).json({
                    success: false,
                    error: 'Seed keyword is verplicht'
                });
                return;
            }

            const keywords = await this.keywordService.researchKeywords({
                seed: seed.toString(),
                language: language.toString(),
                country: country.toString(),
                limit: parseInt(limit.toString())
            });

            res.status(200).json({
                success: true,
                data: { keywords }
            });
        } catch (error) {
            this.logger.error('Error getting keyword suggestions:', error);
            res.status(500).json({
                success: false,
                error: 'Er is een fout opgetreden bij het ophalen van keyword suggesties'
            });
        }
    };
}
