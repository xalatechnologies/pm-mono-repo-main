/**
 * News Aggregator Service
 * Fetches mining/geology news from multiple sources and processes them for publication
 * 
 * Supported Sources:
 * - NewsAPI (requires API key)
 * - RSS Feeds from mining/geology websites (no API key needed)
 */

import Article from '../db/models/Article.js';
import { RSSFetcher, RSSArticle, RSS_SOURCES } from './rss-fetcher.js';

// Unified article format for all sources
export interface UnifiedArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  imageUrl?: string;
  publishedAt: string;
  sourceName: string;
  sourceType: 'newsapi' | 'rss';
}

// NewsAPI response types
interface NewsAPIArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsAPIArticle[];
}

// Mining/geology related keywords for NewsAPI search (rotated randomly)
const SEARCH_KEYWORDS = [
  // General mining
  'mining industry news',
  'mineral exploration',
  'geological survey',
  'mineral discovery',
  
  // Base metals (PM focus)
  'copper mining',
  'zinc mining news',
  'lead zinc deposit',
  'nickel mining',
  'cobalt mining',
  
  // Precious metals
  'gold mining news',
  'silver mining',
  'platinum group metals',
  
  // Critical minerals & REE
  'critical minerals',
  'rare earth elements',
  'REE mining',
  'lithium mining',
  'battery metals',
  'graphite mining',
  
  // Geographic focus
  'Norway mining',
  'Scandinavia mining',
  'Europe critical minerals',
  'Nordic mining',
  
  // Industry terms
  'mineral resources estimate',
  'mining feasibility',
  'exploration drilling',
];

/**
 * Fetches news articles from NewsAPI
 */
export async function fetchNewsFromAPI(
  apiKey: string,
  maxArticles: number = 10
): Promise<NewsAPIArticle[]> {
  if (!apiKey) {
    throw new Error('NewsAPI key is required');
  }

  // Rotate through keywords to get diverse results
  const keyword = SEARCH_KEYWORDS[Math.floor(Math.random() * SEARCH_KEYWORDS.length)];
  
  const params = new URLSearchParams({
    q: keyword,
    language: 'en',
    sortBy: 'publishedAt',
    pageSize: String(maxArticles * 2), // Fetch extra to account for filtering
  });

  const response = await fetch(
    `https://newsapi.org/v2/everything?${params}`,
    {
      headers: {
        'X-Api-Key': apiKey,
      },
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`NewsAPI request failed: ${response.status} - ${error}`);
  }

  const data: NewsAPIResponse = await response.json();

  if (data.status !== 'ok') {
    throw new Error(`NewsAPI returned error status: ${data.status}`);
  }

  // Filter out articles without essential content
  const validArticles = data.articles.filter(
    (article) =>
      article.title &&
      article.description &&
      article.url &&
      !article.title.includes('[Removed]') &&
      article.description.length > 50
  );

  return validArticles.slice(0, maxArticles);
}

/**
 * Checks if an article already exists in the database
 */
export async function articleExists(sourceUrl: string): Promise<boolean> {
  const existing = await Article.findOne({ sourceUrl });
  return !!existing;
}

/**
 * Filters out articles that already exist in the database
 */
export async function filterNewArticles(
  articles: NewsAPIArticle[]
): Promise<NewsAPIArticle[]> {
  const newArticles: NewsAPIArticle[] = [];

  for (const article of articles) {
    const exists = await articleExists(article.url);
    if (!exists) {
      newArticles.push(article);
    }
  }

  return newArticles;
}

/**
 * Saves a processed article to the database
 */
export async function saveAggregatedArticle(data: {
  title: string;
  headline: string;
  content: string;
  featuredImage?: string;
  sourceUrl: string;
  sourceName: string;
  originalPublishedAt: Date;
  tags?: string[];
}): Promise<typeof Article.prototype> {
  const article = new Article({
    title: data.title,
    headline: data.headline,
    featuredImage: data.featuredImage,
    paragraphs: [
      {
        text: data.content,
      },
    ],
    // Aggregation-specific fields
    sourceUrl: data.sourceUrl,
    sourceName: data.sourceName,
    isAggregated: true,
    originalPublishedAt: data.originalPublishedAt,
    aiGenerated: true,
    tags: data.tags || [],
  });

  await article.save();
  return article;
}

/**
 * Get statistics about aggregated articles
 */
export async function getAggregationStats(): Promise<{
  totalAggregated: number;
  totalOriginal: number;
  lastAggregatedAt: Date | null;
}> {
  const totalAggregated = await Article.countDocuments({ isAggregated: true });
  const totalOriginal = await Article.countDocuments({ isAggregated: { $ne: true } });
  
  const lastAggregated = await Article.findOne({ isAggregated: true })
    .sort({ createdAt: -1 })
    .select('createdAt');

  return {
    totalAggregated,
    totalOriginal,
    lastAggregatedAt: lastAggregated?.createdAt || null,
  };
}

/**
 * Convert NewsAPI article to unified format
 */
function newsAPIToUnified(article: NewsAPIArticle): UnifiedArticle {
  return {
    title: article.title,
    description: article.description || '',
    content: article.content || article.description || '',
    url: article.url,
    imageUrl: article.urlToImage || undefined,
    publishedAt: article.publishedAt,
    sourceName: article.source.name,
    sourceType: 'newsapi',
  };
}

/**
 * Convert RSS article to unified format
 */
function rssToUnified(article: RSSArticle): UnifiedArticle {
  return {
    title: article.title,
    description: article.description,
    content: article.content || article.description,
    url: article.link,
    imageUrl: article.imageUrl,
    publishedAt: article.pubDate,
    sourceName: article.sourceName,
    sourceType: 'rss',
  };
}

/**
 * Fetch articles from RSS feeds
 */
export async function fetchNewsFromRSS(
  maxPerSource: number = 3,
  categories?: string[]
): Promise<UnifiedArticle[]> {
  try {
    const fetcher = new RSSFetcher(categories);
    const rssArticles = await fetcher.fetchAll(maxPerSource);
    return rssArticles.map(rssToUnified);
  } catch (error) {
    console.error('[RSS] Error fetching RSS feeds:', error);
    return [];
  }
}

/**
 * Fetch articles from NewsAPI (if key available)
 */
export async function fetchNewsFromNewsAPI(
  apiKey: string,
  maxArticles: number = 10
): Promise<UnifiedArticle[]> {
  try {
    const articles = await fetchNewsFromAPI(apiKey, maxArticles);
    return articles.map(newsAPIToUnified);
  } catch (error) {
    console.error('[NewsAPI] Error fetching:', error);
    return [];
  }
}

/**
 * Fetch from all available sources
 */
export async function fetchFromAllSources(options: {
  newsApiKey?: string;
  maxNewsAPI?: number;
  maxRSSPerSource?: number;
  rssCategories?: string[];
}): Promise<UnifiedArticle[]> {
  const results: UnifiedArticle[] = [];

  // Fetch from NewsAPI if key provided
  if (options.newsApiKey) {
    console.log('[Aggregator] Fetching from NewsAPI...');
    const newsAPIArticles = await fetchNewsFromNewsAPI(
      options.newsApiKey,
      options.maxNewsAPI || 5
    );
    results.push(...newsAPIArticles);
    console.log(`[Aggregator] Got ${newsAPIArticles.length} from NewsAPI`);
  }

  // Fetch from RSS feeds (always available)
  console.log('[Aggregator] Fetching from RSS feeds...');
  const rssArticles = await fetchNewsFromRSS(
    options.maxRSSPerSource || 3,
    options.rssCategories
  );
  results.push(...rssArticles);
  console.log(`[Aggregator] Got ${rssArticles.length} from RSS feeds`);

  // Sort by date (newest first)
  results.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return results;
}

/**
 * Filter out articles that already exist (unified version)
 */
export async function filterNewUnifiedArticles(
  articles: UnifiedArticle[]
): Promise<UnifiedArticle[]> {
  const newArticles: UnifiedArticle[] = [];

  for (const article of articles) {
    const exists = await articleExists(article.url);
    if (!exists) {
      newArticles.push(article);
    }
  }

  return newArticles;
}

/**
 * Get available RSS sources
 */
export function getAvailableRSSSources() {
  return RSS_SOURCES;
}

export type { NewsAPIArticle, RSSArticle };

