"use client";

import StatsCard from "../ui/StatsCard";
import AnimatedSection from "../ui/AnimatedSection";
import { MapPin, Mountain, Gem, FileCheck } from "lucide-react";

const stats = [
  {
    value: 16,
    suffix: "",
    label: "Mining Licenses",
    icon: <FileCheck size={28} />,
  },
  {
    value: 138,
    suffix: " km²",
    label: "Exploration Area",
    icon: <MapPin size={28} />,
  },
  {
    value: 4,
    suffix: "+",
    label: "Mineral Types",
    icon: <Gem size={28} />,
  },
  {
    value: 2,
    suffix: "",
    label: "Active Projects",
    icon: <Mountain size={28} />,
  },
];

export default function StatsSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <pattern
            id="grid"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <AnimatedSection animation="fade-in-up" className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-[var(--secondary)] text-sm uppercase tracking-[0.2em] bg-[var(--secondary)]/10 rounded-full">
            Our Impact
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[var(--primary)] mb-4">
            Exploration at Scale
          </h2>
          <p className="text-[var(--stone-grey)] max-w-2xl mx-auto text-lg">
            Leading mineral exploration across Trøndelag with significant license holdings
            and proven geological expertise.
          </p>
        </AnimatedSection>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <StatsCard
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              icon={stat.icon}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

