"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "../ui/AnimatedSection";
import Button from "../ui/Button";
import { ArrowRight, MapPin } from "lucide-react";

const projects = [
  {
    id: "skrattaasen",
    title: "Skrattås-Byafossen",
    subtitle: "Primary Focus Area",
    description:
      "Exceptional grades: 28.8% Zn, 539 ppm Ag, 10 ppm Au. Historic production of 34% Zn ore. Mineralization continues below 80m depth.",
    image: "/skrattas-mine-1.jpg",
    href: "/projects/skrattaasen",
    licenses: 7,
    area: "~30 km²",
    minerals: ["Zinc", "Lead", "Silver", "Gold"],
    status: "Active Exploration",
    highlight: "28.8% Zinc",
  },
  {
    id: "mokk",
    title: "Gaulstad/Mokk",
    subtitle: "Historic Mining District",
    description:
      "Mining history from 1760. Over 50 documented mines with confirmed 7.95% Cu. Covers the Gruvfjellet mountain plateau with proven mineralization.",
    image: "/mokk-mine-entrance.jpg",
    href: "/projects/mokk",
    licenses: 11,
    area: "~110 km²",
    minerals: ["Copper", "Zinc", "Silver", "Gold"],
    status: "Resource Definition",
    highlight: "7.95% Copper",
  },
];

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
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--obsidian)] via-transparent to-transparent" />

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
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
                          className="px-3 py-1 label bg-white/10 text-on-dark-muted rounded-full"
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

