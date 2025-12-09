"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import { ArrowDown, ChevronRight, TrendingUp } from "lucide-react";

// Hero slides with dynamic content
const heroSlides = [
  {
    src: "/skrattas-overview.jpg",
    alt: "Skrattås exploration site overview",
    location: "Skrattås-Byafossen",
    badge: "Investment Opportunity",
    headline: "Exceptional Grades,",
    headlineAccent: "Exceptional Returns",
    subtitle: "28.8% Zinc • 539 ppm Silver • 10 ppm Gold — Discover one of Norway's most promising mineral deposits with proven historic production.",
    stat: "28.8%",
    statLabel: "Zinc Grade",
  },
  {
    src: "/mokk-gruvfjellet.jpg",
    alt: "Gruvfjellet mountain plateau - historic mining district",
    location: "Gaulstad-Mokk",
    badge: "Historic Mining District",
    headline: "265 Years of",
    headlineAccent: "Proven Potential",
    subtitle: "Mining heritage since 1760. Over 50 documented mines with confirmed 7.95% copper across 110 km² of strategic license holdings.",
    stat: "1760",
    statLabel: "First Discovery",
  },
  {
    src: "/skrattas-mine-1.jpg",
    alt: "Historic mine entrance at Skrattås",
    location: "Skrattås Mine",
    badge: "Active Exploration",
    headline: "Where History Meets",
    headlineAccent: "Modern Innovation",
    subtitle: "Historic production of 34% zinc ore. Mineralization continues below 80m depth — the best is yet to come.",
    stat: "34%",
    statLabel: "Historic Ore Grade",
  },
  {
    src: "/mokk-mine-entrance.jpg",
    alt: "Mine entrance at Mokk exploration site",
    location: "Mokk District",
    badge: "Resource Definition",
    headline: "Unlocking Norway's",
    headlineAccent: "Hidden Wealth",
    subtitle: "7.95% copper, 840 ppm cobalt, and precious metals. World-class grades in a AAA-rated mining jurisdiction.",
    stat: "7.95%",
    statLabel: "Copper Grade",
  },
  {
    src: "/copper-minerals.jpg",
    alt: "Copper mineral samples from exploration",
    location: "Mineral Samples",
    badge: "Critical Minerals",
    headline: "Powering the",
    headlineAccent: "Green Transition",
    subtitle: "Copper, zinc, gold, silver — essential metals for renewable energy, EVs, and infrastructure. 70+ elements analyzed.",
    stat: "70+",
    statLabel: "Elements Analyzed",
  },
  {
    src: "/byafossen-geology.jpg",
    alt: "Geological formations at Byafossen",
    location: "Byafossen",
    badge: "Norwegian Excellence",
    headline: "Science-Driven",
    headlineAccent: "Discovery",
    subtitle: "Advanced TEM surveys, XRF analysis, and comprehensive geological mapping. Partnered with leading Nordic geoscience firms.",
    stat: "18",
    statLabel: "Mining Licenses",
  },
];

const SLIDE_DURATION = 15000; // 15 seconds per slide for comfortable reading

export default function HeroSection() {
  const [offsetY, setOffsetY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const [slideProgress, setSlideProgress] = useState(0);

  // Auto-advance slides with content animation
  const nextSlide = useCallback(() => {
    setContentVisible(false);
    setIsTransitioning(true);
    setSlideProgress(0); // Reset progress
    
    // Longer delay for smoother content transition
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setIsTransitioning(false);
    }, 800);
    
    setTimeout(() => {
      setContentVisible(true);
    }, 1000);
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
    
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + (100 / (SLIDE_DURATION / 100));
      });
    }, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(slideTimer);
      clearInterval(progressInterval);
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
      setContentVisible(false);
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 800);
      
      setTimeout(() => {
        setContentVisible(true);
      }, 1000);
    }
  };

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Image Slider with Parallax */}
      {heroSlides.map((image, index) => (
        <div
          key={image.src}
          className={`
            absolute inset-0 z-0 will-change-transform
            transition-opacity duration-[1500ms] ease-in-out
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
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--obsidian)]/80 via-[var(--obsidian)]/60 to-[var(--obsidian)]/90 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/60 via-transparent to-transparent z-10" />

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[var(--secondary)]/40 rounded-full animate-float"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center site-container -mt-16 md:-mt-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div
            className={`
              transition-all duration-700 ease-out
              ${isLoaded && contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
            `}
            style={{ transitionDelay: "100ms" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 border border-[var(--secondary)]/40 backdrop-blur-sm">
              <TrendingUp size={14} className="text-[var(--secondary)]" />
              <span className="text-white/90 text-sm font-medium tracking-wide">
                {slide.badge}
              </span>
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className={`
              display-1 text-on-dark leading-[1.1]
              mb-6 text-balance
              transition-all duration-700 ease-out
              ${isLoaded && contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
            style={{ transitionDelay: "200ms" }}
          >
            {slide.headline}{" "}
            <span className="text-[var(--color-earth-gold-bright)] block sm:inline">
              {slide.headlineAccent}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`
              text-lg md:text-xl text-white/80 leading-relaxed
              max-w-2xl mb-8
              transition-all duration-700 ease-out
              ${isLoaded && contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
            style={{ transitionDelay: "300ms" }}
          >
            {slide.subtitle}
          </p>

          {/* Stats Badge */}
          <div
            className={`
              inline-flex items-center gap-4 mb-10 p-4 rounded-2xl
              bg-white/5 backdrop-blur-sm border border-white/10
              transition-all duration-700 ease-out
              ${isLoaded && contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="text-3xl md:text-4xl font-display font-bold text-[var(--color-earth-gold-bright)]">
              {slide.stat}
            </div>
            <div className="text-sm text-white/60 uppercase tracking-wider font-medium">
              {slide.statLabel}
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className={`
              flex flex-col sm:flex-row gap-4
              transition-all duration-700 ease-out
              ${isLoaded && contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
            style={{ transitionDelay: "500ms" }}
          >
            <Button
              href="/projects"
              variant="primary"
              size="lg"
              icon={<ChevronRight size={20} />}
              className="shadow-lg shadow-[var(--color-earth-copper)]/30"
            >
              Explore Projects
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm"
            >
              Investor Inquiries
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div 
        className={`
          absolute bottom-28 left-1/2 -translate-x-1/2 z-20
          flex items-center gap-3
          transition-all duration-500
          ${isLoaded ? "opacity-100" : "opacity-0"}
        `}
        style={{ transitionDelay: "800ms" }}
      >
        {heroSlides.map((image, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative flex items-center gap-2 transition-all duration-300"
            aria-label={`Go to slide ${index + 1}: ${image.location}`}
          >
            {/* Indicator dot/bar */}
            <div
              className={`
                h-1.5 rounded-full transition-all duration-500
                ${index === currentSlide 
                  ? "w-10 bg-[var(--secondary)]" 
                  : "w-2.5 bg-white/30 hover:bg-white/50"
                }
              `}
            />
            
            {/* Location label on hover */}
            <span
              className={`
                hidden md:block absolute -top-10 left-1/2 -translate-x-1/2
                whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium
                bg-black/70 backdrop-blur-sm text-white border border-white/10
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

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className={`
          absolute bottom-8 left-1/2 -translate-x-1/2 z-20
          text-on-dark-subtle hover:text-white
          transition-all duration-500
          ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}
        style={{ transitionDelay: "1000ms" }}
        aria-label="Scroll to content"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest font-medium">Discover More</span>
          <ArrowDown size={18} className="animate-bounce" />
        </div>
      </button>

      {/* Progress Bar - Per Slide */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10 z-20">
        <div
          className="h-full bg-gradient-to-r from-[var(--color-earth-copper)] to-[var(--color-earth-gold-bright)] shadow-[0_0_10px_var(--color-earth-gold-bright)]"
          style={{
            width: `${slideProgress}%`,
            transition: isTransitioning ? "width 300ms ease-out" : "width 100ms linear",
          }}
        />
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--background)] to-transparent z-15" />
    </section>
  );
}
