import { Logger } from '../utils/Logger';
import { ConfigService } from '../config/ConfigService';
import axios from 'axios';

export class KeywordResearchService {
    private logger: Logger;
    private semrushApiKey: string;
    private ahrefsApiKey: string;

    constructor(configService: ConfigService) {
        this.logger = new Logger('KeywordResearchService');
        this.semrushApiKey = configService.get('SEMRUSH_API_KEY');
        this.ahrefsApiKey = configService.get('AHREFS_API_KEY');
    }

    async researchKeywords(params: {
        seed: string;
        language: string;
        country: string;
        limit?: number;
    }): Promise<KeywordSuggestion[]> {
        try {
            // Parallel API calls voor betere performance
            const [semrushResults, ahrefsResults] = await Promise.all([
                this.getSemrushKeywords(params),
                this.getAhrefsKeywords(params)
            ]);

            // Combineer en filter duplicaten
            const combinedKeywords = this.combineAndFilterKeywords(
                semrushResults,
                ahrefsResults
            );

            // Sorteer op zoekvolume
            return combinedKeywords
                .sort((a, b) => b.searchVolume - a.searchVolume)
                .slice(0, params.limit || 100);
        } catch (error) {
            this.logger.error('Error researching keywords:', error);
            throw new Error('Kon keyword research niet uitvoeren');
        }
    }

    private async getSemrushKeywords(params: {
        seed: string;
        language: string;
        country: string;
    }): Promise<KeywordSuggestion[]> {
        try {
            const response = await axios.get('https://api.semrush.com', {
                params: {
                    type: 'phrase_these',
                    phrase: params.seed,
                    database: `${params.country}_${params.language}`,
                    key: this.semrushApiKey
                }
            });

            return response.data.map((item: any) => ({
                keyword: item.phrase,
                searchVolume: parseInt(item.volume),
                difficulty: parseInt(item.kd),
                cpc: parseFloat(item.cpc),
                competition: parseFloat(item.competition),
                source: 'semrush'
            }));
        } catch (error) {
            this.logger.error('Error getting SEMrush keywords:', error);
            return [];
        }
    }

    private async getAhrefsKeywords(params: {
        seed: string;
        language: string;
        country: string;
    }): Promise<KeywordSuggestion[]> {
        try {
            const response = await axios.get('https://api.ahrefs.com/v1/keywords-suggestions', {
                params: {
                    keyword: params.seed,
                    country: params.country,
                    token: this.ahrefsApiKey
                }
            });

            return response.data.keywords.map((item: any) => ({
                keyword: item.keyword,
                searchVolume: item.search_volume,
                difficulty: item.keyword_difficulty,
                cpc: item.cpc,
                competition: item.competition_density,
                source: 'ahrefs'
            }));
        } catch (error) {
            this.logger.error('Error getting Ahrefs keywords:', error);
            return [];
        }
    }

    private combineAndFilterKeywords(
        semrushKeywords: KeywordSuggestion[],
        ahrefsKeywords: KeywordSuggestion[]
    ): KeywordSuggestion[] {
        const keywordMap = new Map<string, KeywordSuggestion>();

        // Voeg SEMrush keywords toe
        semrushKeywords.forEach(kw => {
            keywordMap.set(kw.keyword.toLowerCase(), kw);
        });

        // Voeg Ahrefs keywords toe of update bestaande met gemiddelde metrics
        ahrefsKeywords.forEach(kw => {
            const key = kw.keyword.toLowerCase();
            if (keywordMap.has(key)) {
                const existing = keywordMap.get(key)!;
                keywordMap.set(key, {
                    keyword: kw.keyword,
                    searchVolume: Math.round((existing.searchVolume + kw.searchVolume) / 2),
                    difficulty: Math.round((existing.difficulty + kw.difficulty) / 2),
                    cpc: (existing.cpc + kw.cpc) / 2,
                    competition: (existing.competition + kw.competition) / 2,
                    source: 'combined'
                });
            } else {
                keywordMap.set(key, kw);
            }
        });

        return Array.from(keywordMap.values());
    }

    async analyzeKeywordDifficulty(keyword: string): Promise<KeywordAnalysis> {
        try {
            // Combineer data van beide APIs voor een complete analyse
            const [semrushAnalysis, ahrefsAnalysis] = await Promise.all([
                this.getSemrushKeywordAnalysis(keyword),
                this.getAhrefsKeywordAnalysis(keyword)
            ]);

            return {
                keyword,
                difficulty: Math.round((semrushAnalysis.difficulty + ahrefsAnalysis.difficulty) / 2),
                searchVolume: Math.round((semrushAnalysis.searchVolume + ahrefsAnalysis.searchVolume) / 2),
                cpc: (semrushAnalysis.cpc + ahrefsAnalysis.cpc) / 2,
                competition: (semrushAnalysis.competition + ahrefsAnalysis.competition) / 2,
                serp: this.combineSerpData(semrushAnalysis.serp, ahrefsAnalysis.serp),
                trend: this.combineTrendData(semrushAnalysis.trend, ahrefsAnalysis.trend)
            };
        } catch (error) {
            this.logger.error('Error analyzing keyword difficulty:', error);
            throw new Error('Kon keyword moeilijkheid niet analyseren');
        }
    }

    private async getSemrushKeywordAnalysis(keyword: string): Promise<KeywordAnalysis> {
        // Implementatie voor SEMrush API
        return {} as KeywordAnalysis;
    }

    private async getAhrefsKeywordAnalysis(keyword: string): Promise<KeywordAnalysis> {
        // Implementatie voor Ahrefs API
        return {} as KeywordAnalysis;
    }

    private combineSerpData(
        semrushSerp: SerpResult[],
        ahrefsSerp: SerpResult[]
    ): SerpResult[] {
        // Combineer en deduplicate SERP data
        const combinedSerp = new Map<string, SerpResult>();
        
        [...semrushSerp, ...ahrefsSerp].forEach(result => {
            if (!combinedSerp.has(result.url)) {
                combinedSerp.set(result.url, result);
            }
        });

        return Array.from(combinedSerp.values())
            .sort((a, b) => a.position - b.position)
            .slice(0, 10);
    }

    private combineTrendData(
        semrushTrend: MonthlyTrend[],
        ahrefsTrend: MonthlyTrend[]
    ): MonthlyTrend[] {
        const trendMap = new Map<string, MonthlyTrend>();

        // Combineer trend data van beide bronnen
        [...semrushTrend, ...ahrefsTrend].forEach(trend => {
            if (trendMap.has(trend.month)) {
                const existing = trendMap.get(trend.month)!;
                trendMap.set(trend.month, {
                    month: trend.month,
                    searchVolume: Math.round((existing.searchVolume + trend.searchVolume) / 2)
                });
            } else {
                trendMap.set(trend.month, trend);
            }
        });

        return Array.from(trendMap.values())
            .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
    }
}

interface KeywordSuggestion {
    keyword: string;
    searchVolume: number;
    difficulty: number;
    cpc: number;
    competition: number;
    source: 'semrush' | 'ahrefs' | 'combined';
}

interface KeywordAnalysis {
    keyword: string;
    difficulty: number;
    searchVolume: number;
    cpc: number;
    competition: number;
    serp: SerpResult[];
    trend: MonthlyTrend[];
}

interface SerpResult {
    position: number;
    url: string;
    title: string;
    description: string;
}

interface MonthlyTrend {
    month: string;  // Format: 'YYYY-MM'
    searchVolume: number;
}
