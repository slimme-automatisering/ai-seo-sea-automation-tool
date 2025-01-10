import { OpenAI } from 'openai';
import { ConfigService } from '../config/ConfigService';
import { Logger } from '../utils/Logger';

export class ContentGenerationService {
    private openai: OpenAI;
    private logger: Logger;

    constructor(configService: ConfigService) {
        this.openai = new OpenAI({
            apiKey: configService.get('OPENAI_API_KEY')
        });
        this.logger = new Logger('ContentGenerationService');
    }

    async generateContent(params: {
        type: 'blog' | 'product' | 'meta' | 'alt-text';
        keywords: string[];
        tone?: string;
        length?: number;
        context?: string;
    }): Promise<string> {
        try {
            const prompt = this.buildPrompt(params);
            const response = await this.openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "Je bent een expert SEO copywriter die natuurlijk klinkende, SEO-geoptimaliseerde content schrijft."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: params.length || 500
            });

            return response.choices[0].message.content || '';
        } catch (error) {
            this.logger.error('Error generating content:', error);
            throw new Error('Kon geen content genereren');
        }
    }

    private buildPrompt(params: {
        type: string;
        keywords: string[];
        tone?: string;
        context?: string;
    }): string {
        const basePrompt = `Schrijf ${params.type === 'meta' ? 'een meta beschrijving' : 
            params.type === 'product' ? 'een product beschrijving' :
            params.type === 'alt-text' ? 'alt-text voor een afbeelding' : 
            'een blog post'} `;
        
        const keywordPrompt = `die de volgende keywords natuurlijk gebruikt: ${params.keywords.join(', ')}`;
        const tonePrompt = params.tone ? `in een ${params.tone} toon` : '';
        const contextPrompt = params.context ? `\nContext: ${params.context}` : '';

        return `${basePrompt} ${keywordPrompt} ${tonePrompt}${contextPrompt}`;
    }

    async optimizeContent(content: string, keywords: string[]): Promise<string> {
        try {
            const response = await this.openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "Je bent een expert SEO editor die content optimaliseert voor zoekmachines zonder de leesbaarheid te verminderen."
                    },
                    {
                        role: "user",
                        content: `Optimaliseer de volgende content voor deze keywords: ${keywords.join(', ')}\n\nContent: ${content}`
                    }
                ],
                temperature: 0.3
            });

            return response.choices[0].message.content || content;
        } catch (error) {
            this.logger.error('Error optimizing content:', error);
            throw new Error('Kon content niet optimaliseren');
        }
    }
}
