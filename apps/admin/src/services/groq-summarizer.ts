/**
 * Groq AI Summarization Service
 * Uses Groq's free API with Llama 3.3 to generate article summaries
 */

import type { NewsAPIArticle, UnifiedArticle } from './news-aggregator.js';

interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface GroqChoice {
  index: number;
  message: {
    role: string;
    content: string;
  };
  finish_reason: string;
}

interface GroqResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: GroqChoice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface SummarizedArticle {
  title: string;
  headline: string;
  content: string;
  tags: string[];
}

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile';

/**
 * Creates the system prompt for article summarization
 */
function getSystemPrompt(): string {
  return `You are a professional mining and geology news editor for Pure Minerals, a Norwegian mineral exploration company focused on copper and zinc in Trøndelag, Norway. Your task is to create engaging, informative summaries of mining and geology news articles.

Guidelines:
- Write in a professional, objective tone
- Focus on facts and data
- Highlight relevance to the mining/exploration industry
- Keep summaries informative but concise (150-250 words)
- Generate SEO-friendly titles with relevant keywords
- Create engaging headlines that capture the key point
- Extract relevant tags for categorization and SEO

Always respond in valid JSON format with these fields:
- title: SEO-optimized article title (max 70 characters)
- headline: Engaging summary headline (max 150 characters)  
- content: Well-written summary (150-250 words)
- tags: Array of 3-5 relevant tags (lowercase, use hyphens for multi-word)

IMPORTANT: Choose tags from these SEO-relevant categories:
- Base metals: copper, zinc, nickel, cobalt, lead
- Precious metals: gold, silver, platinum, palladium
- Critical minerals: rare-earth, lithium, graphite, manganese, battery-metals
- Activities: exploration, drilling, mining, feasibility-study, resource-estimate
- Regions: norway, scandinavia, nordic, europe, trøndelag
- General: geology, mineral-discovery, mining-industry, critical-minerals

Example tags: ["copper", "exploration", "norway", "zinc", "critical-minerals"]`;
}

/**
 * Creates the user prompt for a NewsAPI article
 */
function getUserPrompt(article: NewsAPIArticle): string {
  return `Please summarize this mining/geology news article:

Title: ${article.title}
Source: ${article.source.name}
Published: ${article.publishedAt}

Description: ${article.description || 'No description available'}

Full content preview: ${article.content || article.description || 'No content available'}

Create an engaging summary that would interest investors and industry professionals interested in mineral exploration. Include the source attribution in a natural way.

Respond with valid JSON only.`;
}

/**
 * Creates the user prompt for a unified article (works with any source)
 */
function getUnifiedUserPrompt(article: UnifiedArticle): string {
  return `Please summarize this mining/geology news article:

Title: ${article.title}
Source: ${article.sourceName}
Published: ${article.publishedAt}

Description: ${article.description || 'No description available'}

Full content preview: ${article.content || article.description || 'No content available'}

Create an engaging summary that would interest investors and industry professionals interested in mineral exploration. Include the source attribution in a natural way.

Respond with valid JSON only.`;
}

/**
 * Calls Groq API to generate a summary
 */
async function callGroqAPI(
  apiKey: string,
  messages: GroqMessage[]
): Promise<string> {
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 1024,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Groq API request failed: ${response.status} - ${error}`);
  }

  const data: GroqResponse = await response.json();
  
  if (!data.choices || data.choices.length === 0) {
    throw new Error('Groq API returned no choices');
  }

  return data.choices[0].message.content;
}

/**
 * Parses the JSON response from Groq
 */
function parseGroqResponse(content: string): SummarizedArticle {
  try {
    const parsed = JSON.parse(content);
    
    // Validate required fields
    if (!parsed.title || !parsed.headline || !parsed.content) {
      throw new Error('Missing required fields in response');
    }

    return {
      title: String(parsed.title).slice(0, 200),
      headline: String(parsed.headline).slice(0, 300),
      content: String(parsed.content),
      tags: Array.isArray(parsed.tags) 
        ? parsed.tags.map((t: unknown) => String(t).toLowerCase().slice(0, 50))
        : [],
    };
  } catch (error) {
    throw new Error(`Failed to parse Groq response: ${error}`);
  }
}

/**
 * Summarizes a news article using Groq AI
 */
export async function summarizeArticle(
  apiKey: string,
  article: NewsAPIArticle
): Promise<SummarizedArticle> {
  if (!apiKey) {
    throw new Error('Groq API key is required');
  }

  const messages: GroqMessage[] = [
    { role: 'system', content: getSystemPrompt() },
    { role: 'user', content: getUserPrompt(article) },
  ];

  const responseContent = await callGroqAPI(apiKey, messages);
  return parseGroqResponse(responseContent);
}

/**
 * Summarizes multiple articles with rate limiting
 */
export async function summarizeArticles(
  apiKey: string,
  articles: NewsAPIArticle[],
  delayMs: number = 2000 // 2 second delay between requests to respect rate limits
): Promise<Array<{ original: NewsAPIArticle; summary: SummarizedArticle | null; error?: string }>> {
  const results: Array<{ original: NewsAPIArticle; summary: SummarizedArticle | null; error?: string }> = [];

  for (const article of articles) {
    try {
      const summary = await summarizeArticle(apiKey, article);
      results.push({ original: article, summary });
    } catch (error) {
      console.error(`Failed to summarize article "${article.title}":`, error);
      results.push({ 
        original: article, 
        summary: null, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }

    // Rate limiting delay
    if (articles.indexOf(article) < articles.length - 1) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  return results;
}

/**
 * Summarizes a unified article using Groq AI
 */
export async function summarizeUnifiedArticle(
  apiKey: string,
  article: UnifiedArticle
): Promise<SummarizedArticle> {
  if (!apiKey) {
    throw new Error('Groq API key is required');
  }

  const messages: GroqMessage[] = [
    { role: 'system', content: getSystemPrompt() },
    { role: 'user', content: getUnifiedUserPrompt(article) },
  ];

  const responseContent = await callGroqAPI(apiKey, messages);
  return parseGroqResponse(responseContent);
}

/**
 * Summarizes multiple unified articles with rate limiting
 */
export async function summarizeUnifiedArticles(
  apiKey: string,
  articles: UnifiedArticle[],
  delayMs: number = 2000
): Promise<Array<{ original: UnifiedArticle; summary: SummarizedArticle | null; error?: string }>> {
  const results: Array<{ original: UnifiedArticle; summary: SummarizedArticle | null; error?: string }> = [];

  for (const article of articles) {
    try {
      const summary = await summarizeUnifiedArticle(apiKey, article);
      results.push({ original: article, summary });
    } catch (error) {
      console.error(`Failed to summarize article "${article.title}":`, error);
      results.push({ 
        original: article, 
        summary: null, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }

    // Rate limiting delay
    if (articles.indexOf(article) < articles.length - 1) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  return results;
}

export type { SummarizedArticle };

