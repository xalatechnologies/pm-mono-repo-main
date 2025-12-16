// components/ArticleCard.tsx
import { Article } from "@/types/articles";
import ArticleImage from "./ArticleImage";
import Link from "next/link";
import React from "react";
import { ExternalLink, Sparkles } from "lucide-react";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const isAggregated = article.isAggregated;
  const hasSource = article.sourceUrl && article.sourceName;

  return (
    <article className="group rounded-2xl bg-white border border-[var(--color-neutral-200)] overflow-hidden hover:border-[var(--color-earth-copper)]/40 hover:shadow-xl transition-all duration-300">
      {/* Featured Image - Always show (with placeholder fallback) */}
      <Link href={`/articles/${article.id}`} className="block relative">
        <div className="relative h-48 w-full overflow-hidden">
          <ArticleImage
            src={article.featuredImage}
            alt={article.title}
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            aspectRatio="card"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium rounded-full bg-[var(--color-earth-copper)]/10 text-[var(--color-earth-copper)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <Link href={`/articles/${article.id}`}>
          <h2 className="text-xl font-display font-bold text-[var(--color-brand-primary)] mb-2 group-hover:text-[var(--color-earth-copper)] transition-colors line-clamp-2">
            {article.title}
          </h2>
        </Link>

        {/* Headline/Description */}
        <p className="text-[var(--color-neutral-600)] text-sm leading-relaxed mb-4 line-clamp-3">
          {article.headline}
        </p>

        {/* Meta information */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--color-neutral-200)]">
          <div className="flex items-center gap-2 text-xs text-[var(--color-neutral-500)]">
            <time dateTime={article.createdAt}>
              {new Date(article.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
            
            {/* AI Generated indicator */}
            {isAggregated && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-earth-patina)]/10 text-[var(--color-earth-patina)]">
                <Sparkles size={12} />
                <span>AI Summary</span>
              </span>
            )}
          </div>

          {/* Read more link */}
          <Link
            href={`/articles/${article.id}`}
            className="text-xs font-semibold text-[var(--color-earth-copper)] hover:underline"
          >
            Read more →
          </Link>
        </div>

        {/* Source attribution for aggregated articles */}
        {hasSource && (
          <div className="mt-3 pt-3 border-t border-[var(--color-neutral-200)]">
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-[var(--color-neutral-500)] hover:text-[var(--color-earth-copper)] transition-colors"
            >
              <ExternalLink size={12} />
              <span>
                Originally from <span className="font-medium">{article.sourceName}</span>
              </span>
            </a>
          </div>
        )}
      </div>
    </article>
  );
};

export default ArticleCard;
