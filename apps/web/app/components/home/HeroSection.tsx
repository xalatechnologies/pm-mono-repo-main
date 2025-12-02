"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import { ArrowDown, ChevronRight } from "lucide-react";

export default function HeroSection() {
  const [offsetY, setOffsetY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      requestAnimationFrame(() => {
        setOffsetY(window.scrollY);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 100,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Parallax Background Image */}
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ transform: `translateY(${offsetY * 0.4}px) scale(1.1)` }}
      >
        <Image
          src="/minerals.jpg"
          alt="Geological formations"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--obsidian)]/70 via-[var(--obsidian)]/50 to-[var(--obsidian)]/80 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/40 to-transparent z-10" />

      {/* Floating Particles Effect (CSS-based) */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[var(--secondary)]/30 rounded-full animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center px-4 sm:px-6 text-center">
        {/* Tagline */}
        <div
          className={`
            transition-all duration-1000 ease-out
            ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
          style={{ transitionDelay: "200ms" }}
        >
          <span className="inline-block px-4 py-2 mb-6 text-[var(--secondary)] text-sm uppercase tracking-[0.3em] border border-[var(--secondary)]/30 rounded-full backdrop-blur-sm">
            Norwegian Mineral Exploration
          </span>
        </div>

        {/* Main Headline */}
        <h1
          className={`
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl
            font-serif font-bold text-white
            leading-tight mb-6 max-w-4xl
            transition-all duration-1000 ease-out
            ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
          style={{ transitionDelay: "400ms" }}
        >
          What Tomorrow Needs,{" "}
          <span className="text-[var(--secondary)]">We Find Today</span>
        </h1>

        {/* Subtitle */}
        <p
          className={`
            text-lg sm:text-xl text-white/80
            max-w-2xl mb-10 leading-relaxed
            transition-all duration-1000 ease-out
            ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
          style={{ transitionDelay: "600ms" }}
        >
          Pioneering sustainable mineral exploration in Trøndelag, Norway.
          Discovering copper, zinc, gold, and silver deposits for the future.
        </p>

        {/* CTA Buttons */}
        <div
          className={`
            flex flex-col sm:flex-row gap-4
            transition-all duration-1000 ease-out
            ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
          style={{ transitionDelay: "800ms" }}
        >
          <Button
            href="/projects"
            variant="primary"
            size="lg"
            icon={<ChevronRight size={20} />}
          >
            Explore Projects
          </Button>
          <Button
            href="/about"
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 hover:text-white"
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className={`
          absolute bottom-8 left-1/2 -translate-x-1/2 z-20
          text-white/60 hover:text-white
          transition-all duration-500
          ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}
        style={{ transitionDelay: "1200ms" }}
        aria-label="Scroll to content"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest">Discover</span>
          <ArrowDown size={20} className="animate-bounce" />
        </div>
      </button>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent z-15" />
    </section>
  );
}

