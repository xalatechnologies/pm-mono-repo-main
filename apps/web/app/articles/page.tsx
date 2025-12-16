import React from "react";
import ArticleFilters from "../components/ArticleFilters";
import { Article } from "@/types/articles";
import Button from "../components/ui/Button";
import { Newspaper, Clock, Mail, ArrowRight, Pickaxe } from "lucide-react";
import Link from "next/link";

// Merk: ikke bruk betinget export her – det er ikke støttet av Next.js
// Siden blir behandlet som SSG (statisk) automatisk uten dynamic-export

function EmptyState() {
  return (
    <main className="bg-[var(--background)]">
      <section className="py-16 md:py-20">
        <div className="site-container">
          <div className="max-w-3xl mx-auto">
            <span className="section-badge section-badge--filled mb-6">Resources</span>
            <h1 className="display-2 text-on-light mb-4">News & Insights</h1>
            <p className="lead text-[var(--color-neutral-600)] mb-8">
              Industry news, mineral exploration updates, and insights from the mining sector.
            </p>

            {/* Coming Soon Notice */}
            <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[var(--color-neutral-50)] to-white border-2 border-[var(--color-earth-copper)]/20 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--color-earth-copper)]/10 flex items-center justify-center">
                  <Clock size={24} className="text-[var(--color-earth-copper)]" />
                </div>
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-earth-copper)]/10 border border-[var(--color-earth-copper)]/20 mb-4">
                    <span className="text-xs font-semibold text-[var(--color-earth-copper)] uppercase tracking-wider">
                      Coming Soon
                    </span>
                  </div>
                  <h2 className="text-2xl font-display font-bold text-[var(--color-brand-primary)] mb-3">
                    News Section Coming Soon
                  </h2>
                  <p className="text-[var(--color-neutral-700)] mb-4 leading-relaxed">
                    We are setting up our news section featuring curated industry news about mining, 
                    mineral exploration, and geological discoveries—plus updates directly from Pure Minerals 
                    about our projects and company developments.
                  </p>
                  <p className="text-[var(--color-neutral-600)] text-sm mb-6">
                    In the meantime, explore our projects or request access to the Virtual Data Room 
                    for detailed technical information.
                  </p>
                </div>
              </div>
            </div>

            {/* What Will Be Available */}
            <div className="mt-8 p-8 rounded-2xl bg-white border border-[var(--color-neutral-200)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-earth-copper)]/10 flex items-center justify-center">
                  <Newspaper size={20} className="text-[var(--color-earth-copper)]" />
                </div>
                <h2 className="text-xl font-semibold text-[var(--color-brand-primary)]">
                  What to Expect
                </h2>
              </div>
              <ul className="space-y-3 text-[var(--color-neutral-700)]">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-earth-copper)] mt-1">•</span>
                  <span><strong>Industry News:</strong> Mining and mineral exploration headlines</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-earth-copper)] mt-1">•</span>
                  <span><strong>Geological Insights:</strong> Critical minerals and discoveries</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-earth-copper)] mt-1">•</span>
                  <span><strong>Pure Minerals Updates:</strong> Our project progress and milestones</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-earth-copper)] mt-1">•</span>
                  <span><strong>Company News:</strong> Announcements and developments</span>
                </li>
              </ul>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Button href="/contact" variant="primary" size="md" icon={<Mail size={18} />}>
                Contact Us
              </Button>
              <Button href="/vdr" variant="outline" size="md" icon={<ArrowRight size={18} />}>
                Request VDR Access
              </Button>
              <Link
                href="/report-archive"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-[var(--color-neutral-300)] text-[var(--color-brand-primary)] hover:bg-[var(--color-neutral-50)] transition-colors"
              >
                Report Archive
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default async function ArticlesPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  // If no API URL configured, show empty state
  if (!baseUrl) {
    console.error("Missing NEXT_PUBLIC_API_URL environment variable");
    return <EmptyState />;
  }

  const articlesUrl = baseUrl + "/articles";

  try {
    const res = await fetch(articlesUrl, {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      console.error(`Failed to fetch articles: ${res.status}`);
      return <EmptyState />;
    }

    const data = await res.json();
    const articles: Article[] = data || [];

    // If no articles, show empty state
    if (!articles || articles.length === 0) {
      return <EmptyState />;
    }

    // Sort articles by date (newest first)
    const sortedArticles = [...articles].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Show articles if available
    return (
      <main className="bg-[var(--background)]">
        {/* Hero Header with Background Image */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/mine1.png')" }}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-primary)]/95 via-[var(--color-brand-primary)]/90 to-[var(--color-brand-primary)]/80" />
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hero-grid)" />
            </svg>
          </div>
          
          {/* Content */}
          <div className="site-container relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-earth-copper)] flex items-center justify-center shadow-lg">
                  <Pickaxe size={28} className="text-white" />
                </div>
                <div>
                  <span className="text-sm font-bold text-[var(--color-earth-copper)] uppercase tracking-wider">
                    Mining & Geology
                  </span>
                  <p className="text-white/60 text-sm">Industry News Hub</p>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
               <span className="text-white">News & Insights</span>
              </h1>
              <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
                Stay current with the latest developments in mining, mineral exploration, 
                geology, and critical minerals from around the world.
              </p>
              {/* Stats */}
              <div className="flex items-center gap-6 mt-8 pt-8 border-t border-white/20">
                <div>
                  <p className="text-3xl font-bold text-[var(--color-earth-copper)]">{articles.length}</p>
                  <p className="text-sm text-white/70">Articles</p>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div>
                  <p className="text-3xl font-bold text-[var(--color-earth-copper)]">10+</p>
                  <p className="text-sm text-white/70">Sources</p>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div>
                  <p className="text-3xl font-bold text-[var(--color-earth-copper)]">Daily</p>
                  <p className="text-sm text-white/70">Updates</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Articles with Filters */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-[var(--color-neutral-100)] to-[var(--background)]">
          <div className="site-container">
            <ArticleFilters articles={sortedArticles} />
          </div>
        </section>
      </main>
    );
  } catch (err) {
    console.error("Error in ArticlesPage:", err);
    return <EmptyState />;
  }
}
