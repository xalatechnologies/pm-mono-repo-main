"use client";

import HeroSection from "./components/home/HeroSection";
import StatsSection from "./components/home/StatsSection";
import ProjectsShowcase from "./components/home/ProjectsShowcase";
import NorChainSection from "./components/home/NorChainSection";
import AnimatedSection from "./components/ui/AnimatedSection";
import Button from "./components/ui/Button";
import { ArrowRight, Mail } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Projects Showcase */}
      <ProjectsShowcase />

      {/* NorChain Section */}
      <NorChainSection />

      {/* CTA Section */}
      <section className="py-20 bg-[var(--primary)] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="cta-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <AnimatedSection animation="fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Ready to Explore{" "}
              <span className="text-[var(--secondary)]">Opportunities?</span>
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
              Connect with our team to learn more about our exploration projects
              and investment opportunities in Norwegian mineral resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                icon={<Mail size={20} />}
                iconPosition="left"
              >
                Get in Touch
              </Button>
              <Button
                href="/projects"
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                icon={<ArrowRight size={20} />}
              >
                View Projects
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
