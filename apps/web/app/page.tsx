import HeroSection from "./components/home/HeroSection";
import StatsSection from "./components/home/StatsSection";
import ProjectsShowcase from "./components/home/ProjectsShowcase";
import NorChainSection from "./components/home/NorChainSection";
import ContactSection from "./components/home/ContactSection";
import LatestNews from "./components/home/LatestNews";
import GoldDivider from "./components/ui/GoldDivider";
import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { Article } from "@/types/articles";

export const metadata: Metadata = generateSEOMetadata({
  title: "Home",
  description:
    "Pure Minerals - Norwegian exploration company specializing in copper, zinc, gold, silver, and rare earth elements (REE) in Trøndelag. 19 mining licenses covering 189 km². Blockchain tokenized mining assets on NorChain.",
  keywords: [
    "Pure Minerals Norway",
    "Norwegian mining investment",
    "copper exploration",
    "zinc mining Norway",
    "rare earth elements Norway",
    "mining blockchain tokenization",
  ],
  canonical: "https://pureminerals.no",
});

// Fetch latest articles for homepage (fetch more since we filter in component)
async function getLatestArticles(): Promise<Article[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) return [];

  try {
    const res = await fetch(`${baseUrl}/articles`, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!res.ok) return [];

    const articles: Article[] = await res.json();
    
    // Sort by date and return more articles (component will filter for images + mining focus)
    return articles
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 20);
  } catch {
    return [];
  }
}

export default async function Home() {
  const latestArticles = await getLatestArticles();

  return (
    <main className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      <GoldDivider />

      {/* Projects Showcase */}
      <ProjectsShowcase />

      <GoldDivider />

      {/* Latest News - Only show if articles exist */}
      {latestArticles.length > 0 && (
        <>
          <LatestNews articles={latestArticles} />
          <GoldDivider />
        </>
      )}

      {/* NorChain Section */}
      <NorChainSection />

      <GoldDivider />

      {/* Contact Section */}
      <ContactSection />
    </main>
  );
}
