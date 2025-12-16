"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "../components/ui/AnimatedSection";
import Button from "../components/ui/Button";
import { MapPin, FileCheck, Mountain, ArrowRight, Pickaxe, Gem } from "lucide-react";
import { PORTFOLIO } from "@/lib/portfolio";

// Image galleries for each project - high-quality images from InvestorPitch
const projectImages = {
  skrattaasen: [
    "/hero-skrattas-overview.jpg",
    "/project-skrattas-1.jpg",
    "/project-skrattas-2.jpg",
    "/project-skrattas-3.jpg",
    "/project-byafossen-1.jpg",
    "/project-bjonsas-1.jpg",
  ],
  mokk: [
    "/hero-mokk-gruvfjellet.jpg",
    "/project-mokk-1.jpg",
    "/project-mokk-2.jpg",
    "/project-mokk-3.jpg",
    "/project-mokk-mineral.jpg",
  ],
};

const projects = [
  {
    id: "skrattaasen" as const,
    name: "Skrattåsen",
    subtitle: "Primary Focus Area",
    status: "Active Exploration",
    description: "High-potential exploration site with exceptional zinc, lead, copper, iron, silver, gold and REE signatures. Currently our primary focus for deep drilling strategy.",
    href: "/projects/skrattaasen",
    licenses: PORTFOLIO.districts.skrattasByafossen.licenses,
    area: `${PORTFOLIO.districts.skrattasByafossen.coverageKm2} km²`,
    minerals: PORTFOLIO.districts.skrattasByafossen.minerals,
    highlights: [
      "Exceptional mineral concentrations",
      "Complex tectonic structures identified",
      "TEM survey planned for 2025",
      "Strategic deep drilling target",
    ],
  },
  {
    id: "mokk" as const,
    name: "Gaulstad/Mokk",
    subtitle: "Historic Mining District",
    status: "Resource Definition",
    description: "Covering 128 km² with 11 licenses, this historic area hosts confirmed copper, zinc, nickel, iron, silver, gold and REE mineralization with significant commercial potential.",
    href: "/projects/mokk",
    licenses: PORTFOLIO.districts.gaulstadMokk.licenses,
    area: `${PORTFOLIO.districts.gaulstadMokk.coverageKm2} km²`,
    minerals: PORTFOLIO.districts.gaulstadMokk.minerals,
    highlights: [
      "Mining history dating to 1760",
      "Confirmed base metal mineralization",
      "Historic mine entrances surveyed",
      "Systematic drilling planned",
    ],
  },
];

const IMAGE_ROTATION_INTERVAL = 5000; // 5 seconds per image

const stats = [
  { value: String(PORTFOLIO.totals.licenses), label: "Total Licenses", icon: <FileCheck size={24} /> },
  { value: `${PORTFOLIO.totals.coverageKm2} km²`, label: "Total Coverage", icon: <MapPin size={24} /> },
  { value: PORTFOLIO.totals.mineralTypesLabel, label: "Mineral Types", icon: <Gem size={24} /> },
  { value: String(PORTFOLIO.totals.activeProjects), label: "Active Projects", icon: <Mountain size={24} /> },
];

// Rotating image component for project cards
function RotatingProjectImage({ 
  projectId, 
  projectName 
}: { 
  projectId: keyof typeof projectImages; 
  projectName: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = projectImages[projectId];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, IMAGE_ROTATION_INTERVAL);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <>
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`${projectName} - Image ${index + 1}`}
          fill
          className={`object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          priority={index === 0}
        />
      ))}
      {/* Image indicators */}
      <div className="absolute bottom-4 left-4 flex gap-1.5 z-10">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white w-6"
                : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </>
  );
}

export default function ProjectsPage() {
  return (
    <main className="bg-[var(--background)]">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--obsidian)]" />
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/trondelag_puls1.svg"
            alt="Trøndelag region"
            fill
            className="object-contain opacity-30"
          />
        </div>

        <div className="site-container relative z-10">
          <AnimatedSection animation="fade-in-up" className="text-center">
            <span className="inline-block px-4 py-2 mb-6 text-[var(--secondary)] text-sm uppercase tracking-[0.2em] border border-[var(--secondary)]/30 rounded-full">
              Our Projects
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6">
              <span className="text-white">Exploration in{" "}</span>
              <span className="text-[var(--secondary)]">Trøndelag</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Strategic license holdings in Norway&apos;s mineral-rich Steinkjer region,
              {` ${PORTFOLIO.content.focusMineralsSentence}`}
            </p>
          </AnimatedSection>

          {/* Stats Bar */}
          <AnimatedSection animation="fade-in-up" delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10"
                >
                  <div className="flex justify-center mb-2 text-[var(--secondary)]">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-serif font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20">
        <div className="site-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="slide-in-left">
              <span className="inline-block px-4 py-2 mb-4 text-[var(--secondary)] text-sm uppercase tracking-[0.2em] bg-[var(--secondary)]/10 rounded-full">
                Regional Overview
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--primary)] mb-6">
                Laying the Groundwork for Discoveries in Steinkjer
              </h2>
              <div className="space-y-4 text-[var(--stone-grey)] leading-relaxed">
                <p>
                  Pure Minerals is an early-phase exploration company actively developing
                  several mining licenses in the Steinkjer area, Trøndelag County, Norway.
                </p>
                <p>
                  Initial exploration efforts focused on the historic, mostly water-filled
                  mine entrances at Gaulstad and Mokk. Recent developments have brought
                  increased attention to the Skrattåsen site, which has emerged as our
                  key focus area based on promising structural and geochemical indicators.
                </p>
                <p>
                  Further high-resolution investigations continue into 2025, with planned
                  geophysical surveys including targeted TEM surveys to inform a coordinated
                  deep drilling strategy.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-right" delay={200}>
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl bg-white p-6">
                <Image
                  src="/NO_5006_Steinkjer.svg"
                  alt="Steinkjer in Trøndelag"
                  fill
                  className="object-contain"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Projects Detail Section */}
      <section className="py-20 bg-[var(--sandstone)]">
        <div className="site-container">
          <AnimatedSection animation="fade-in-up" className="text-center mb-16">
            <span className="inline-block px-4 py-2 mb-4 text-[var(--secondary)] text-sm uppercase tracking-[0.2em] bg-[var(--secondary)]/10 rounded-full">
              Exploration Areas
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--primary)] mb-4">
              Active Project Sites
            </h2>
          </AnimatedSection>

          <div className="space-y-12">
            {projects.map((project, index) => (
              <AnimatedSection
                key={project.id}
                animation={index % 2 === 0 ? "slide-in-left" : "slide-in-right"}
              >
                <Link href={project.href} className="block group">
                  <article
                    className={`
                      bg-white rounded-2xl overflow-hidden shadow-sm
                      border border-[var(--stone-grey)]/10
                      hover:shadow-xl hover:border-[var(--secondary)]/30
                      transition-all duration-500
                      ${index % 2 === 0 ? "lg:flex" : "lg:flex lg:flex-row-reverse"}
                    `}
                  >
                    {/* Image - Rotating Gallery */}
                    <div className="lg:w-1/2 relative aspect-video lg:aspect-auto overflow-hidden min-h-[300px]">
                      <RotatingProjectImage 
                        projectId={project.id} 
                        projectName={project.name} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--secondary)] text-white text-xs uppercase tracking-wider rounded-full">
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          {project.status}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:w-1/2 p-8 lg:p-10">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--primary)] group-hover:text-[var(--secondary)] transition-colors">
                            {project.name}
                          </h3>
                          <p className="text-[var(--secondary)] text-sm uppercase tracking-wider">
                            {project.subtitle}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-[var(--stone-grey)]">
                          <MapPin size={18} />
                          <span className="text-sm font-medium">{project.area}</span>
                        </div>
                      </div>

                      <p className="text-[var(--stone-grey)] mb-6 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Minerals */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.minerals.map((mineral) => (
                          <span
                            key={mineral}
                            className={`px-3 py-1 text-xs uppercase tracking-wider rounded-full ${
                              mineral === "REE"
                                ? "bg-gradient-to-r from-[var(--color-earth-patina)] to-[var(--color-earth-copper)] text-white font-semibold"
                                : "bg-[var(--primary)]/5 text-[var(--primary)]"
                            }`}
                          >
                            {mineral}
                          </span>
                        ))}
                      </div>

                      {/* Highlights */}
                      <div className="grid sm:grid-cols-2 gap-2 mb-6">
                        {project.highlights.map((highlight) => (
                          <div
                            key={highlight}
                            className="flex items-center gap-2 text-sm text-[var(--stone-grey)]"
                          >
                            <Pickaxe size={14} className="text-[var(--secondary)]" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-8 pt-6 border-t border-[var(--stone-grey)]/10">
                        <div>
                          <span className="text-3xl font-serif font-bold text-[var(--secondary)]">
                            {project.licenses}
                          </span>
                          <span className="text-[var(--stone-grey)] text-sm ml-1">licenses</span>
                        </div>
                        <div>
                          <span className="text-3xl font-serif font-bold text-[var(--secondary)]">
                            {project.area}
                          </span>
                          <span className="text-[var(--stone-grey)] text-sm ml-1">coverage</span>
                        </div>
                        <ArrowRight
                          size={24}
                          className="ml-auto text-[var(--stone-grey)]/30 group-hover:text-[var(--secondary)] group-hover:translate-x-2 transition-all"
                        />
                      </div>
                    </div>
                  </article>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="site-container">
          <AnimatedSection animation="fade-in-up">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="display-3 text-[var(--color-brand-primary)] mb-4">
                Want to Learn More About Our Exploration?
              </h2>
              <p className="lead text-[var(--color-neutral-600)] mb-8">
                Contact our team to discuss project details, investment opportunities,
                and partnership possibilities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight size={20} />}>
                  Contact Us
                </Button>
                <Button href="/about" variant="outline" size="lg">
                  About Pure Minerals
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
