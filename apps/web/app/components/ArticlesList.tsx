"use client";

import { Article } from "@/types/articles";
import ArticleCard from "./ArticleCard";
import { useState, useEffect, useCallback, useRef } from "react";
import { Loader2 } from "lucide-react";

interface ArticlesListProps {
  initialArticles: Article[];
  articlesPerPage?: number;
}

export default function ArticlesList({
  initialArticles,
  articlesPerPage = 6,
}: ArticlesListProps) {
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>(
    initialArticles.slice(0, articlesPerPage)
  );
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(
    initialArticles.length > articlesPerPage
  );
  const loaderRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(initialArticles.length / articlesPerPage);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    // Simulate async loading for smooth UX
    setTimeout(() => {
      const nextPage = page + 1;
      const startIndex = page * articlesPerPage;
      const endIndex = startIndex + articlesPerPage;
      const newArticles = initialArticles.slice(startIndex, endIndex);

      if (newArticles.length > 0) {
        setDisplayedArticles((prev) => [...prev, ...newArticles]);
        setPage(nextPage);
        setHasMore(nextPage < totalPages);
      } else {
        setHasMore(false);
      }

      setIsLoading(false);
    }, 300);
  }, [page, isLoading, hasMore, initialArticles, articlesPerPage, totalPages]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loadMore, hasMore, isLoading]);

  if (displayedArticles.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Articles Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {displayedArticles.map((article, index) => (
          <div
            key={article.id}
            className="animate-fade-in opacity-0"
            style={{
              animationDelay: `${(index % articlesPerPage) * 100}ms`,
            }}
          >
            <ArticleCard article={article} />
          </div>
        ))}
      </div>

      {/* Loading indicator / Load more trigger */}
      <div
        ref={loaderRef}
        className="flex flex-col items-center justify-center py-8"
      >
        {isLoading && (
          <div className="flex items-center gap-3 text-[var(--color-neutral-500)]">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Loading more articles...</span>
          </div>
        )}

        {!hasMore && displayedArticles.length > articlesPerPage && (
          <p className="text-sm text-[var(--color-neutral-400)]">
            You&apos;ve reached the end • {initialArticles.length} articles total
          </p>
        )}
      </div>

      {/* Progress indicator */}
      {hasMore && (
        <div className="flex items-center justify-center gap-4">
          <div className="h-1 w-32 bg-[var(--color-neutral-200)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-earth-copper)] transition-all duration-300"
              style={{
                width: `${(displayedArticles.length / initialArticles.length) * 100}%`,
              }}
            />
          </div>
          <span className="text-xs text-[var(--color-neutral-500)]">
            {displayedArticles.length} of {initialArticles.length}
          </span>
        </div>
      )}
    </div>
  );
}

