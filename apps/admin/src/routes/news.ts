/**
 * News Aggregation API Routes
 */

import { Router } from 'express';
import { handleManualTrigger, getConfig, getRSSSources } from '../jobs/fetch-news.js';
import { getAggregationStats } from '../services/news-aggregator.js';

const router = Router();

/**
 * GET /api/news/status
 * Get the current status and statistics of the news aggregation system
 */
router.get('/status', async (_req, res) => {
  try {
    const config = getConfig();
    const stats = await getAggregationStats();
    const rssSources = getRSSSources();

    res.json({
      success: true,
      data: {
        enabled: config.enabled,
        articlesPerDay: config.articlesPerRun,
        hasNewsApiKey: !!config.newsApiKey,
        hasGroqApiKey: !!config.groqApiKey,
        rssEnabled: config.rssEnabled,
        rssCategories: config.rssCategories,
        rssSources: rssSources.map(s => ({ name: s.name, category: s.category })),
        stats: {
          totalAggregated: stats.totalAggregated,
          totalOriginal: stats.totalOriginal,
          lastAggregatedAt: stats.lastAggregatedAt,
        },
      },
    });
  } catch (error) {
    console.error('Error getting news status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get news aggregation status',
    });
  }
});

/**
 * POST /api/news/fetch
 * Manually trigger news fetching (requires authentication in production)
 */
router.post('/fetch', async (_req, res) => {
  try {
    console.log('[News Route] Manual fetch triggered via API');
    
    const result = await handleManualTrigger();

    res.json({
      success: result.success,
      data: {
        articlesProcessed: result.articlesProcessed,
        articlesSaved: result.articlesSaved,
        sourcesUsed: result.sourcesUsed,
        duration: result.duration,
        errors: result.errors,
      },
    });
  } catch (error) {
    console.error('Error triggering news fetch:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to trigger news fetch',
    });
  }
});

/**
 * GET /api/news/sources
 * Get list of available RSS sources
 */
router.get('/sources', (_req, res) => {
  const sources = getRSSSources();
  
  // Group by category
  const byCategory = sources.reduce((acc, source) => {
    if (!acc[source.category]) {
      acc[source.category] = [];
    }
    acc[source.category].push({ name: source.name, url: source.url });
    return acc;
  }, {} as Record<string, Array<{ name: string; url: string }>>);

  res.json({
    success: true,
    data: {
      total: sources.length,
      categories: Object.keys(byCategory),
      sources: byCategory,
    },
  });
});

export default router;

