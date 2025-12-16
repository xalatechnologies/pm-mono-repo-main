import React from "react";
import ArticleCard from "../components/ArticleCard";
import { Article } from "@/types/articles";
import Button from "../components/ui/Button";
import { Newspaper, Clock, Mail, ArrowRight } from "lucide-react";
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
            <h1 className="display-2 text-on-light mb-4">News & Updates</h1>
            <p className="lead text-[var(--color-neutral-600)] mb-8">
              Stay informed about our latest exploration activities, project updates, and company news.
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
                    News Section Under Development
                  </h2>
                  <p className="text-[var(--color-neutral-700)] mb-4 leading-relaxed">
                    We are currently setting up our news and updates section to keep you informed about 
                    our exploration progress, project milestones, and company developments. Check back 
                    soon for the latest updates from Pure Minerals.
                  </p>
                  <p className="text-[var(--color-neutral-600)] text-sm mb-6">
                    In the meantime, you can stay connected with us through our contact page or request 
                    access to our Virtual Data Room for detailed project information.
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
                  <span>Exploration program updates and field reports</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-earth-copper)] mt-1">•</span>
                  <span>Project milestones and achievements</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-earth-copper)] mt-1">•</span>
                  <span>Company news and announcements</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-earth-copper)] mt-1">•</span>
                  <span>Industry insights and market updates</span>
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

    // Show articles if available
    return (
      <main className="bg-[var(--background)]">
        <section className="py-16 md:py-20">
          <div className="site-container">
            <div className="max-w-3xl mb-12">
              <span className="section-badge section-badge--filled mb-6">Resources</span>
              <h1 className="display-2 text-on-light mb-4">News & Updates</h1>
              <p className="lead text-[var(--color-neutral-600)]">
                Stay informed about our latest exploration activities, project updates, and company news.
              </p>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={String(article.id)} article={article} />
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  } catch (err) {
    console.error("Error in ArticlesPage:", err);
    return <EmptyState />;
  }
}
