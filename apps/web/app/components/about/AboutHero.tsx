"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import { ArrowRight, TrendingUp, Users, Award } from "lucide-react";
import { PORTFOLIO } from "@/lib/portfolio";

// About page hero slides with investor-focused content - high-quality images
const aboutSlides = [
  {
    src: "/hero-mokk-gruvfjellet.jpg",
    alt: "Gruvfjellet mountain plateau panoramic view",
    location: "Gruvfjellet Plateau",
    badge: "Company Overview",
    headline: "Pure Minerals AS",
    headlineAccent: "Your Partner in Discovery",
    subtitle: "A Norwegian exploration company unlocking mineral wealth in Trøndelag since 2021. Strategic vision, proven methodology, exceptional potential.",
    stat: "2021",
    statLabel: "Founded",
    icon: <Award size={16} />,
  },
  {
    src: "/hero-skrattas-overview.jpg",
    alt: "Skrattås exploration area overview",
    location: "License Portfolio",
    badge: "Strategic Holdings",
    headline: "18 Mining Licenses",
    headlineAccent: `${PORTFOLIO.totals.coverageKm2} km² of Opportunity`,
    subtitle: "Comprehensive coverage across two premier districts: Gaulstad-Mokk and Skrattås-Byafossen. Full ownership and control of all exploration rights.",
    stat: String(PORTFOLIO.totals.licenses),
    statLabel: "Active Licenses",
    icon: <TrendingUp size={16} />,
  },
  {
    src: "/hero-byafossen-geology.jpg",
    alt: "Spectacular geological formations at Byafossen",
    location: "Advanced Technology",
    badge: "Scientific Excellence",
    headline: "Data-Driven",
    headlineAccent: "Exploration",
    subtitle: "Partnered with GeoVista AB and Sunnfjord Geo Center. XRF analysis, TEM surveys, and comprehensive geological mapping across all license areas.",
    stat: "70+",
    statLabel: "Elements Analyzed",
    icon: <Award size={16} />,
  },
  {
    src: "/project-mokk-mineral.jpg",
    alt: "High-grade mineral samples",
    location: "Proven Resources",
    badge: "Exceptional Grades",
    headline: "World-Class",
    headlineAccent: "Mineralization",
    subtitle: "Documented grades of 28.8% Zn, 7.95% Cu, 539 ppm Ag, and 10 ppm Au. Historic production confirms commercial viability.",
    stat: "28.8%",
    statLabel: "Peak Zinc Grade",
    icon: <TrendingUp size={16} />,
  },
  {
    src: "/hero-copper-minerals.jpg",
    alt: "Copper ore samples from exploration",
    location: "Critical Minerals",
    badge: "Green Transition + REE",
    headline: "Powering",
    headlineAccent: "Tomorrow's Economy",
    subtitle: "Copper, zinc, silver, gold + REE — essential metals for renewable energy, EVs, and high-tech manufacturing. Europe needs mineral independence.",
    stat: "8+",
    statLabel: "Mineral Types incl. REE",
    icon: <Award size={16} />,
  },
  {
    src: "/hero-skrattas-mine.jpg",
    alt: "Historic mine interior showing mineralization",
    location: "Mining Heritage",
    badge: "265 Years of History",
    headline: "Building on",
    headlineAccent: "Proven Legacy",
    subtitle: "50+ documented historic mines dating to 1760. We're not starting from scratch — we're continuing a story of mineral wealth.",
    stat: "50+",
    statLabel: "Historic Mines",
    icon: <Users size={16} />,
  },
];

const SLIDE_DURATION = 15000; // 15 seconds per slide for comfortable reading

export default function AboutHero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const [slideProgress, setSlideProgress] = useState(0);

  const nextSlide = useCallback(() => {
    setContentVisible(false);
    setIsTransitioning(true);
    setSlideProgress(0); // Reset progress
    
    // Longer delay for smoother content transition
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % aboutSlides.length);
      setIsTransitioning(false);
    }, 800);
    
    setTimeout(() => {
      setContentVisible(true);
    }, 1000);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    const slideTimer = setInterval(nextSlide, SLIDE_DURATION);
    
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + (100 / (SLIDE_DURATION / 100));
      });
    }, 100);
    
    return () => {
      clearInterval(slideTimer);
      clearInterval(progressInterval);
    };
  }, [nextSlide]);

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

  const slide = aboutSlides[currentSlide];

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] overflow-hidden">
      {/* Image Slider */}
      {aboutSlides.map((image, index) => (
        <div
          key={image.src}
          className={`
            absolute inset-0 z-0
            transition-opacity duration-[1500ms] ease-in-out
            ${index === currentSlide ? "opacity-100" : "opacity-0"}
          `}
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
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-brand-primary)]/85 via-[var(--color-brand-primary)]/70 to-[var(--color-brand-primary)]/95 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-primary)]/70 via-transparent to-transparent z-10" />
      
      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-earth-copper)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-earth-patina)]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center py-20 md:py-24 site-container">
        <div className="max-w-4xl">
          {/* Badge */}
          <div
            className={`
              transition-all duration-700 ease-out
              ${isLoaded && contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
            `}
            style={{ transitionDelay: "100ms" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 border border-[var(--color-earth-gold-bright)]/40 backdrop-blur-sm">
              {slide.icon}
              <span className="text-[var(--color-earth-gold-bright)] text-sm font-medium tracking-wide">
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
              href="/contact"
              variant="primary"
              size="lg"
              icon={<ArrowRight size={18} />}
              className="shadow-lg shadow-[var(--color-earth-copper)]/30"
            >
              Investor Inquiries
            </Button>
            <Button
              href="/projects"
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm"
            >
              View Projects
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div 
        className={`
          absolute bottom-8 left-1/2 -translate-x-1/2 z-20
          flex items-center gap-3
          transition-all duration-500
          ${isLoaded ? "opacity-100" : "opacity-0"}
        `}
      >
        {aboutSlides.map((image, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative flex items-center gap-2 transition-all duration-300"
            aria-label={`Go to slide ${index + 1}: ${image.location}`}
          >
            <div
              className={`
                h-1.5 rounded-full transition-all duration-500
                ${index === currentSlide 
                  ? "w-10 bg-[var(--color-earth-gold-bright)]" 
                  : "w-2.5 bg-white/30 hover:bg-white/50"
                }
              `}
            />
            
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
    </section>
  );
}

