"use client";

import { useEffect, useState, useRef } from "react";
import StatsCard from "../ui/StatsCard";
import AnimatedSection from "../ui/AnimatedSection";
import { MapPin, Mountain, Gem, FileCheck, Factory, Recycle, Pickaxe, Shield } from "lucide-react";
import { PORTFOLIO } from "@/lib/portfolio";

// Hook for intersection observer
function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

const stats = [
  {
    value: PORTFOLIO.totals.licenses,
    suffix: "",
    label: "Mining Licenses",
    description: "11 in Gaulstad-Mokk + 7 in Skrattås-Byafossen",
    icon: <FileCheck size={28} strokeWidth={1.5} />,
    variant: "default" as const,
  },
  {
    value: PORTFOLIO.totals.coverageKm2,
    suffix: " km²",
    label: "Exploration Area",
    description: "Strategic holdings in proven mineral districts",
    icon: <MapPin size={28} strokeWidth={1.5} />,
    variant: "featured" as const,
  },
  {
    value: 70,
    suffix: "+",
    label: "Elements Analyzed",
    description: "Cu, Zn, Au, Ag, Co, Ni + REE (Rare Earth Elements)",
    icon: <Gem size={28} strokeWidth={1.5} />,
    variant: "featured" as const,
  },
  {
    value: 50,
    suffix: "+",
    label: "Historic Mines",
    description: "Documented workings dating back to 1760",
    icon: <Mountain size={28} strokeWidth={1.5} />,
    variant: "default" as const,
  },
];

// REE data types
interface DependencyItem {
  value: string;
  label: string;
  description: string;
  percent: number;
}

interface TargetItem {
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  numValue: number;
}

interface REEData {
  elements: string[];
  dependency: DependencyItem[];
  euTargets2030: TargetItem[];
}

// REE data - merged section
const reeData: REEData = {
  elements: ["La", "Ce", "Nd", "Pr"],
  dependency: [
    { 
      value: "90%+", 
      label: "Control of Refining", 
      description: "China dominates the critical midstream, refining over 90% of the world's rare earths. This concentration creates significant supply chain vulnerabilities for Europe's green transition and strategic industries, leaving the EU exposed to potential supply disruptions.", 
      percent: 90 
    },
    { 
      value: "100%", 
      label: "EU Import Reliance", 
      description: "The EU currently imports 100% of its rare earth elements, with no domestic extraction. This complete dependency exposes Europe to geopolitical risks and supply disruptions in critical mineral supply chains, threatening the continent's strategic autonomy.", 
      percent: 100 
    },
    { 
      value: "5×", 
      label: "Demand Growth", 
      description: "EU demand for REEs in strategic technologies — electric vehicles, wind turbines, defense systems, and consumer electronics — is projected to increase 5 times by 2030. This exponential growth intensifies the urgency for developing domestic supply solutions and reducing import dependency.", 
      percent: 80 
    },
  ],
  euTargets2030: [
    { 
      value: "10%", 
      label: "Extraction", 
      description: "Domestic extraction to reduce import reliance.",
      icon: <Pickaxe size={18} />, 
      numValue: 10 
    },
    { 
      value: "40%", 
      label: "Processing", 
      description: "Domestic processing to build refining capacity.",
      icon: <Factory size={18} />, 
      numValue: 40 
    },
    { 
      value: "25%", 
      label: "Recycling", 
      description: "Recycling to create circular economy solutions.",
      icon: <Recycle size={18} />, 
      numValue: 25 
    },
  ],
};

// Animated REE Section Component
function REESection({ data }: { data: REEData }) {
  const { ref, isInView } = useInView(0.2);
  
  return (
    <AnimatedSection animation="fade-in-up" delay={500} className="mt-16">
      <div ref={ref} className="rounded-3xl overflow-hidden shadow-2xl shadow-black/20 border border-[#e8e2d6]/50">
        {/* Enhanced Header with gradient background */}
        <div className="relative bg-gradient-to-r from-[#f7f4ef] via-[#f5f2ec] to-[#f7f4ef] px-8 py-8 border-b-3 border-[#c9a227]/30 overflow-hidden">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#c9a227] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#1e5245] rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>
          
          <div className="relative flex flex-col items-center justify-center text-center">
            <h3 className={`text-3xl md:text-4xl font-display font-black text-[#1a1a1a] tracking-tight transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Europe&apos;s Race for Rare Earths
            </h3>
            <p className={`text-[#4a4a4a] text-xl md:text-2xl mt-2 font-medium transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              From <span className="text-[#8b4513] font-bold">Dependency</span> to <span className="text-[#1e5245] font-bold">Dominance</span>
            </p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2">
          {/* Left: The Critical Dependency */}
          <div className="bg-gradient-to-br from-[#f5f2ec] to-[#f0ede6] px-6 md:px-8 py-8 lg:border-r-3 border-b-3 lg:border-b-0 border-[#c9a227]/20 relative overflow-hidden">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-[0.02]">
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #c9a227 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            </div>
            
            <div className="relative z-10">
              <h4 className={`text-xl md:text-2xl font-bold text-[#2a2a2a] mb-6 text-center transition-all duration-500 delay-200 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
                The Critical Dependency
              </h4>
              
              <div className="space-y-5">
                {data.dependency.map((item, index) => (
                  <div 
                    key={item.label} 
                    className={`group bg-white rounded-2xl p-5 shadow-lg shadow-black/10 border-2 border-[#e0dbd2] transition-all duration-500 hover:shadow-xl hover:scale-[1.02] hover:border-[#c9a227]/50 hover:-translate-y-1 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                    style={{ transitionDelay: `${300 + index * 150}ms` }}
                  >
                    <div className="flex items-start gap-5">
                      {/* Enhanced Donut Chart - Larger with proper text spacing */}
                      <div className="relative flex-shrink-0 w-28 h-28">
                        {/* Outer glow effect */}
                        <div className={`absolute -inset-2 rounded-full bg-gradient-to-br from-[#c9a227]/30 to-[#a8861e]/15 blur-lg transition-all duration-1000 group-hover:blur-xl ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} style={{ transitionDelay: `${400 + index * 200}ms` }} />
                        
                        {/* Shadow layer */}
                        <div className="absolute inset-0 rounded-full shadow-xl shadow-[#c9a227]/25" />
                        
                        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90 relative z-10" style={{ filter: 'drop-shadow(0 4px 8px rgba(201, 162, 39, 0.3))' }}>
                          <defs>
                            <linearGradient id={`bg-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#f5f2ec" />
                              <stop offset="100%" stopColor="#e8e2d6" />
                            </linearGradient>
                            <linearGradient id={`progress-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#c9a227" />
                              <stop offset="50%" stopColor="#d4af37" />
                              <stop offset="100%" stopColor="#f5c842" />
                              <stop offset="100%" stopColor="#a8861e" />
                            </linearGradient>
                            <filter id={`glow-${index}`}>
                              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                              <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>
                          
                          {/* Background circle */}
                          <circle 
                            cx="60" 
                            cy="60" 
                            r="45" 
                            fill="none" 
                            stroke={`url(#bg-gradient-${index})`}
                            strokeWidth="14"
                            className="opacity-50"
                          />
                          
                          {/* Progress arc with gradient and glow */}
                          <circle
                            cx="60"
                            cy="60"
                            r="45"
                            fill="none"
                            stroke={`url(#progress-gradient-${index})`}
                            strokeWidth="14"
                            strokeLinecap="round"
                            filter={`url(#glow-${index})`}
                            className="transition-all duration-1000 ease-out"
                            style={{ 
                              strokeDasharray: `${isInView ? item.percent * 2.83 : 0} 283`,
                              transitionDelay: `${500 + index * 200}ms`
                            }}
                          />
                        </svg>
                        
                        {/* Center value - positioned with proper spacing */}
                        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} style={{ transitionDelay: `${700 + index * 200}ms` }}>
                          <div className="text-center px-2">
                            <span className="text-2xl md:text-3xl font-display font-black text-[#c9a227] leading-none block" style={{ textShadow: '0 2px 4px rgba(201, 162, 39, 0.3)' }}>
                              {item.value}
                            </span>
                          </div>
                        </div>
                        
                        {/* Inner highlight ring */}
                        <div className={`absolute inset-3 rounded-full border-2 border-[#c9a227]/30 transition-all duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${600 + index * 200}ms` }} />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="font-bold text-[#1a1a1a] text-lg mb-2">{item.label}</div>
                        <p className="text-[#555] text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Enhanced Warning callout */}
              <div className={`mt-6 p-4 bg-gradient-to-r from-[#fff8e6] to-[#fffbf0] rounded-xl border-l-4 border-[#c9a227] shadow-md transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '800ms' }}>
                <p className="text-[#8b6914] text-sm font-semibold leading-relaxed">
                  ⚠️ Soaring Demand, Increasing Risk — EU demand for REEs in strategic technologies is projected to increase <span className="font-black text-[#c9a227]">5× by 2030</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Right: The European Response */}
          <div className="bg-gradient-to-br from-[#f0f5f3] via-[#e8f0ec] to-[#dfe8e3] px-6 md:px-8 py-8 relative overflow-hidden">
            {/* Enhanced animated decorative branch pattern */}
            <div className={`absolute top-0 right-0 w-40 h-40 transition-all duration-1000 ${isInView ? 'opacity-15 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M80 10 Q60 30 50 50 T30 90" fill="none" stroke="#1e5245" strokeWidth="2.5" style={{ strokeDasharray: 200, strokeDashoffset: isInView ? 0 : 200, transition: 'stroke-dashoffset 2s ease-in-out' }}/>
                <path d="M90 20 Q70 40 60 60 T40 100" fill="none" stroke="#1e5245" strokeWidth="2"/>
                <path d="M70 0 Q50 20 40 40" fill="none" stroke="#1e5245" strokeWidth="1.5"/>
              </svg>
            </div>
            
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-[0.02]">
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #1e5245 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            </div>
            
            <div className="relative z-10">
              <h4 className={`text-xl md:text-2xl font-bold text-[#2a2a2a] mb-6 text-center transition-all duration-500 delay-200 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
                The European Response
              </h4>

              {/* Enhanced Critical Raw Materials Act Card */}
              <div className={`group bg-white rounded-2xl p-5 shadow-lg shadow-black/10 border-2 border-[#c8d8d0] mb-5 transition-all duration-500 hover:shadow-xl hover:scale-[1.01] hover:border-[#1e5245]/50 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ transitionDelay: '400ms' }}>
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-[#1e5245] to-[#2d7a65] flex items-center justify-center flex-shrink-0 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${isInView ? 'rotate-0 scale-100' : 'rotate-12 scale-75'}`} style={{ transitionDelay: '500ms' }}>
                    <Shield size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-[#1a1a1a] text-lg mb-2">The Critical Raw Materials Act</h5>
                    <p className="text-[#555] text-sm leading-relaxed">
                      EU strategic plan to build a secure and resilient domestic supply chain, reducing dependency on third countries for critical raw materials.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#f0f5f3] to-[#e8f0ec] rounded-xl p-4 border-2 border-[#d8e4df]">
                  <div className="text-xs uppercase tracking-widest text-[#1e5245] font-black mb-3 flex items-center gap-2">
                    <div className="w-1 h-4 bg-[#1e5245] rounded-full" />
                    2030 Targets
                  </div>
                  <div className="space-y-4">
                    {data.euTargets2030.map((target, tIndex) => (
                      <div key={target.label} className="group/target">
                        <div className="flex items-start gap-4 mb-2">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-[#1e5245] to-[#2d7a65] flex items-center justify-center text-white shadow-md transition-all duration-300 group-hover/target:scale-110 group-hover/target:rotate-3 flex-shrink-0 ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${600 + tIndex * 100}ms` }}>
                            {target.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[#2a2a2a] text-sm font-semibold">{target.label}</span>
                              <span className={`text-lg font-black text-[#1e5245] transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${700 + tIndex * 100}ms` }}>{target.value}</span>
                            </div>
                            <p className="text-[#555] text-xs leading-relaxed mb-2">{target.description}</p>
                            <div className="w-full h-3 bg-[#d8e4df] rounded-full overflow-hidden shadow-inner">
                              <div 
                                className="h-full bg-gradient-to-r from-[#1e5245] via-[#2d7a65] to-[#1e5245] rounded-full transition-all duration-1000 ease-out shadow-sm"
                                style={{ 
                                  width: isInView ? target.value : '0%',
                                  transitionDelay: `${800 + tIndex * 150}ms`,
                                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Norway Highlight Card */}
              <div className={`group bg-gradient-to-br from-[#0f2a22] via-[#1a3d30] to-[#0f2a22] rounded-2xl p-5 text-white relative overflow-hidden shadow-xl shadow-black/30 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] border-2 border-[#c9a227]/20 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '900ms' }}>
                {/* Enhanced animated glow effects */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#c9a227]/40 rounded-full blur-3xl transition-all duration-1000 ${isInView ? 'animate-pulse scale-100' : 'scale-0'}`} />
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#c9a227]/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '500ms' }} />
                <div className="absolute top-0 left-0 w-20 h-20 bg-[#1e5245]/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1000ms' }} />
                
                <div className="relative z-10">
                  <div className="flex items-start gap-5 mb-3">
                    <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c9a227] via-[#d4af37] to-[#a8861e] flex items-center justify-center shadow-xl shadow-[#c9a227]/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${isInView ? 'rotate-0 scale-100' : '-rotate-12 scale-75'}`} style={{ transitionDelay: '1000ms' }}>
                      <Mountain size={32} className="text-[#0f2a22]" />
                    </div>
                    <div className="flex-1">
                      <div className={`text-4xl font-display font-black text-[#c9a227] drop-shadow-lg transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1100ms', textShadow: '0 2px 8px rgba(201, 162, 39, 0.5)' }}>8.8 Mt</div>
                      <div className="text-white font-bold text-lg mt-1">Unlocking Domestic Resources</div>
                      <div className="text-white/80 text-sm mt-1">Europe&apos;s largest REE deposit — Fen, Norway</div>
                    </div>
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Europe&apos;s largest REE deposit discovery in Fen, Norway positions the EU to reduce import dependency and build resilient supply chains for the green transition.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer CTA */}
        <div className="relative bg-gradient-to-r from-[#0f2a22] via-[#1a3d30] to-[#0f2a22] px-8 py-5 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#c9a227] rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-[#1e5245] rounded-full blur-2xl" />
          </div>
          
          <div className="relative flex items-center justify-center text-center">
            <p className={`text-white text-base font-medium transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1200ms' }}>
              <span className="text-[#c9a227] font-bold text-lg">Pure Minerals</span> is positioned to contribute to Europe&apos;s mineral independence through strategic REE exploration in Norway.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

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

        {/* REE Strategic Section - Rich Infographic Style */}
        <REESection data={reeData} />

        {/* Bottom accent line */}
        <AnimatedSection animation="fade-in-up" delay={700} className="mt-16 md:mt-20">
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
