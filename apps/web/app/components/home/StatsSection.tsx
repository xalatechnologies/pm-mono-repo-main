"use client";

import StatsCard from "../ui/StatsCard";
import AnimatedSection from "../ui/AnimatedSection";
import { MapPin, Mountain, Gem, FileCheck } from "lucide-react";

const stats = [
  {
    value: 16,
    suffix: "",
    label: "Mining Licenses",
    description: "Active exploration permits across Trøndelag",
    icon: <FileCheck size={28} strokeWidth={1.5} />,
    variant: "default" as const,
  },
  {
    value: 138,
    suffix: "km²",
    label: "Exploration Area",
    description: "Total licensed territory under investigation",
    icon: <MapPin size={28} strokeWidth={1.5} />,
    variant: "featured" as const,
  },
  {
    value: 4,
    suffix: "+",
    label: "Mineral Types",
    description: "Copper, zinc, gold, and silver deposits",
    icon: <Gem size={28} strokeWidth={1.5} />,
    variant: "featured" as const,
  },
  {
    value: 2,
    suffix: "",
    label: "Active Projects",
    description: "Major sites in advanced exploration phases",
    icon: <Mountain size={28} strokeWidth={1.5} />,
    variant: "default" as const,
  },
];

export default function StatsSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-neutral-100)] via-[var(--color-neutral-50)] to-[var(--color-neutral-100)]" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-earth-copper)]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-earth-patina)]/5 rounded-full blur-3xl" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="stats-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stats-grid)" />
        </svg>
      </div>

      <div className="site-container relative z-10">
        {/* Section Header */}
        <AnimatedSection animation="fade-in-up" className="text-center mb-16 md:mb-20">
          <span className="section-badge section-badge--filled mb-6">
            Our Impact
          </span>
          <h2 className="display-2 text-on-light mb-6">
            Exploration at Scale
          </h2>
          <p className="lead mx-auto max-w-2xl text-balance">
            Leading mineral exploration across Trøndelag with significant license holdings
            and proven geological expertise.
          </p>
        </AnimatedSection>

        {/* Stats Grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <StatsCard
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              description={stat.description}
              icon={stat.icon}
              variant={stat.variant}
              delay={index * 150}
            />
          ))}
        </div>

        {/* Bottom accent line */}
        <AnimatedSection animation="fade-in-up" delay={600} className="mt-16 md:mt-20">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-[var(--color-earth-copper)]/30" />
            <div className="w-2 h-2 rounded-full bg-[var(--color-earth-copper)]/40" />
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-[var(--color-earth-copper)]/30" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
