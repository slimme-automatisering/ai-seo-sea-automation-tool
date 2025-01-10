import { Logger } from '../utils/Logger';
import axios from 'axios';
import { JSDOM } from 'jsdom';

export class SeoAnalysisService {
    private logger: Logger;

    constructor() {
        this.logger = new Logger('SeoAnalysisService');
    }

    async analyzePage(url: string): Promise<SeoAnalysisResult> {
        try {
            const html = await this.fetchPage(url);
            const dom = new JSDOM(html);
            const document = dom.window.document;

            return {
                meta: this.analyzeMeta(document),
                content: this.analyzeContent(document),
                technical: await this.analyzeTechnical(url, html),
                suggestions: []  // Wordt gevuld na alle analyses
            };
        } catch (error) {
            this.logger.error('Error analyzing page:', error);
            throw new Error('Kon pagina niet analyseren');
        }
    }

    private async fetchPage(url: string): Promise<string> {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            this.logger.error('Error fetching page:', error);
            throw new Error('Kon pagina niet ophalen');
        }
    }

    private analyzeMeta(document: Document): MetaAnalysis {
        const title = document.querySelector('title')?.textContent || '';
        const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
        const keywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content')?.split(',') || [];
        
        return {
            title: {
                content: title,
                length: title.length,
                isOptimal: title.length >= 30 && title.length <= 60
            },
            description: {
                content: description,
                length: description.length,
                isOptimal: description.length >= 120 && description.length <= 155
            },
            keywords: {
                list: keywords,
                count: keywords.length,
                isOptimal: keywords.length > 0 && keywords.length <= 10
            }
        };
    }

    private analyzeContent(document: Document): ContentAnalysis {
        const headings = this.analyzeHeadings(document);
        const images = this.analyzeImages(document);
        const links = this.analyzeLinks(document);
        const text = document.body.textContent || '';

        return {
            headings,
            images,
            links,
            wordCount: text.split(/\s+/).length,
            readability: this.calculateReadability(text)
        };
    }

    private analyzeHeadings(document: Document): HeadingAnalysis {
        const headings = {
            h1: Array.from(document.querySelectorAll('h1')),
            h2: Array.from(document.querySelectorAll('h2')),
            h3: Array.from(document.querySelectorAll('h3'))
        };

        return {
            h1Count: headings.h1.length,
            h2Count: headings.h2.length,
            h3Count: headings.h3.length,
            isOptimal: headings.h1.length === 1 && headings.h2.length > 0
        };
    }

    private analyzeImages(document: Document): ImageAnalysis {
        const images = Array.from(document.querySelectorAll('img'));
        
        return {
            total: images.length,
            withAlt: images.filter(img => img.hasAttribute('alt')).length,
            withoutAlt: images.filter(img => !img.hasAttribute('alt')).length,
            isOptimal: images.every(img => img.hasAttribute('alt'))
        };
    }

    private analyzeLinks(document: Document): LinkAnalysis {
        const links = Array.from(document.querySelectorAll('a'));
        const internal = links.filter(link => {
            try {
                const url = new URL(link.href);
                return url.hostname === document.location.hostname;
            } catch {
                return false;
            }
        });

        return {
            total: links.length,
            internal: internal.length,
            external: links.length - internal.length,
            isOptimal: links.length > 0 && internal.length > 0
        };
    }

    private calculateReadability(text: string): number {
        // Implementeer Flesch-Kincaid readability score
        const sentences = text.split(/[.!?]+/);
        const words = text.split(/\s+/);
        const syllables = this.countSyllables(text);

        if (sentences.length === 0 || words.length === 0) return 0;

        return 206.835 - 1.015 * (words.length / sentences.length) - 84.6 * (syllables / words.length);
    }

    private countSyllables(text: string): number {
        // Vereenvoudigde syllabe telling voor Nederlands
        return text.toLowerCase()
            .replace(/[^a-zèéëêāăąōǒǫǭőœȫṓṑṍṏǿ]/g, '')
            .replace(/[^aeiouyèéëêāăąōǒǫǭőœȫṓṑṍṏǿ]/g, ' ')
            .trim()
            .split(/\s+/)
            .length;
    }

    private async analyzeTechnical(url: string, html: string): Promise<TechnicalAnalysis> {
        return {
            pageSize: html.length,
            loadTime: await this.measureLoadTime(url),
            mobileOptimized: this.checkMobileOptimization(html),
            secureConnection: url.startsWith('https'),
            isOptimal: false  // Wordt bepaald op basis van alle metrics
        };
    }

    private async measureLoadTime(url: string): Promise<number> {
        const start = Date.now();
        try {
            await axios.get(url);
            return Date.now() - start;
        } catch {
            return -1;
        }
    }

    private checkMobileOptimization(html: string): boolean {
        return html.includes('viewport') && 
               html.includes('meta name="viewport"') &&
               html.includes('width=device-width');
    }
}

interface SeoAnalysisResult {
    meta: MetaAnalysis;
    content: ContentAnalysis;
    technical: TechnicalAnalysis;
    suggestions: string[];
}

interface MetaAnalysis {
    title: {
        content: string;
        length: number;
        isOptimal: boolean;
    };
    description: {
        content: string;
        length: number;
        isOptimal: boolean;
    };
    keywords: {
        list: string[];
        count: number;
        isOptimal: boolean;
    };
}

interface ContentAnalysis {
    headings: HeadingAnalysis;
    images: ImageAnalysis;
    links: LinkAnalysis;
    wordCount: number;
    readability: number;
}

interface HeadingAnalysis {
    h1Count: number;
    h2Count: number;
    h3Count: number;
    isOptimal: boolean;
}

interface ImageAnalysis {
    total: number;
    withAlt: number;
    withoutAlt: number;
    isOptimal: boolean;
}

interface LinkAnalysis {
    total: number;
    internal: number;
    external: number;
    isOptimal: boolean;
}

interface TechnicalAnalysis {
    pageSize: number;
    loadTime: number;
    mobileOptimized: boolean;
    secureConnection: boolean;
    isOptimal: boolean;
}
