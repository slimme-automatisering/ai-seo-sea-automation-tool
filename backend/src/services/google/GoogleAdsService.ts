import { google } from 'googleapis';
import { Logger } from '../utils/Logger';
import { ConfigService } from '../config/ConfigService';

export class GoogleAdsService {
    private auth: any;
    private adsService: any;
    private logger: Logger;
    private customerId: string;

    constructor(configService: ConfigService) {
        this.logger = new Logger('GoogleAdsService');
        this.customerId = configService.get('GOOGLE_ADS_CUSTOMER_ID');
        
        this.initializeAuth(
            configService.get('GOOGLE_ADS_CLIENT_ID'),
            configService.get('GOOGLE_ADS_CLIENT_SECRET'),
            configService.get('GOOGLE_ADS_REFRESH_TOKEN')
        );
    }

    private async initializeAuth(clientId: string, clientSecret: string, refreshToken: string) {
        try {
            this.auth = new google.auth.OAuth2(clientId, clientSecret);
            this.auth.setCredentials({ refresh_token: refreshToken });
            
            this.adsService = google.ads({
                version: 'v14',
                auth: this.auth
            });
        } catch (error) {
            this.logger.error('Error initializing Google Ads API:', error);
            throw new Error('Kon Google Ads API niet initialiseren');
        }
    }

    async createCampaign(params: {
        name: string;
        budget: number;
        targetLocations: string[];
        keywords: string[];
        negativeKeywords?: string[];
        startDate?: Date;
        endDate?: Date;
    }): Promise<string> {
        try {
            // 1. Maak campaign budget
            const budgetResource = await this.createBudget(params.budget);

            // 2. Maak de campaign
            const campaign = await this.adsService.customers.campaigns.create({
                customerId: this.customerId,
                requestBody: {
                    campaign: {
                        name: params.name,
                        advertisingChannelType: 'SEARCH',
                        status: 'ENABLED',
                        campaignBudget: budgetResource,
                        targetSpend: {
                            cpcBidCeilingMicros: params.budget * 1000000
                        },
                        startDate: params.startDate?.toISOString().split('T')[0] || 
                                 new Date().toISOString().split('T')[0],
                        endDate: params.endDate?.toISOString().split('T')[0]
                    }
                }
            });

            // 3. Voeg targeting toe
            await this.setLocationTargeting(campaign.id, params.targetLocations);

            // 4. Voeg keywords toe
            await this.addKeywords(campaign.id, params.keywords);

            // 5. Voeg negative keywords toe indien aanwezig
            if (params.negativeKeywords?.length) {
                await this.addNegativeKeywords(campaign.id, params.negativeKeywords);
            }

            return campaign.id;
        } catch (error) {
            this.logger.error('Error creating campaign:', error);
            throw new Error('Kon campagne niet aanmaken');
        }
    }

    private async createBudget(amount: number): Promise<string> {
        try {
            const response = await this.adsService.customers.campaignBudgets.create({
                customerId: this.customerId,
                requestBody: {
                    campaignBudget: {
                        name: `Budget-${Date.now()}`,
                        amountMicros: amount * 1000000,
                        deliveryMethod: 'STANDARD'
                    }
                }
            });

            return response.resourceName;
        } catch (error) {
            this.logger.error('Error creating budget:', error);
            throw new Error('Kon budget niet aanmaken');
        }
    }

    private async setLocationTargeting(campaignId: string, locations: string[]) {
        try {
            await this.adsService.customers.campaignCriteria.create({
                customerId: this.customerId,
                requestBody: {
                    campaignId: campaignId,
                    locations: locations.map(location => ({
                        type: 'LOCATION',
                        locationId: location
                    }))
                }
            });
        } catch (error) {
            this.logger.error('Error setting location targeting:', error);
            throw new Error('Kon locatie targeting niet instellen');
        }
    }

    private async addKeywords(campaignId: string, keywords: string[]) {
        try {
            const adGroup = await this.createAdGroup(campaignId);
            
            for (const keyword of keywords) {
                await this.adsService.customers.adGroupCriteria.create({
                    customerId: this.customerId,
                    requestBody: {
                        adGroupId: adGroup.id,
                        keyword: {
                            text: keyword,
                            matchType: 'PHRASE'
                        }
                    }
                });
            }
        } catch (error) {
            this.logger.error('Error adding keywords:', error);
            throw new Error('Kon keywords niet toevoegen');
        }
    }

    private async addNegativeKeywords(campaignId: string, keywords: string[]) {
        try {
            for (const keyword of keywords) {
                await this.adsService.customers.campaignCriteria.create({
                    customerId: this.customerId,
                    requestBody: {
                        campaignId: campaignId,
                        negative: true,
                        keyword: {
                            text: keyword,
                            matchType: 'EXACT'
                        }
                    }
                });
            }
        } catch (error) {
            this.logger.error('Error adding negative keywords:', error);
            throw new Error('Kon negative keywords niet toevoegen');
        }
    }

    private async createAdGroup(campaignId: string) {
        try {
            return await this.adsService.customers.adGroups.create({
                customerId: this.customerId,
                requestBody: {
                    campaignId: campaignId,
                    name: `AdGroup-${Date.now()}`,
                    status: 'ENABLED',
                    type: 'SEARCH_STANDARD'
                }
            });
        } catch (error) {
            this.logger.error('Error creating ad group:', error);
            throw new Error('Kon ad group niet aanmaken');
        }
    }

    async getCampaignPerformance(campaignId: string): Promise<CampaignPerformance> {
        try {
            const response = await this.adsService.customers.campaigns.get({
                customerId: this.customerId,
                resourceName: campaignId,
                metrics: [
                    'clicks',
                    'impressions',
                    'ctr',
                    'averageCpc',
                    'conversions',
                    'costPerConversion'
                ]
            });

            return {
                clicks: response.metrics.clicks,
                impressions: response.metrics.impressions,
                ctr: response.metrics.ctr,
                averageCpc: response.metrics.averageCpc / 1000000,
                conversions: response.metrics.conversions,
                costPerConversion: response.metrics.costPerConversion / 1000000
            };
        } catch (error) {
            this.logger.error('Error getting campaign performance:', error);
            throw new Error('Kon campagne prestaties niet ophalen');
        }
    }
}

interface CampaignPerformance {
    clicks: number;
    impressions: number;
    ctr: number;
    averageCpc: number;
    conversions: number;
    costPerConversion: number;
}
