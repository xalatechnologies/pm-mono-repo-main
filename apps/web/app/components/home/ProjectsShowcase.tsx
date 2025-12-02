"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "../ui/AnimatedSection";
import Button from "../ui/Button";
import { ArrowRight, MapPin } from "lucide-react";

const projects = [
  {
    id: "skrattaasen",
    title: "Skrattåsen",
    subtitle: "Primary Focus Area",
    description:
      "High-potential exploration site with exceptional zinc, lead, and silver concentrations. Currently our primary focus for deep drilling strategy.",
    image: "/fieldwork1.png",
    href: "/projects/skrattaasen",
    licenses: 5,
    area: "38 km²",
    minerals: ["Zinc", "Lead", "Silver", "Gold"],
    status: "Active Exploration",
  },
  {
    id: "mokk",
    title: "Gaulstad/Mokk",
    subtitle: "Historic Mining District",
    description:
      "Covering 100 km² with 11 licenses, this historic area hosts confirmed copper, zinc, silver, and gold mineralization with significant commercial potential.",
    image: "/mokk1.png",
    href: "/projects/mokk",
    licenses: 11,
    area: "100 km²",
    minerals: ["Copper", "Zinc", "Silver", "Gold"],
    status: "Resource Definition",
  },
];

export default function ProjectsShowcase() {
  return (
    <section className="py-20 bg-[var(--primary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <AnimatedSection animation="fade-in-up" className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-[var(--secondary)] text-sm uppercase tracking-[0.2em] border border-[var(--secondary)]/30 rounded-full">
            Active Projects
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Exploration Areas
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
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
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--secondary)]/90 text-white text-xs uppercase tracking-wider rounded-full">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-serif font-bold text-white group-hover:text-[var(--secondary)] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-[var(--secondary)] text-sm uppercase tracking-wider">
                          {project.subtitle}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-white/50">
                        <MapPin size={16} />
                        <span className="text-sm">{project.area}</span>
                      </div>
                    </div>

                    <p className="text-white/70 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Minerals Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.minerals.map((mineral) => (
                        <span
                          key={mineral}
                          className="px-3 py-1 text-xs uppercase tracking-wider bg-white/10 text-white/80 rounded-full"
                        >
                          {mineral}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 pt-4 border-t border-white/10 mt-auto">
                      <div>
                        <span className="text-2xl font-bold text-[var(--secondary)]">
                          {project.licenses}
                        </span>
                        <span className="text-white/50 text-sm ml-1">licenses</span>
                      </div>
                      <div>
                        <span className="text-2xl font-bold text-[var(--secondary)]">
                          {project.area}
                        </span>
                        <span className="text-white/50 text-sm ml-1">coverage</span>
                      </div>
                      <ArrowRight
                        size={20}
                        className="ml-auto text-white/30 group-hover:text-[var(--secondary)] group-hover:translate-x-1 transition-all"
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

