"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Button from "./Button";

export type ScrollTimelineEntry = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  items?: string[];
  image?: string;
  highlight?: boolean;
  button?: {
    url: string;
    text: string;
  };
};

export interface ScrollTimelineProps {
  title?: string;
  description?: string;
  badge?: string;
  entries: ScrollTimelineEntry[];
  className?: string;
}

export default function ScrollTimeline({
  title,
  description,
  badge,
  entries,
}: ScrollTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setSentinelRef = (el: HTMLDivElement | null, i: number) => {
    sentinelRefs.current[i] = el;
  };

  useEffect(() => {
    if (!sentinelRefs.current.length) return;

    let frame = 0;
    const updateActiveByProximity = () => {
      frame = requestAnimationFrame(updateActiveByProximity);
      const centerY = window.innerHeight / 3;
      let bestIndex = 0;
      let bestDist = Infinity;
      sentinelRefs.current.forEach((node, i) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - centerY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      });
      if (bestIndex !== activeIndex) setActiveIndex(bestIndex);
    };

    frame = requestAnimationFrame(updateActiveByProximity);
    return () => cancelAnimationFrame(frame);
  }, [activeIndex]);

  useEffect(() => {
    setActiveIndex(0);
  }, []);

  return (
    <section className="py-10 md:py-12">
      <div className="site-container">
        {/* Header */}
        {(title || description) && (
          <div className="mx-auto max-w-3xl text-center mb-8 md:mb-10">
            {badge && (
              <span className="section-badge section-badge--filled mb-4">
                {badge}
              </span>
            )}
            {title && (
              <h2 className="display-3 text-[var(--color-brand-primary)] mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="lead text-[var(--color-neutral-600)] max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Timeline entries */}
        <div className="mx-auto max-w-5xl space-y-8 md:space-y-12">
          {entries.map((entry, index) => {
            const isActive = index === activeIndex;
            const Icon = entry.icon;

            return (
              <div
                key={index}
                className="relative flex flex-col gap-4 md:flex-row md:gap-8"
                aria-current={isActive ? "true" : "false"}
              >
                {/* Sticky meta column - Year/Icon */}
                <div className="top-24 flex h-min w-full md:w-48 shrink-0 items-center gap-4 md:sticky">
                  <div className="flex items-center gap-3">
                    {/* Icon with animation */}
                    <div 
                      className={`p-3 rounded-xl transition-all duration-500 ${
                        isActive 
                          ? entry.highlight 
                            ? "bg-[var(--color-earth-gold-bright)] text-[var(--color-brand-primary)] shadow-lg shadow-[var(--color-earth-gold-bright)]/30 scale-110" 
                            : "bg-[var(--color-earth-copper)] text-white shadow-lg shadow-[var(--color-earth-copper)]/30 scale-110"
                          : "bg-[var(--color-neutral-200)] text-[var(--color-neutral-500)]"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-lg font-display font-bold transition-colors duration-300 ${
                        isActive 
                          ? entry.highlight 
                            ? "text-[var(--color-earth-gold-bright)]"
                            : "text-[var(--color-earth-copper)]"
                          : "text-[var(--color-neutral-400)]"
                      }`}>
                        {entry.title}
                      </span>
                      <span className="text-sm text-[var(--color-neutral-500)]">
                        {entry.subtitle}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Invisible sentinel for scroll detection */}
                <div
                  ref={(el) => setSentinelRef(el, index)}
                  aria-hidden
                  className="absolute -top-24 left-0 h-12 w-12 opacity-0"
                />

                {/* Content card */}
                <article
                  className={`flex-1 flex flex-col rounded-2xl border-2 overflow-hidden transition-all duration-500 ${
                    isActive
                      ? entry.highlight 
                        ? "border-[var(--color-earth-gold-bright)]/50 bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-earth-slate)] shadow-2xl shadow-[var(--color-earth-gold-bright)]/10"
                        : "border-[var(--color-earth-copper)]/30 bg-white shadow-2xl shadow-[var(--color-earth-copper)]/10"
                      : "border-[var(--color-neutral-200)] bg-[var(--color-neutral-50)]"
                  }`}
                >
                  {/* Image */}
                  {entry.image && (
                    <div className={`relative overflow-hidden transition-all duration-500 ${
                      isActive ? "h-48 md:h-64" : "h-24 md:h-32"
                    }`}>
                      <Image
                        src={entry.image}
                        alt={entry.title}
                        fill
                        className="object-cover transition-transform duration-700"
                        style={{ transform: isActive ? "scale(1)" : "scale(1.1)" }}
                      />
                      {/* Gradient overlay */}
                      <div className={`absolute inset-0 transition-opacity duration-500 ${
                        isActive && entry.highlight 
                          ? "bg-gradient-to-t from-[var(--color-brand-primary)] via-transparent to-transparent opacity-60"
                          : "bg-gradient-to-t from-black/20 to-transparent opacity-40"
                      }`} />
                    </div>
                  )}
                  
                  <div className="p-5 md:p-6 space-y-4">
                    {/* Title & Description */}
                    <div className="space-y-2">
                      <h3 className={`text-lg md:text-xl font-display font-bold transition-colors duration-300 ${
                        isActive 
                          ? entry.highlight 
                            ? "text-[var(--color-earth-gold-bright)]"
                            : "text-[var(--color-brand-primary)]"
                          : "text-[var(--color-neutral-500)]"
                      }`}>
                        {entry.subtitle}
                      </h3>
                      
                      <p className={`text-sm md:text-base leading-relaxed transition-all duration-300 ${
                        isActive 
                          ? entry.highlight
                            ? "text-white/90"
                            : "text-[var(--color-neutral-600)]"
                          : "text-[var(--color-neutral-400)] line-clamp-2"
                      }`}>
                        {entry.description}
                      </p>
                    </div>

                    {/* Expandable content */}
                    <div
                      aria-hidden={!isActive}
                      className={`grid transition-all duration-500 ease-out ${
                        isActive 
                          ? "grid-rows-[1fr] opacity-100" 
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="space-y-4 pt-2">
                          {/* Items list */}
                          {entry.items && entry.items.length > 0 && (
                            <div className={`rounded-xl p-4 ${
                              entry.highlight
                                ? "bg-white/10 backdrop-blur-sm border border-white/10"
                                : "bg-[var(--color-neutral-100)] border border-[var(--color-neutral-200)]"
                            }`}>
                              <ul className="space-y-2.5">
                                {entry.items.map((item, itemIndex) => (
                                  <li 
                                    key={itemIndex} 
                                    className={`flex items-start gap-3 text-sm ${
                                      entry.highlight
                                        ? "text-white/80"
                                        : "text-[var(--color-neutral-600)]"
                                    }`}
                                  >
                                    <div className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 ${
                                      entry.highlight
                                        ? "bg-[var(--color-earth-gold-bright)]"
                                        : "bg-[var(--color-earth-copper)]"
                                    }`} />
                                    <span className="leading-relaxed">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Button */}
                          {entry.button && (
                            <div className="flex justify-end pt-2">
                              <Button 
                                href={entry.button.url}
                                variant={entry.highlight ? "primary" : "outline"}
                                size="sm"
                                icon={<ArrowRight size={14} />}
                                className={entry.highlight 
                                  ? "bg-[var(--color-earth-gold-bright)] hover:bg-[var(--color-earth-gold-warm)] text-[var(--color-brand-primary)]"
                                  : ""
                                }
                              >
                                {entry.button.text}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

