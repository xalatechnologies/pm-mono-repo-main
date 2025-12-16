import HeroSection from "./components/home/HeroSection";
import StatsSection from "./components/home/StatsSection";
import ProjectsShowcase from "./components/home/ProjectsShowcase";
import NorChainSection from "./components/home/NorChainSection";
import ContactSection from "./components/home/ContactSection";
import GoldDivider from "./components/ui/GoldDivider";
import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Home",
  description:
    "Pure Minerals - Norwegian exploration company specializing in copper, zinc, gold, silver, and rare earth elements (REE) in Trøndelag. 18 mining licenses covering 179 km². Blockchain tokenized mining assets on NorChain.",
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

export default function Home() {
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

      {/* NorChain Section */}
      <NorChainSection />

      <GoldDivider />

      {/* Contact Section */}
      <ContactSection />
    </main>
  );
}
