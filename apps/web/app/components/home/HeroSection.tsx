"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import { ArrowDown, ChevronRight } from "lucide-react";

// Hero slider images with captions
const heroImages = [
  {
    src: "/skrattas-overview.jpg",
    alt: "Skrattås exploration site overview",
    location: "Skrattås-Byafossen",
  },
  {
    src: "/mokk-gruvfjellet.jpg",
    alt: "Gruvfjellet mountain plateau - historic mining district",
    location: "Gaulstad-Mokk",
  },
  {
    src: "/skrattas-mine-1.jpg",
    alt: "Historic mine entrance at Skrattås",
    location: "Skrattås Mine",
  },
  {
    src: "/mokk-mine-entrance.jpg",
    alt: "Mine entrance at Mokk exploration site",
    location: "Mokk District",
  },
  {
    src: "/copper-minerals.jpg",
    alt: "Copper mineral samples from exploration",
    location: "Mineral Samples",
  },
  {
    src: "/byafossen-geology.jpg",
    alt: "Geological formations at Byafossen",
    location: "Byafossen",
  },
];

const SLIDE_DURATION = 6000; // 6 seconds per slide

export default function HeroSection() {
  const [offsetY, setOffsetY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-advance slides
  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
      setIsTransitioning(false);
    }, 500); // Half of transition duration
  }, []);

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      requestAnimationFrame(() => {
        setOffsetY(window.scrollY);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Auto-advance timer
    const slideTimer = setInterval(nextSlide, SLIDE_DURATION);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(slideTimer);
    };
  }, [nextSlide]);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 100,
      behavior: "smooth",
    });
  };

  const goToSlide = (index: number) => {
    if (index !== currentSlide) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 500);
    }
  };

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Image Slider with Parallax */}
      {heroImages.map((image, index) => (
        <div
          key={image.src}
          className={`
            absolute inset-0 z-0 will-change-transform
            transition-opacity duration-1000 ease-in-out
            ${index === currentSlide ? "opacity-100" : "opacity-0"}
          `}
          style={{ transform: `translateY(${offsetY * 0.4}px) scale(1.1)` }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover object-center"
            priority={index === 0}
            quality={90}
          />
        </div>
      ))}

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--obsidian)]/70 via-[var(--obsidian)]/50 to-[var(--obsidian)]/80 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/40 to-transparent z-10" />

      {/* Floating Particles Effect */}
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
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center site-container">
        {/* Tagline */}
        <div
          className={`
            transition-all duration-1000 ease-out
            ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
          style={{ transitionDelay: "200ms" }}
        >
          <span className="section-badge section-badge--bordered backdrop-blur-sm mb-6">
            Norwegian Mineral Exploration
          </span>
        </div>

        {/* Main Headline */}
        <h1
          className={`
            display-1 text-on-dark
            mb-6 max-w-4xl text-balance
            transition-all duration-1000 ease-out
            ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
          style={{ transitionDelay: "400ms" }}
        >
          What Tomorrow Needs,{" "}
          <span className="text-copper">We Find Today</span>
        </h1>

        {/* Subtitle */}
        <p
          className={`
            body-large text-on-dark-muted
            max-w-2xl mb-10 text-pretty
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

      {/* Slide Indicators */}
      <div 
        className={`
          absolute bottom-24 left-1/2 -translate-x-1/2 z-20
          flex items-center gap-3
          transition-all duration-500
          ${isLoaded ? "opacity-100" : "opacity-0"}
        `}
        style={{ transitionDelay: "1000ms" }}
      >
        {heroImages.map((image, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`
              group relative flex items-center gap-2
              transition-all duration-300
            `}
            aria-label={`Go to slide ${index + 1}: ${image.location}`}
          >
            {/* Indicator dot/bar */}
            <div
              className={`
                h-1 rounded-full transition-all duration-500
                ${index === currentSlide 
                  ? "w-8 bg-[var(--secondary)]" 
                  : "w-2 bg-white/40 hover:bg-white/60"
                }
              `}
            />
            
            {/* Location label on hover (desktop only) */}
            <span
              className={`
                hidden md:block absolute -top-8 left-1/2 -translate-x-1/2
                whitespace-nowrap px-2 py-1 rounded text-xs
                bg-black/60 backdrop-blur-sm text-white
                transition-all duration-300
                ${index === currentSlide 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                }
              `}
            >
              {image.location}
            </span>
          </button>
        ))}
      </div>

      {/* Current Location Badge */}
      <div
        className={`
          absolute bottom-24 right-8 z-20
          hidden lg:flex items-center gap-3
          px-4 py-2 rounded-full
          bg-black/30 backdrop-blur-sm border border-white/10
          transition-all duration-500
          ${isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}
        `}
      >
        <div className="w-2 h-2 rounded-full bg-[var(--secondary)] animate-pulse" />
        <span className="text-white/80 text-sm font-medium">
          {heroImages[currentSlide].location}
        </span>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className={`
          absolute bottom-8 left-1/2 -translate-x-1/2 z-20
          text-on-dark-subtle hover:text-white
          transition-all duration-500
          ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}
        style={{ transitionDelay: "1200ms" }}
        aria-label="Scroll to content"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="label">Discover</span>
          <ArrowDown size={20} className="animate-bounce" />
        </div>
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
        <div
          className="h-full bg-[var(--secondary)] transition-all ease-linear"
          style={{
            width: `${((currentSlide + 1) / heroImages.length) * 100}%`,
            transition: isTransitioning ? "none" : `width ${SLIDE_DURATION}ms linear`,
          }}
        />
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent z-15" />
    </section>
  );
}
