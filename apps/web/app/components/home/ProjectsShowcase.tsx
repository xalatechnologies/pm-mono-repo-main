"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "../ui/AnimatedSection";
import Button from "../ui/Button";
import { ArrowRight, MapPin } from "lucide-react";
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

const IMAGE_ROTATION_INTERVAL = 4000; // 4 seconds per image

const projects = [
  {
    id: "skrattaasen" as const,
    title: "Skrattås-Byafossen",
    subtitle: "Primary Focus Area",
    description:
      "Exceptional grades: 28.8% Zn, 539 ppm Ag, 10 ppm Au. Historic production of 34% Zn ore. Mineralization continues below 80m depth.",
    href: "/projects/skrattaasen",
    licenses: PORTFOLIO.districts.skrattasByafossen.licenses,
    area: `${PORTFOLIO.districts.skrattasByafossen.coverageKm2} km²`,
    minerals: PORTFOLIO.districts.skrattasByafossen.minerals,
    status: "Active Exploration",
    highlight: "28.8% Zinc",
  },
  {
    id: "mokk" as const,
    title: "Gaulstad/Mokk",
    subtitle: "Historic Mining District",
    description:
      "Mining history from 1760. Over 50 documented mines with confirmed 7.95% Cu. Covers the Gruvfjellet mountain plateau with proven mineralization.",
    href: "/projects/mokk",
    licenses: PORTFOLIO.districts.gaulstadMokk.licenses,
    area: `${PORTFOLIO.districts.gaulstadMokk.coverageKm2} km²`,
    minerals: PORTFOLIO.districts.gaulstadMokk.minerals,
    status: "Resource Definition",
    highlight: "7.95% Copper",
  },
];

// Rotating image component
function RotatingImage({ 
  projectId, 
  projectTitle 
}: { 
  projectId: keyof typeof projectImages; 
  projectTitle: string;
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
          alt={`${projectTitle} - Image ${index + 1}`}
          fill
          className={`object-cover transition-all duration-1000 group-hover:scale-110 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          priority={index === 0}
        />
      ))}
      {/* Image indicators */}
      <div className="absolute bottom-3 right-3 flex gap-1 z-10">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white w-4"
                : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </>
  );
}

export default function ProjectsShowcase() {
  return (
    <section className="py-20 bg-[var(--primary)]">
      <div className="site-container">
        {/* Section Header */}
        <AnimatedSection animation="fade-in-up" className="text-center mb-16">
          <span className="section-badge section-badge--bordered mb-4">
            Active Projects
          </span>
          <h2 className="display-2 text-on-dark mb-5">
            Exploration Areas
          </h2>
          <p className="lead text-on-dark-muted mx-auto text-balance">
            Strategic license holdings in the mineral-rich Steinkjer region of Trøndelag County.
          </p>
        </AnimatedSection>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {projects.map((project, index) => (
            <AnimatedSection
              key={project.id}
              animation={index % 2 === 0 ? "slide-in-left" : "slide-in-right"}
              delay={index * 200}
              className="h-full"
            >
              <Link href={project.href} className="group block h-full">
                <article className="relative h-full flex flex-col bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[var(--secondary)]/50 transition-all duration-500">
                  {/* Image Container - Rotating Gallery */}
                  <div className="relative h-64 overflow-hidden">
                    <RotatingImage 
                      projectId={project.id} 
                      projectTitle={project.title} 
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--obsidian)] via-transparent to-transparent pointer-events-none" />

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--secondary)]/90 text-white label rounded-full">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="headline text-on-dark group-hover:text-copper transition-colors">
                          {project.title}
                        </h3>
                        <p className="overline text-copper mt-1">
                          {project.subtitle}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-on-dark-subtle">
                        <MapPin size={16} />
                        <span className="body-small">{project.area}</span>
                      </div>
                    </div>

                    <p className="text-on-dark-muted mb-4 body-small">
                      {project.description}
                    </p>

                    {/* Minerals Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.minerals.map((mineral) => (
                        <span
                          key={mineral}
                          className={`px-3 py-1 label rounded-full ${
                            mineral === "REE"
                              ? "bg-gradient-to-r from-[var(--color-earth-patina)] to-[var(--color-earth-copper)] text-white font-semibold"
                              : "bg-white/10 text-on-dark-muted"
                          }`}
                        >
                          {mineral}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 pt-4 border-t border-white/10 mt-auto">
                      <div>
                        <span className="stat-value text-2xl text-copper">
                          {project.licenses}
                        </span>
                        <span className="stat-label text-on-dark-subtle ml-1">licenses</span>
                      </div>
                      <div>
                        <span className="stat-value text-2xl text-copper">
                          {project.area}
                        </span>
                        <span className="stat-label text-on-dark-subtle ml-1">coverage</span>
                      </div>
                      <ArrowRight
                        size={20}
                        className="ml-auto text-on-dark-subtle group-hover:text-copper group-hover:translate-x-1 transition-all"
                      />
                    </div>
                  </div>
                </article>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection animation="fade-in-up" delay={400} className="text-center mt-12">
          <Button href="/projects" variant="primary" size="lg" icon={<ArrowRight size={20} />}>
            View All Projects
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}

