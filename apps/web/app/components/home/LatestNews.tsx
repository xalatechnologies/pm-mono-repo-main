import { Article } from "@/types/articles";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Pickaxe, Mountain, Gem, Calendar, ExternalLink } from "lucide-react";

interface LatestNewsProps {
  articles: Article[];
}

// Check if article has a valid image
function hasValidImage(article: Article): boolean {
  return !!(article.featuredImage && article.featuredImage.startsWith('http'));
}

// Get category icon based on tags
function getCategoryIcon(tags?: string[]) {
  if (!tags || tags.length === 0) return <Pickaxe size={14} />;
  
  const tagStr = tags.join(' ').toLowerCase();
  if (tagStr.includes('gold') || tagStr.includes('silver') || tagStr.includes('precious')) {
    return <Gem size={14} />;
  }
  if (tagStr.includes('geology') || tagStr.includes('earth') || tagStr.includes('discovery')) {
    return <Mountain size={14} />;
  }
  return <Pickaxe size={14} />;
}

// Get primary category label
function getCategoryLabel(tags?: string[]): string {
  if (!tags || tags.length === 0) return 'Mining';
  
  const tagStr = tags.join(' ').toLowerCase();
  if (tagStr.includes('copper')) return 'Copper';
  if (tagStr.includes('zinc')) return 'Zinc';
  if (tagStr.includes('gold')) return 'Gold';
  if (tagStr.includes('silver')) return 'Silver';
  if (tagStr.includes('lithium')) return 'Lithium';
  if (tagStr.includes('rare earth') || tagStr.includes('ree')) return 'Rare Earth';
  if (tagStr.includes('geology') || tagStr.includes('geological')) return 'Geology';
  if (tagStr.includes('exploration')) return 'Exploration';
  if (tagStr.includes('discovery')) return 'Discovery';
  return 'Mining';
}

export default function LatestNews({ articles }: LatestNewsProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  // Filter: only articles WITH valid images
  const filteredArticles = articles.filter(article => hasValidImage(article));

  // Need at least 2 articles to show the section
  if (filteredArticles.length < 2) {
    return null;
  }

  // Take top 4 articles
  const featuredArticles = filteredArticles.slice(0, 4);
  const [mainArticle, ...sideArticles] = featuredArticles;

  return (
    <section className="py-20 bg-gradient-to-b from-[var(--color-neutral-50)] to-white">
      <div className="site-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-earth-copper)]/10 flex items-center justify-center">
                <Pickaxe size={20} className="text-[var(--color-earth-copper)]" />
              </div>
              <span className="text-sm font-semibold text-[var(--color-earth-copper)] uppercase tracking-wider">
                Mining & Geology News
              </span>
            </div>
            <h2 className="display-3 text-[var(--color-brand-primary)]">
              Latest Industry Insights
            </h2>
            <p className="text-[var(--color-neutral-600)] mt-3 max-w-xl">
              Stay informed with the latest mining discoveries, exploration updates, 
              and critical mineral developments from around the world.
            </p>
          </div>
          <Link
            href="/articles"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-earth-copper)] text-white hover:bg-[var(--color-earth-copper)]/90 transition-all shadow-lg shadow-[var(--color-earth-copper)]/20 font-medium"
          >
            View All News
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* News Grid - Enhanced Layout */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Main Featured Article - Large Card */}
          {mainArticle && (
            <div className="lg:col-span-7">
              <Link
                href={`/articles/${mainArticle.id}`}
                className="group block h-full"
              >
                <article className="relative h-full min-h-[400px] lg:min-h-[500px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <Image
                    src={mainArticle.featuredImage!}
                    alt={mainArticle.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    {/* Category Badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-earth-copper)] text-white text-xs font-semibold">
                        {getCategoryIcon(mainArticle.tags)}
                        {getCategoryLabel(mainArticle.tags)}
                      </span>
                      {mainArticle.sourceName && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white/90 text-xs">
                          <ExternalLink size={10} />
                          {mainArticle.sourceName}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-3 line-clamp-3 group-hover:text-[var(--color-earth-copper-light)] transition-colors">
                      {mainArticle.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/80 text-base md:text-lg line-clamp-2 mb-4 max-w-2xl">
                      {mainArticle.headline}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-white/70 text-sm">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {new Date(mainArticle.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="group-hover:text-white transition-colors">
                        Read full article →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          )}

          {/* Side Articles - Stacked Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {sideArticles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.id}`}
                className="group block flex-1"
              >
                <article className="h-full flex gap-4 p-4 rounded-xl bg-white border border-[var(--color-neutral-200)] hover:border-[var(--color-earth-copper)]/40 hover:shadow-xl transition-all duration-300">
                  {/* Thumbnail */}
                  <div className="relative w-32 h-32 md:w-36 md:h-36 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={article.featuredImage!}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                    {/* Category Badge on Image */}
                    <div className="absolute top-2 left-2">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold">
                        {getCategoryIcon(article.tags)}
                        {getCategoryLabel(article.tags)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                    <div>
                      {/* Source */}
                      {article.sourceName && (
                        <span className="text-xs text-[var(--color-earth-copper)] font-medium mb-1 block">
                          {article.sourceName}
                        </span>
                      )}
                      
                      {/* Title */}
                      <h3 className="font-display font-bold text-[var(--color-brand-primary)] group-hover:text-[var(--color-earth-copper)] transition-colors line-clamp-2 mb-2 text-base">
                        {article.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-[var(--color-neutral-600)] line-clamp-2">
                        {article.headline}
                      </p>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 mt-2 text-xs text-[var(--color-neutral-500)]">
                      <Calendar size={12} />
                      <time dateTime={article.createdAt}>
                        {new Date(article.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                  </div>
                </article>
              </Link>
            ))}

            {/* View All CTA */}
            <Link
              href="/articles"
              className="group flex items-center justify-center gap-3 p-5 rounded-xl bg-[var(--color-brand-primary)] text-white hover:bg-[var(--color-brand-primary)]/90 transition-all"
            >
              <Pickaxe size={20} />
              <span className="font-semibold">Explore All Mining News</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
