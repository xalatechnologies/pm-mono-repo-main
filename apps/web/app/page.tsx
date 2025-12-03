"use client";

import HeroSection from "./components/home/HeroSection";
import StatsSection from "./components/home/StatsSection";
import ProjectsShowcase from "./components/home/ProjectsShowcase";
import NorChainSection from "./components/home/NorChainSection";
import ContactSection from "./components/home/ContactSection";
import GoldDivider from "./components/ui/GoldDivider";

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
