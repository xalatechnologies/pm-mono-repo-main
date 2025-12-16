/**
 * News Fetching Job
 * Scheduled job that fetches, summarizes, and publishes mining/geology news
 * 
 * Sources:
 * - NewsAPI (requires API key)
 * - Multiple RSS feeds (no API key needed)
 */

import { 
  fetchFromAllSources,
  filterNewUnifiedArticles, 
  saveAggregatedArticle,
  getAggregationStats,
  getAvailableRSSSources,
  type UnifiedArticle 
} from '../services/news-aggregator.js';
import { summarizeUnifiedArticles } from '../services/groq-summarizer.js';

interface FetchNewsConfig {
  newsApiKey: string;
  groqApiKey: string;
  articlesPerRun: number;
  enabled: boolean;
  rssEnabled: boolean;
  rssCategories: string[];
}

interface FetchNewsResult {
  success: boolean;
  articlesProcessed: number;
  articlesSaved: number;
  sourcesUsed: string[];
  errors: string[];
  duration: number;
}

/**
 * Gets configuration from environment variables
 */
export function getConfig(): FetchNewsConfig {
  const rssCategories = process.env.RSS_CATEGORIES 
    ? process.env.RSS_CATEGORIES.split(',').map(c => c.trim())
    : ['mining', 'geology', 'metals']; // Default categories (all available)

  return {
    newsApiKey: process.env.NEWS_API_KEY || '',
    groqApiKey: process.env.GROQ_API_KEY || '',
    articlesPerRun: parseInt(process.env.NEWS_ARTICLES_PER_DAY || '5', 10),
    enabled: process.env.NEWS_FETCH_ENABLED === 'true',
    rssEnabled: process.env.RSS_FETCH_ENABLED !== 'false', // Enabled by default
    rssCategories,
  };
}

/**
 * Validates configuration
 */
function validateConfig(config: FetchNewsConfig): string[] {
  const errors: string[] = [];

  if (!config.enabled) {
    errors.push('News fetching is disabled (NEWS_FETCH_ENABLED != true)');
  }
  // NewsAPI key is now optional - RSS works without it
  if (!config.newsApiKey && !config.rssEnabled) {
    errors.push('No news sources configured. Set NEWS_API_KEY or enable RSS_FETCH_ENABLED');
  }
  if (!config.groqApiKey) {
    errors.push('GROQ_API_KEY is not configured (required for AI summaries)');
  }
  if (config.articlesPerRun < 1 || config.articlesPerRun > 20) {
    errors.push('NEWS_ARTICLES_PER_DAY must be between 1 and 20');
  }

  return errors;
}

/**
 * Main job function - fetches and processes news articles from all sources
 */
export async function runNewsFetchJob(): Promise<FetchNewsResult> {
  const startTime = Date.now();
  const result: FetchNewsResult = {
    success: false,
    articlesProcessed: 0,
    articlesSaved: 0,
    sourcesUsed: [],
    errors: [],
    duration: 0,
  };

  console.log('[News Job] Starting news fetch job...');

  try {
    // Get and validate configuration
    const config = getConfig();
    const configErrors = validateConfig(config);
    
    if (configErrors.length > 0) {
      result.errors = configErrors;
      console.log('[News Job] Configuration errors:', configErrors);
      return result;
    }

    // Track which sources we're using
    if (config.newsApiKey) {
      result.sourcesUsed.push('NewsAPI');
    }
    if (config.rssEnabled) {
      result.sourcesUsed.push(`RSS (${config.rssCategories.join(', ')})`);
    }
    console.log(`[News Job] Using sources: ${result.sourcesUsed.join(', ')}`);

    // Fetch news from all sources
    console.log(`[News Job] Fetching articles from all sources...`);
    const rawArticles = await fetchFromAllSources({
      newsApiKey: config.newsApiKey || undefined,
      maxNewsAPI: config.articlesPerRun,
      maxRSSPerSource: 3,
      rssCategories: config.rssEnabled ? config.rssCategories : [],
    });
    console.log(`[News Job] Fetched ${rawArticles.length} total articles`);

    if (rawArticles.length === 0) {
      result.errors.push('No articles returned from any source');
      return result;
    }

    // Filter out duplicates
    console.log('[News Job] Filtering duplicates...');
    const newArticles = await filterNewUnifiedArticles(rawArticles);
    console.log(`[News Job] Found ${newArticles.length} new articles after filtering`);

    if (newArticles.length === 0) {
      console.log('[News Job] No new articles to process');
      result.success = true;
      return result;
    }

    // Limit to configured amount
    const articlesToProcess = newArticles.slice(0, config.articlesPerRun);
    result.articlesProcessed = articlesToProcess.length;

    // Summarize articles with AI
    console.log(`[News Job] Summarizing ${articlesToProcess.length} articles with Groq AI...`);
    const summaryResults = await summarizeUnifiedArticles(
      config.groqApiKey,
      articlesToProcess,
      2000 // 2 second delay between API calls
    );

    // Save successful summaries to database
    for (const item of summaryResults) {
      if (item.summary) {
        try {
          await saveAggregatedArticle({
            title: item.summary.title,
            headline: item.summary.headline,
            content: item.summary.content,
            featuredImage: item.original.imageUrl,
            sourceUrl: item.original.url,
            sourceName: item.original.sourceName,
            originalPublishedAt: new Date(item.original.publishedAt),
            tags: item.summary.tags,
          });
          result.articlesSaved++;
          console.log(`[News Job] Saved article: "${item.summary.title}" (from ${item.original.sourceName})`);
        } catch (error) {
          const errorMsg = `Failed to save article "${item.original.title}": ${error}`;
          result.errors.push(errorMsg);
          console.error(`[News Job] ${errorMsg}`);
        }
      } else if (item.error) {
        result.errors.push(`Summarization failed for "${item.original.title}": ${item.error}`);
      }
    }

    result.success = result.articlesSaved > 0 || result.errors.length === 0;

    // Log statistics
    const stats = await getAggregationStats();
    console.log(`[News Job] Database stats: ${stats.totalAggregated} aggregated, ${stats.totalOriginal} original articles`);

  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred';
    result.errors.push(errorMsg);
    console.error('[News Job] Fatal error:', error);
  }

  result.duration = Date.now() - startTime;
  console.log(`[News Job] Completed in ${result.duration}ms. Saved ${result.articlesSaved}/${result.articlesProcessed} articles.`);

  return result;
}

/**
 * Creates a scheduled job runner using setInterval (simple approach)
 * For production, consider using node-cron or a job queue like Bull
 */
export function scheduleNewsJob(intervalHours: number = 24): NodeJS.Timeout {
  const intervalMs = intervalHours * 60 * 60 * 1000;
  
  console.log(`[News Job] Scheduling news fetch job to run every ${intervalHours} hours`);
  
  // Run immediately on startup
  runNewsFetchJob().catch(console.error);
  
  // Then run on schedule
  return setInterval(() => {
    runNewsFetchJob().catch(console.error);
  }, intervalMs);
}

/**
 * Manual trigger endpoint handler
 */
export async function handleManualTrigger(): Promise<FetchNewsResult> {
  console.log('[News Job] Manual trigger initiated');
  return runNewsFetchJob();
}

/**
 * Get list of available RSS sources
 */
export function getRSSSources() {
  return getAvailableRSSSources();
}
