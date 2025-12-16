import { Article } from "@/types/articles";
import ArticleImage from "@/app/components/ArticleImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, ExternalLink, Sparkles, Clock } from "lucide-react";
import { Metadata } from "next";

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

async function getArticle(id: string): Promise<Article | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) return null;

  try {
    const res = await fetch(`${baseUrl}/articles`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const articles: Article[] = await res.json();
    return articles.find((a) => a.id === id) || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    return {
      title: "Article Not Found | Pure Minerals",
    };
  }

  return {
    title: `${article.title} | Pure Minerals News`,
    description: article.headline,
    keywords: article.tags?.join(", "),
    openGraph: {
      title: article.title,
      description: article.headline,
      type: "article",
      publishedTime: article.createdAt,
      images: article.featuredImage ? [article.featuredImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.headline,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    notFound();
  }

  const isAggregated = article.isAggregated;
  const hasSource = article.sourceUrl && article.sourceName;
  const readingTime = Math.max(
    1,
    Math.ceil(
      article.paragraphs.reduce((acc, p) => acc + p.text.length, 0) / 1000
    )
  );

  return (
    <main className="bg-[var(--background)] min-h-screen">
      {/* Back navigation */}
      <div className="bg-white border-b border-[var(--color-neutral-200)]">
        <div className="site-container py-4">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-neutral-600)] hover:text-[var(--color-earth-copper)] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to News
          </Link>
        </div>
      </div>

      <article className="py-12 md:py-16">
        <div className="site-container">
          <div className="max-w-3xl mx-auto">
            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--color-earth-copper)]/10 text-[var(--color-earth-copper)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[var(--color-brand-primary)] mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Headline */}
            <p className="text-xl text-[var(--color-neutral-600)] mb-8 leading-relaxed">
              {article.headline}
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 pb-8 mb-8 border-b border-[var(--color-neutral-200)]">
              <div className="flex items-center gap-2 text-sm text-[var(--color-neutral-500)]">
                <Calendar size={16} />
                <time dateTime={article.createdAt}>
                  {new Date(article.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>

              <div className="flex items-center gap-2 text-sm text-[var(--color-neutral-500)]">
                <Clock size={16} />
                <span>{readingTime} min read</span>
              </div>

              {isAggregated && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-earth-patina)]/10 text-[var(--color-earth-patina)] text-sm">
                  <Sparkles size={14} />
                  AI Summary
                </span>
              )}
            </div>

            {/* Featured Image - Always show with placeholder fallback */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-10 shadow-lg">
              <ArticleImage
                src={article.featuredImage}
                alt={article.title}
                priority
                aspectRatio="video"
              />
            </div>

            {/* Source attribution for aggregated articles */}
            {hasSource && (
              <div className="mb-8 p-4 rounded-xl bg-[var(--color-neutral-50)] border border-[var(--color-neutral-200)]">
                <p className="text-sm text-[var(--color-neutral-600)] mb-2">
                  This article is an AI-generated summary of content originally published by:
                </p>
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--color-earth-copper)] hover:underline font-medium"
                >
                  <ExternalLink size={16} />
                  {article.sourceName}
                </a>
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {article.paragraphs.map((paragraph, index) => (
                <section key={index} className="mb-8">
                  {paragraph.subtitle && (
                    <h2 className="text-2xl font-display font-bold text-[var(--color-brand-primary)] mb-4">
                      {paragraph.subtitle}
                    </h2>
                  )}
                  <p className="text-[var(--color-neutral-700)] leading-relaxed whitespace-pre-line">
                    {paragraph.text}
                  </p>
                  {paragraph.image && (
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden mt-6 shadow-md">
                      <ArticleImage
                        src={paragraph.image}
                        alt={paragraph.subtitle || `Image ${index + 1}`}
                        aspectRatio="video"
                      />
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Original source link at bottom */}
            {hasSource && (
              <div className="mt-12 pt-8 border-t border-[var(--color-neutral-200)]">
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-earth-copper)] text-white hover:bg-[var(--color-earth-copper)]/90 transition-colors"
                >
                  <ExternalLink size={18} />
                  Read Original Article at {article.sourceName}
                </a>
              </div>
            )}

            {/* Back to news */}
            <div className="mt-12 pt-8 border-t border-[var(--color-neutral-200)]">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 text-[var(--color-earth-copper)] hover:underline font-medium"
              >
                <ArrowLeft size={18} />
                Back to all news
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

