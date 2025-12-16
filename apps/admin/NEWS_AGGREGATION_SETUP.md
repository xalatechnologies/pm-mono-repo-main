# News Aggregation System Setup

This document explains how to configure and use the automated news aggregation system for Pure Minerals.

## Overview

The news aggregation system automatically:
1. Fetches mining/geology news from **multiple sources**:
   - NewsAPI.org (optional, requires API key)
   - RSS feeds from major mining/geology websites (no API key needed!)
2. Generates AI summaries using Groq (Llama 3.3)
3. Publishes articles to the website with proper source attribution

## News Sources

### RSS Feeds (Free, No API Key Required)

The system includes built-in RSS feeds from trusted sources (verified working):

| Source | Category | Description |
|--------|----------|-------------|
| Mining.com | mining | Global mining news |
| Mining Technology | mining | Technology & innovation |
| Phys.org Earth Sciences | geology | Scientific discoveries |
| ScienceDaily Earth | geology | Earth & climate research |
| ScienceDaily Geology | geology | Geology-specific news |
| Investing.com Commodities | metals | Commodity market news |
| Investing.com Metals | metals | Metals market updates |
| Google News Mining | mining | Mining industry aggregated |
| Google News Critical Minerals | ree | REE & critical minerals |
| Google News Copper Zinc | metals | Base metals news |

### NewsAPI.org (Optional)

For additional news coverage, you can add a NewsAPI key:
- **Sign up:** https://newsapi.org/register
- **Free tier:** 100 requests/day

### Groq AI (Required for Summaries)
- **Sign up:** https://console.groq.com
- **Free tier:** 30 requests/minute
- **Usage:** Generates professional article summaries

## Environment Variables

Add these to your `.env` file in the `apps/admin` directory:

```bash
# Enable/disable automatic news fetching
NEWS_FETCH_ENABLED=true

# Number of articles to process per day (1-20)
NEWS_ARTICLES_PER_DAY=5

# NewsAPI.org API Key (OPTIONAL - RSS works without this)
NEWS_API_KEY=your-newsapi-key-here

# Groq API Key (REQUIRED for AI summaries)
GROQ_API_KEY=your-groq-api-key-here

# RSS Feed settings (optional)
RSS_FETCH_ENABLED=true
RSS_CATEGORIES=mining,geology,metals,nordic
```

## Configuration Options

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEWS_FETCH_ENABLED` | Yes | `false` | Set to `true` to enable automatic fetching |
| `NEWS_ARTICLES_PER_DAY` | No | `5` | Articles to process per run (1-20) |
| `NEWS_API_KEY` | No | - | NewsAPI.org key (optional) |
| `GROQ_API_KEY` | Yes | - | Groq API key for AI summaries |
| `RSS_FETCH_ENABLED` | No | `true` | Enable/disable RSS feeds |
| `RSS_CATEGORIES` | No | `mining,geology,metals` | RSS categories to fetch |

## How It Works

### Automatic Scheduling
When enabled, the system runs automatically:
- **Frequency:** Every 24 hours
- **Process:** Fetches all sources → Filters duplicates → AI summarizes → Saves to database

### RSS Categories
Available categories for `RSS_CATEGORIES`:
- `mining` - Mining industry news & business
- `geology` - Geological science & earth sciences
- `metals` - Commodity & base metals markets (copper, zinc, etc.)
- `ree` - Rare earth elements & critical minerals

### Article Processing
1. Fetches latest news from all enabled sources
2. Filters for relevant keywords (mining, copper, zinc, geology, etc.)
3. Removes duplicates (by URL)
4. AI generates SEO-optimized summaries
5. Saves with source attribution

## API Endpoints

### Check Status
```
GET /api/news/status
```
Returns configuration, statistics, and available RSS sources.

### Manual Trigger
```
POST /api/news/fetch
```
Manually triggers a news fetch (useful for testing).

### List Sources
```
GET /api/news/sources
```
Returns all available RSS sources grouped by category.

## Example Response

```json
{
  "success": true,
  "data": {
    "enabled": true,
    "articlesPerDay": 5,
    "hasNewsApiKey": true,
    "hasGroqApiKey": true,
    "stats": {
      "totalAggregated": 45,
      "totalOriginal": 12,
      "lastAggregatedAt": "2025-12-16T10:30:00Z"
    }
  }
}
```

## Article Display

Aggregated articles are displayed on the website with:
- "AI Summary" badge indicator
- Source attribution with link to original article
- Auto-generated tags for categorization

## Legal & Ethical Considerations

- All articles include clear source attribution
- Links back to original articles
- Summaries are transformative (not copy-paste)
- "Originally from [Source]" disclaimer shown
- Respects NewsAPI terms of service

## Troubleshooting

### No articles being fetched
1. Check `NEWS_FETCH_ENABLED=true` is set
2. Verify API keys are correct
3. Check server logs for error messages
4. Ensure MongoDB is connected

### Rate limiting errors
- NewsAPI free tier: 100 requests/day
- Groq free tier: 30 requests/minute
- The system includes built-in delays to respect limits

### Duplicate articles
- Articles are deduped by URL
- Each source URL can only be saved once

## Files Structure

```
apps/admin/src/
├── services/
│   ├── news-aggregator.ts   # NewsAPI integration
│   └── groq-summarizer.ts   # AI summarization
├── jobs/
│   └── fetch-news.ts        # Scheduled job
└── routes/
    └── news.ts              # API endpoints
```

## Support

For issues or questions about the news aggregation system, contact the development team at Xala Technologies.

