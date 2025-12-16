/**
 * RSS Feed Fetcher for Mining & Geology News
 * 
 * Fetches news from various RSS feeds related to mining, minerals, and geology.
 * RSS feeds are designed for syndication, making them legal to aggregate.
 */

import Parser from 'rss-parser';

export interface RSSArticle {
  title: string;
  description: string;
  content: string;
  link: string;
  pubDate: string;
  source: string;
  sourceName: string;
  imageUrl?: string;
  categories?: string[];
}

// Mining and geology RSS feed sources (verified working Dec 2025)
export const RSS_SOURCES = [
  // Major Mining News (VERIFIED WORKING)
  {
    name: 'Mining.com',
    url: 'https://www.mining.com/feed/',
    category: 'mining',
  },
  {
    name: 'Mining Technology',
    url: 'https://www.mining-technology.com/feed/',
    category: 'mining',
  },
  // Geology & Earth Science (VERIFIED WORKING)
  {
    name: 'Phys.org Earth Sciences',
    url: 'https://phys.org/rss-feed/earth-news/',
    category: 'geology',
  },
  {
    name: 'ScienceDaily Earth',
    url: 'https://www.sciencedaily.com/rss/earth_climate.xml',
    category: 'geology',
  },
  {
    name: 'ScienceDaily Geology',
    url: 'https://www.sciencedaily.com/rss/earth_climate/geology.xml',
    category: 'geology',
  },
  // Metals & Commodities (VERIFIED WORKING)
  {
    name: 'Investing.com Commodities',
    url: 'https://www.investing.com/rss/news_14.rss',
    category: 'metals',
  },
  {
    name: 'Investing.com Metals',
    url: 'https://www.investing.com/rss/news_95.rss',
    category: 'metals',
  },
  // Business/Finance News with Mining Focus
  {
    name: 'Google News Mining',
    url: 'https://news.google.com/rss/search?q=mining+industry&hl=en-US&gl=US&ceid=US:en',
    category: 'mining',
  },
  {
    name: 'Google News Critical Minerals',
    url: 'https://news.google.com/rss/search?q=critical+minerals+rare+earth&hl=en-US&gl=US&ceid=US:en',
    category: 'ree',
  },
  {
    name: 'Google News Copper Zinc',
    url: 'https://news.google.com/rss/search?q=copper+zinc+mining&hl=en-US&gl=US&ceid=US:en',
    category: 'metals',
  },
];

// Keywords to filter relevant articles
const RELEVANT_KEYWORDS = [
  // General mining terms
  'mining', 'mineral', 'exploration', 'drill', 'geology', 'geological',
  'ore', 'deposit', 'reserve', 'resource', 'prospect',
  'underground', 'open pit', 'tailings', 'smelter', 'refinery', 'concentrate',
  
  // Base metals (PM focus)
  'copper', 'zinc', 'lead', 'nickel', 'cobalt',
  
  // Precious metals
  'gold', 'silver', 'platinum', 'palladium',
  
  // Critical minerals & REE
  'rare earth', 'REE', 'lithium', 'graphite', 'manganese',
  'critical mineral', 'battery metal', 'strategic mineral',
  'neodymium', 'dysprosium', 'scandium', 'yttrium',
  
  // Geographic focus
  'norway', 'scandinavia', 'nordic', 'trøndelag', 'sweden', 'finland',
  'europe mining', 'european mineral',
  
  // Industry terms
  'mineral rights', 'mining license', 'feasibility study',
  'resource estimate', 'NI 43-101', 'JORC',
];

export class RSSFetcher {
  private parser: Parser;
  private enabledSources: typeof RSS_SOURCES;

  constructor(enabledCategories?: string[]) {
    this.parser = new Parser({
      timeout: 10000,
      customFields: {
        item: [
          ['media:content', 'media'],
          ['enclosure', 'enclosure'],
          ['content:encoded', 'contentEncoded'],
        ],
      },
    });

    // Filter sources by category if specified
    if (enabledCategories && enabledCategories.length > 0) {
      this.enabledSources = RSS_SOURCES.filter(s => 
        enabledCategories.includes(s.category)
      );
    } else {
      this.enabledSources = RSS_SOURCES;
    }
  }

  /**
   * Fetch articles from a single RSS feed
   */
  private async fetchFeed(source: typeof RSS_SOURCES[0]): Promise<RSSArticle[]> {
    try {
      console.log(`[RSS] Fetching from ${source.name}...`);
      const feed = await this.parser.parseURL(source.url);
      
      const articles: RSSArticle[] = (feed.items || []).map(item => {
        // Try to extract image from various possible locations
        let imageUrl: string | undefined;
        
        // Check media:content
        if ((item as Record<string, unknown>).media) {
          const media = (item as Record<string, { $?: { url?: string } }>).media;
          imageUrl = media?.$?.url;
        }
        
        // Check enclosure
        if (!imageUrl && item.enclosure?.url) {
          imageUrl = item.enclosure.url;
        }
        
        // Try to extract from content
        if (!imageUrl && item.content) {
          const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
          if (imgMatch) imageUrl = imgMatch[1];
        }

        return {
          title: item.title || 'Untitled',
          description: item.contentSnippet || item.content || '',
          content: (item as Record<string, string>).contentEncoded || item.content || item.contentSnippet || '',
          link: item.link || '',
          pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
          source: source.url,
          sourceName: source.name,
          imageUrl,
          categories: item.categories || [],
        };
      });

      console.log(`[RSS] Got ${articles.length} articles from ${source.name}`);
      return articles;
    } catch (error) {
      console.error(`[RSS] Failed to fetch from ${source.name}:`, error);
      return [];
    }
  }

  /**
   * Check if article is relevant based on keywords
   */
  private isRelevant(article: RSSArticle): boolean {
    const text = `${article.title} ${article.description}`.toLowerCase();
    return RELEVANT_KEYWORDS.some(keyword => text.includes(keyword.toLowerCase()));
  }

  /**
   * Fetch articles from all enabled RSS sources
   */
  async fetchAll(maxPerSource: number = 5): Promise<RSSArticle[]> {
    console.log(`[RSS] Fetching from ${this.enabledSources.length} sources...`);
    
    // Fetch from all sources in parallel
    const results = await Promise.allSettled(
      this.enabledSources.map(source => this.fetchFeed(source))
    );

    // Collect all articles
    const allArticles: RSSArticle[] = [];
    
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        // Filter for relevance and limit per source
        const relevant = result.value
          .filter(article => this.isRelevant(article))
          .slice(0, maxPerSource);
        allArticles.push(...relevant);
      } else {
        console.error(`[RSS] Failed source ${this.enabledSources[index].name}:`, result.reason);
      }
    });

    // Sort by date (newest first)
    allArticles.sort((a, b) => 
      new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );

    console.log(`[RSS] Total relevant articles: ${allArticles.length}`);
    return allArticles;
  }

  /**
   * Get list of available sources
   */
  static getSources() {
    return RSS_SOURCES;
  }
}

export default RSSFetcher;

