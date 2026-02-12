"use client";

import Image from "next/image";
import AnimatedSection from "../components/ui/AnimatedSection";
import Button from "../components/ui/Button";
import ImageCard from "../components/cards/ImageCard";
import AboutHero from "../components/about/AboutHero";
import GoldDivider from "../components/ui/GoldDivider";
import ScrollTimeline from "../components/ui/ScrollTimeline";
import {
  Target,
  Compass,
  Shield,
  Users,
  ArrowRight,
  TrendingUp,
  Award,
  Globe,
  FileCheck,
  Zap,
  MapPin,
  CheckCircle,
  Gem,
  Mountain,
  ExternalLink,
  Link as LinkIcon,
  Building,
  FlaskConical,
  Search,
  Rocket,
} from "lucide-react";
import { PORTFOLIO } from "@/lib/portfolio";

const investmentHighlights = [
  {
    value: String(PORTFOLIO.totals.coverageKm2),
    unit: "km²",
    label: "Exploration Area",
    description: "Strategic license holdings in proven mineral districts",
  },
  {
    value: String(PORTFOLIO.totals.licenses),
    unit: "",
    label: "Mining Licenses",
    description: "11 in Gaulstad-Mokk + 7 in Skrattås-Byafossen",
  },
  {
    value: "70+",
    unit: "",
    label: "Elements Analyzed",
    description: "Including Cu, Zn, Au, Ag, REE & precious metals",
  },
  {
    value: "50+",
    unit: "",
    label: "Historic Mines",
    description: "Documented workings dating back to 1760",
  },
];

const values = [
  {
    icon: <Target size={28} />,
    title: "Precision Exploration",
    description: "Advanced geological surveys using XRF analysis and TEM technology ensure accurate resource identification and minimize exploration risk.",
  },
  {
    icon: <Compass size={28} />,
    title: "Technology Leadership",
    description: "First-mover advantage in blockchain-based asset tokenization through NorChain partnership, enabling transparent and accessible investment.",
  },
  {
    icon: <Shield size={28} />,
    title: "ESG Commitment",
    description: "Environmentally responsible practices aligned with Norwegian regulations and global sustainability standards.",
  },
  {
    icon: <Users size={28} />,
    title: "Strategic Partnerships",
    description: "Strong relationships with regulatory bodies, local communities, and industry experts.",
  },
];

// Mineral occurrence data from geological surveys
const mineralData = [
  { element: "Copper (Cu)", mokk: "7.95%", skrattas: "7.01%", unit: "%", highlight: true },
  { element: "Zinc (Zn)", mokk: "1.24%", skrattas: "28.8%", unit: "%", highlight: true },
  { element: "Lead (Pb)", mokk: "0.005%", skrattas: "9%", unit: "%", highlight: false },
  { element: "Silver (Ag)", mokk: "12.45", skrattas: "539", unit: "ppm", highlight: true },
  { element: "Gold (Au)", mokk: "0.05", skrattas: "10.01", unit: "ppm", highlight: true },
  { element: "Nickel (Ni)", mokk: "225", skrattas: "49.5", unit: "ppm", highlight: false },
  { element: "Cobalt (Co)", mokk: "840", skrattas: "29", unit: "ppm", highlight: false },
];

// NorChain Tokenization Timeline
const norchainTimeline = [
  {
    phase: "Phase 1",
    title: "Partnership Formation",
    status: "completed",
    date: "Q4 2024",
    items: [
      "Strategic partnership with NorChain established",
      "Legal framework and compliance review",
      "Asset valuation and tokenization structure",
    ],
  },
  {
    phase: "Phase 2",
    title: "Token Development",
    status: "in-progress",
    date: "Q1 2025",
    items: [
      "Smart contract development and audit",
      "Token economics finalization",
      "Regulatory approval process",
    ],
  },
  {
    phase: "Phase 3",
    title: "Platform Integration",
    status: "upcoming",
    date: "Q2 2025",
    items: [
      "NorChain platform integration",
      "Investor dashboard development",
      "Beta testing with select investors",
    ],
  },
  {
    phase: "Phase 4",
    title: "Public Launch",
    status: "upcoming",
    date: "Q3 2025",
    items: [
      "Public token offering",
      "Secondary market trading",
      "Ongoing reporting and transparency",
    ],
  },
];

const marketOpportunity = [
  {
    icon: <TrendingUp size={24} />,
    title: "Growing Demand",
    stat: "300%",
    description: "Projected increase in copper demand by 2050 for green energy transition",
  },
  {
    icon: <Globe size={24} />,
    title: "European Supply Gap",
    stat: "€2.5B",
    description: "Annual EU critical minerals import dependency",
  },
  {
    icon: <Award size={24} />,
    title: "Norwegian Advantage",
    stat: "AAA",
    description: "Stable regulatory environment with world-class mining standards",
  },
];

const strategicAdvantages = [
  {
    icon: <MapPin size={24} />,
    title: "Prime Location",
    items: [
      "Historic Trøndelag mining district",
      "Proven geology with past production",
      "Strong infrastructure access",
    ],
  },
  {
    icon: <FileCheck size={24} />,
    title: "Regulatory Strength",
    items: [
      "All permits and licenses secured",
      "Full compliance with Norwegian law",
      "Strong government support for mining",
    ],
  },
  {
    icon: <Zap size={24} />,
    title: "Innovation Edge",
    items: [
      "NorChain blockchain tokenization",
      "Modern exploration technology",
      "Data-driven decision making",
    ],
  },
];

const minerals = [
  { name: "Copper", symbol: "Cu", color: "bg-[#b87333]", grade: "Up to 7.95%", featured: false },
  { name: "Zinc", symbol: "Zn", color: "bg-[#7c8b99]", grade: "Up to 28.8%", featured: false },
  { name: "Gold", symbol: "Au", color: "bg-[#f0c878]", grade: "Up to 10 ppm", featured: false },
  { name: "Silver", symbol: "Ag", color: "bg-[#c4cdd5]", grade: "Up to 539 ppm", featured: false },
  { name: "Lead", symbol: "Pb", color: "bg-[#5a6169]", grade: "Up to 9%", featured: false },
  { name: "REE", symbol: "La+", color: "bg-gradient-to-r from-[var(--color-earth-patina)] to-[var(--color-earth-copper)]", grade: "Strategic Target", featured: true },
];

export default function AboutPage() {
  return (
    <main className="bg-[var(--color-background)]">
      {/* Hero Section with Slider */}
      <AboutHero />

      {/* Investment Highlights - Key Stats */}
      <section className="py-16 bg-white border-b border-[var(--color-neutral-200)]">
        <div className="site-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {investmentHighlights.map((item, index) => (
              <AnimatedSection
                key={item.label}
                animation="fade-in-up"
                delay={index * 100}
              >
                <div className="text-center p-6 rounded-2xl bg-[var(--color-neutral-50)] border border-[var(--color-neutral-200)] hover:border-[var(--color-earth-copper)]/40 hover:shadow-lg transition-all">
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-4xl md:text-5xl font-display font-bold text-[var(--color-brand-primary)]">
                      {item.value}
                    </span>
                    {item.unit && (
                      <span className="text-xl font-semibold text-[var(--color-earth-copper)]">
                        {item.unit}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-earth-copper)] mb-1">
                    {item.label}
                  </h3>
                  <p className="text-sm text-[var(--color-neutral-500)]">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Investment Thesis Section */}
      <section className="py-20 md:py-28 bg-[var(--color-brand-primary)] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-earth-copper)]/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-earth-patina)]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        <div className="site-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection animation="slide-in-left">
              <span className="section-badge section-badge--bordered border-[var(--color-earth-gold-bright)]/40 text-[var(--color-earth-gold-bright)] mb-4">
                Why Invest
              </span>
              <h2 className="display-3 text-white mb-6">
                A Compelling{" "}
                <span className="text-[var(--color-earth-gold-bright)]">Investment Thesis</span>
              </h2>
              <div className="space-y-5 text-white/80 body-large leading-relaxed">
                <p>
                  Pure Minerals represents a <strong className="text-[var(--color-earth-gold-bright)]">ground-floor opportunity</strong> in 
                  one of Europe&apos;s most stable mining jurisdictions. Our strategic 
                  license portfolio covers historic mining districts with proven mineralization.
                </p>
                <p>
                  With the global push toward electrification and renewable energy, 
                  demand for copper and other base metals is projected to surge. 
                  Norway offers <strong className="text-[var(--color-earth-gold-bright)]">political stability</strong>, 
                  world-class infrastructure, and supportive regulatory frameworks.
                </p>
                <p>
                  Our partnership with <strong className="text-[var(--color-earth-gold-bright)]">NorChain</strong> enables 
                  tokenized asset ownership, providing unprecedented transparency and 
                  accessibility for investors worldwide.
                </p>
              </div>
              
              {/* Mineral badges */}
              <div className="mt-8 flex flex-wrap gap-3">
                {minerals.map((mineral) => (
                  <div
                    key={mineral.symbol}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20"
                  >
                    <span className={`w-3 h-3 rounded-full ${mineral.color}`} />
                    <span className="font-semibold text-white">
                      {mineral.name}
                    </span>
                    <span className="text-white/60 text-sm">
                      ({mineral.symbol})
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Button href="/projects" variant="primary" icon={<ArrowRight size={18} />} className="bg-[var(--color-earth-gold-bright)] hover:bg-[var(--color-earth-gold-warm)] text-[var(--color-brand-primary)]">
                  Explore Our Projects
                </Button>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-right" delay={200}>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                  <Image
                    src="/copper-minerals.jpg"
                    alt="Copper mineral samples from exploration sites"
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Floating stat cards */}
                <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-earth-copper)]/10 flex items-center justify-center">
                      <Mountain size={24} className="text-[var(--color-earth-copper)]" />
                    </div>
                    <div>
                      <div className="text-2xl font-display font-bold text-[var(--color-brand-primary)]">
                        {PORTFOLIO.totals.coverageKm2} km²
                      </div>
                      <div className="text-xs text-[var(--color-neutral-500)] uppercase tracking-wider">
                        Exploration Area
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 bg-[var(--color-earth-gold-bright)] p-4 rounded-xl shadow-xl">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-[var(--color-brand-primary)]" />
                    <span className="font-semibold text-[var(--color-brand-primary)]">
                      {PORTFOLIO.totals.licenses} Licenses
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Market Opportunity Section */}
      <section className="py-20 bg-[var(--color-neutral-100)]">
        <div className="site-container">
          <AnimatedSection animation="fade-in-up" className="text-center mb-16">
            <span className="section-badge section-badge--filled mb-4">
              Market Opportunity
            </span>
            <h2 className="display-3 text-[var(--color-brand-primary)] mb-4">
              The Right Time to{" "}
              <span className="text-[var(--color-earth-copper)]">Invest</span>
            </h2>
            <p className="lead text-[var(--color-neutral-600)] max-w-2xl mx-auto">
              Global megatrends are driving unprecedented demand for base metals
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {marketOpportunity.map((item, index) => (
              <AnimatedSection
                key={item.title}
                animation="fade-in-up"
                delay={index * 100}
              >
                <div className="relative p-8 rounded-2xl bg-white border border-[var(--color-neutral-200)] hover:border-[var(--color-earth-copper)]/40 hover:shadow-xl transition-all group h-full">
                  <div className="w-14 h-14 rounded-xl bg-[var(--color-earth-copper)]/10 flex items-center justify-center text-[var(--color-earth-copper)] mb-6 group-hover:bg-[var(--color-earth-copper)]/20 transition-colors">
                    {item.icon}
                  </div>
                  <div className="text-4xl font-display font-bold text-[var(--color-earth-copper)] mb-2">
                    {item.stat}
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--color-brand-primary)] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[var(--color-neutral-600)]">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Mineral Occurrences Data Section */}
      <section className="py-20 md:py-28 bg-[var(--color-brand-primary)] overflow-hidden relative">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[var(--color-earth-copper)]/10 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--color-earth-patina)]/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        <div className="site-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Scattered Image Collage */}
            <AnimatedSection animation="slide-in-left">
              <div className="relative h-[500px] md:h-[600px]">
                {/* Image 1 - Top left, slight rotation */}
                <div
                  className="absolute top-0 left-0 w-[60%] h-52 md:h-64 rounded-2xl overflow-hidden shadow-2xl border-[6px] border-white hover:z-20 hover:scale-105 transition-all duration-500 group cursor-pointer"
                  style={{ transform: 'rotate(-3deg)' }}
                >
                  <Image
                    src="/mokk-geology.jpg"
                    alt="Geological samples from Mokk"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Mokk Geology
                  </div>
                </div>

                {/* Image 2 - Top right, overlapping */}
                <div
                  className="absolute top-16 right-0 w-[55%] h-48 md:h-56 rounded-2xl overflow-hidden shadow-2xl border-[6px] border-white hover:z-20 hover:scale-105 transition-all duration-500 group cursor-pointer"
                  style={{ transform: 'rotate(2deg)' }}
                >
                  <Image
                    src="/bjonsas-mineral.jpg"
                    alt="Mineral samples from Bjønsås"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Bjønsås Minerals
                  </div>
                </div>

                {/* Image 3 - Middle left */}
                <div
                  className="absolute top-[55%] left-8 w-[50%] h-44 md:h-52 rounded-2xl overflow-hidden shadow-2xl border-[6px] border-white hover:z-20 hover:scale-105 transition-all duration-500 group cursor-pointer"
                  style={{ transform: 'rotate(-1deg)' }}
                >
                  <Image
                    src="/copper-minerals-2.jpg"
                    alt="Copper mineral specimens"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Copper Specimens
                  </div>
                </div>

                {/* Image 4 - Bottom right */}
                <div
                  className="absolute bottom-0 right-4 w-[55%] h-48 md:h-56 rounded-2xl overflow-hidden shadow-2xl border-[6px] border-white hover:z-20 hover:scale-105 transition-all duration-500 group cursor-pointer"
                  style={{ transform: 'rotate(1deg)' }}
                >
                  <Image
                    src="/mokk-mineral.jpg"
                    alt="Mokk mineral samples"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Mokk Minerals
                  </div>
                </div>

                {/* Image 5 - Center accent, overlapping others */}
                <div
                  className="absolute top-[40%] left-[35%] w-[35%] h-36 md:h-44 rounded-2xl overflow-hidden shadow-2xl border-[6px] border-white hover:z-20 hover:scale-110 transition-all duration-500 group cursor-pointer z-10"
                  style={{ transform: 'rotate(-4deg)' }}
                >
                  <Image
                    src="/copper-minerals.jpg"
                    alt="Copper ore samples"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Copper Ore
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Right: Data Table */}
            <AnimatedSection animation="slide-in-right" delay={200} className="relative z-10">
              <span className="section-badge section-badge--bordered border-[var(--color-earth-gold-bright)]/40 text-[var(--color-earth-gold-bright)] mb-4">
                Geological Data
              </span>
              <h2 className="display-3 text-white mb-4">
                Proven Mineral{" "}
                <span className="text-[var(--color-earth-gold-bright)]">Occurrences</span>
              </h2>
              <p className="lead text-white/70 mb-8">
                Over 70 elements analyzed across our license areas, with exceptional grades in key minerals.
              </p>

              {/* Data Table */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                <div className="grid grid-cols-4 bg-[var(--color-earth-copper)] text-white text-sm font-bold">
                  <div className="p-4">Element</div>
                  <div className="p-4 text-center">Mokk</div>
                  <div className="p-4 text-center">Skrattås</div>
                  <div className="p-4 text-center">Unit</div>
                </div>
                {mineralData.map((row, index) => (
                  <div 
                    key={row.element}
                    className={`grid grid-cols-4 text-sm border-t border-[var(--color-neutral-200)] ${
                      row.highlight ? 'bg-[var(--color-earth-copper)]/5' : ''
                    } ${index % 2 === 0 ? '' : 'bg-[var(--color-neutral-50)]'}`}
                  >
                    <div className={`p-4 font-semibold ${row.highlight ? 'text-[var(--color-earth-copper)]' : 'text-[var(--color-brand-primary)]'}`}>
                      {row.element}
                    </div>
                    <div className="p-4 text-center text-[var(--color-neutral-600)]">{row.mokk}</div>
                    <div className={`p-4 text-center font-semibold ${row.highlight ? 'text-[var(--color-earth-copper)]' : 'text-[var(--color-neutral-600)]'}`}>
                      {row.skrattas}
                    </div>
                    <div className="p-4 text-center text-[var(--color-neutral-500)]">{row.unit}</div>
                  </div>
                ))}
              </div>

              {/* Highlight box */}
              <div className="mt-6 p-5 rounded-xl bg-[var(--color-earth-gold-bright)]/20 border border-[var(--color-earth-gold-bright)]/30">
                <div className="flex items-start gap-3">
                  <Gem size={24} className="text-[var(--color-earth-gold-bright)] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-1">
                      <span className="text-[var(--color-earth-gold-bright)]">Historic Production</span>
                    </h4>
                    <p className="text-sm text-white/80">
                      Skrattås produced ore grading <strong className="text-[var(--color-earth-gold-bright)]">34% Zn, 10.4% Pb, 1.9% Cu</strong> during 1979-1981. 
                      Mineralization continues below 80m depth.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Strategic Advantages */}
      <section className="py-20 md:py-28 bg-white">
        <div className="site-container">
          <AnimatedSection animation="fade-in-up" className="text-center mb-16">
            <span className="section-badge section-badge--filled mb-4">
              Competitive Edge
            </span>
            <h2 className="display-3 text-[var(--color-brand-primary)] mb-4">
              Strategic{" "}
              <span className="text-[var(--color-earth-copper)]">Advantages</span>
            </h2>
            <p className="lead text-[var(--color-neutral-600)] max-w-2xl mx-auto">
              What sets Pure Minerals apart in the exploration sector
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {strategicAdvantages.map((advantage, index) => (
              <AnimatedSection
                key={advantage.title}
                animation="fade-in-up"
                delay={index * 100}
              >
                <div className="p-8 rounded-2xl bg-[var(--color-neutral-50)] border border-[var(--color-neutral-200)] hover:border-[var(--color-earth-copper)]/40 hover:shadow-xl transition-all h-full group">
                  <div className="w-14 h-14 rounded-xl bg-[var(--color-earth-copper)]/10 flex items-center justify-center text-[var(--color-earth-copper)] mb-6 group-hover:bg-[var(--color-earth-copper)] group-hover:text-white transition-colors">
                    {advantage.icon}
                  </div>
                  <h3 className="text-xl font-display font-bold text-[var(--color-brand-primary)] mb-4">
                    {advantage.title}
                  </h3>
                  <ul className="space-y-3">
                    {advantage.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle size={18} className="text-[var(--color-earth-patina)] mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--color-neutral-600)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Values Section */}
      <section className="py-16 md:py-20 bg-[var(--color-brand-primary)] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-[var(--color-earth-copper)]/8 rounded-full blur-3xl" />
        
        <div className="site-container relative z-10">
          <AnimatedSection animation="fade-in-up" className="text-center mb-10 md:mb-16">
            <span className="section-badge section-badge--bordered border-[var(--color-earth-gold-bright)]/50 text-[var(--color-earth-gold-bright)] mb-4">
              Our Values
            </span>
            <h2 className="display-3 text-white mb-4">
              <span className="text-white">Guiding</span>{" "}
              <span className="text-[var(--color-earth-gold-bright)]">Principles</span>
            </h2>
            <p className="lead text-white/80 max-w-2xl mx-auto px-4">
              Excellence and integrity in everything we do
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {values.map((value, index) => (
              <AnimatedSection
                key={value.title}
                animation="fade-in-up"
                delay={index * 100}
              >
                <div className="bg-white p-5 md:p-6 rounded-2xl shadow-lg h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[var(--color-earth-copper)]/10 flex items-center justify-center text-[var(--color-earth-copper)] mb-4 md:mb-5 group-hover:bg-[var(--color-earth-copper)] group-hover:text-white transition-colors duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-base md:text-lg font-display font-bold text-[var(--color-brand-primary)] mb-2 md:mb-3">
                    {value.title}
                  </h3>
                  <p className="text-[var(--color-neutral-600)] text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Timeline Section - Scroll Animated */}
      <section className="bg-[var(--color-neutral-100)] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[var(--color-earth-copper)]/5 rounded-full blur-3xl" />
        
        <ScrollTimeline
          badge="Our Journey"
          title="From Discovery to Tokenization"
          description="265 years of mineral heritage, now powered by blockchain innovation"
          entries={[
            {
              icon: Mountain,
              title: "1760",
              subtitle: "First Discovery",
              description: "Major copper ore discovered at Gruvfjellet plateau. Gaulstad No. 1 mine operational by 1764, marking the beginning of commercial mining in the Trøndelag region.",
              image: "/mokk-gruvfjellet.jpg",
              items: [
                "Major copper ore discovered at Gruvfjellet",
                "Gaulstad No. 1 mine operational by 1764",
                "50+ historic mines documented over 265 years",
                "Commercial mining established in Trøndelag"
              ],
            },
            {
              icon: Building,
              title: "2021",
              subtitle: "Pure Minerals Founded",
              description: "Company established to explore and develop mineral deposits in Trøndelag County. Our mission: unlock Norway's mineral potential through modern exploration techniques.",
              image: "/skrattas-overview.jpg",
              items: [
                "Norwegian company registered (NO 928 309 231)",
                "Focus on Trøndelag mineral deposits",
                "Modern exploration methodology adopted",
                "Expert geological team assembled"
              ],
            },
            {
              icon: FileCheck,
              title: "2022",
              subtitle: "License Acquisition",
              description: "Secured 19 mining licenses covering 189 km² in two premier districts: 11 in Gaulstad-Mokk + 7 in Skrattås-Byafossen.",
              image: "/gaulstad-mokk-map.jpg",
              highlight: true,
              items: [
                "19 mining licenses acquired",
                "189 km² total exploration area",
                "11 licenses in Gaulstad-Mokk district",
                "7 licenses in Skrattås-Byafossen district"
              ],
              button: {
                url: "/projects",
                text: "View License Areas"
              }
            },
            {
              icon: Search,
              title: "2023",
              subtitle: "Geological Mapping",
              description: "Engaged Sunnfjord Geo Center AS and GeoVista AB for high-performance geological surveys using cutting-edge TEM technology and XRF analysis.",
              image: "/tem-study.jpg",
              items: [
                "Partnership with Sunnfjord Geo Center AS",
                "TEM surveys across all license areas",
                "Comprehensive geological mapping completed",
                "Historical data integration and analysis"
              ],
            },
            {
              icon: FlaskConical,
              title: "2024",
              subtitle: "Advanced Exploration",
              description: "Comprehensive XRF measurements, sampling, and geochemical analysis across all license areas. Over 70 elements analyzed with exceptional results.",
              image: "/copper-minerals.jpg",
              highlight: true,
              items: [
                "70+ elements analyzed per sample",
                "High-grade copper (7.95%) at Mokk",
                "Exceptional zinc (28.8%) at Skrattås",
                "Silver (539 ppm) and gold (10 ppm) confirmed"
              ],
            },
            {
              icon: LinkIcon,
              title: "Q4 2024",
              subtitle: "NorChain Partnership",
              description: "Strategic partnership formed with NorChain for blockchain tokenization of mineral assets. Bringing transparency and accessibility to mineral exploration investment.",
              image: "/norchain-logo.png",
              highlight: true,
              items: [
                "Strategic blockchain partnership established",
                "Asset tokenization framework developed",
                "Transparent investment structure created",
                "Digital verification system implemented"
              ],
            },
            {
              icon: Rocket,
              title: "2025",
              subtitle: "Token Launch & Deep Drilling",
              description: "Deep drilling strategy implementation and public tokenized asset offering. The future of mineral exploration investment is here.",
              image: "/skrattas-mine-1.jpg",
              highlight: true,
              items: [
                "Q2: Deep drilling campaign begins",
                "Q3: Tokenized asset offering launch",
                "Resource estimation and verification",
                "Investor portal and dashboard launch"
              ],
              button: {
                url: "/contact",
                text: "Get Early Access"
              }
            },
          ]}
        />
      </section>

      <GoldDivider />

      {/* Expertise Section */}
      <section className="py-20 bg-[var(--color-brand-primary)]">
        <div className="site-container">
          <AnimatedSection animation="fade-in-up" className="text-center mb-16">
            <span className="section-badge section-badge--bordered border-[var(--color-earth-gold-bright)]/40 text-[var(--color-earth-gold-bright)] mb-4">
              Our Expertise
            </span>
            <h2 className="display-3 text-on-dark mb-4">
              Geological Excellence
            </h2>
            <p className="lead text-on-dark-muted max-w-2xl mx-auto">
              Combining proven methodology with cutting-edge technology
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            <AnimatedSection animation="fade-in-up" delay={0}>
              <ImageCard
                title="Strategic License Areas"
                content={`18 licenses covering ${PORTFOLIO.totals.coverageKm2} km² across Gaulstad-Mokk and Skrattås-Byafossen districts with documented commercial mineralization.`}
                imageUrl="/gaulstad-mokk-map.jpg"
                alt="Gaulstad-Mokk license area map"
                variant="dark"
              />
            </AnimatedSection>

            <AnimatedSection animation="fade-in-up" delay={100}>
              <ImageCard
                title="Proven Mineral Wealth"
                content="Exceptional grades: Skrattås shows 28.8% Zn, 539 ppm Ag, 10 ppm Au. Mokk shows 7.95% Cu. Over 50 historic mines documented."
                imageUrl="/mokk-mineral.jpg"
                alt="Mokk mineral samples"
                variant="dark"
              />
            </AnimatedSection>

            <AnimatedSection animation="fade-in-up" delay={200}>
              <ImageCard
                title="Advanced Technology"
                content="TEM surveys, XRF analysis, and comprehensive geochemical testing. Over 70 elements analyzed with cutting-edge geological methods."
                imageUrl="/tem-study.jpg"
                alt="TEM geophysical survey"
                variant="dark"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* NorChain Tokenization Timeline */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-earth-copper)]/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-earth-patina)]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

        <div className="site-container relative z-10">
          {/* Header */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <AnimatedSection animation="slide-in-left">
              <span className="section-badge section-badge--filled mb-4">
                Blockchain Innovation
              </span>
              <h2 className="display-3 text-[var(--color-brand-primary)] mb-6">
                Tokenized on{" "}
                <span className="text-[var(--color-earth-copper)]">NorChain</span>
              </h2>
              <p className="lead text-[var(--color-neutral-600)] mb-6">
                We&apos;ve partnered with NorChain to bring transparency and accessibility 
                to mineral exploration through blockchain technology.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Transparent ownership records on blockchain",
                  "Fractional investment opportunities",
                  "Real-time asset tracking and verification",
                  "Secure, compliant tokenization framework",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-[var(--color-earth-patina)] flex-shrink-0" />
                    <span className="text-[var(--color-neutral-700)]">{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                href="https://norchain.org"
                external
                variant="primary"
                icon={<ExternalLink size={18} />}
              >
                Learn About NorChain
              </Button>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-right" delay={200}>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-[var(--color-brand-primary)]/5 border border-[var(--color-brand-primary)]/10 flex items-center justify-center">
                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-[var(--color-brand-primary)]/10 border border-[var(--color-brand-primary)]/20 flex items-center justify-center">
                      <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-2xl">
                        <Image
                          src="/norchain-logo.png"
                          alt="NorChain"
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 px-3 py-1.5 md:px-4 md:py-2 bg-[var(--color-earth-copper)] rounded-full shadow-lg">
                    <span className="text-xs md:text-sm font-semibold text-white">Tokenized</span>
                  </div>
                  <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 px-3 py-1.5 md:px-4 md:py-2 bg-[var(--color-earth-patina)] rounded-full shadow-lg">
                    <span className="text-xs md:text-sm font-semibold text-white">Verified</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Tokenization Timeline */}
          <AnimatedSection animation="fade-in-up" delay={300}>
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-[var(--color-neutral-200)]">
              <div className="text-center mb-10">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-[var(--color-brand-primary)] mb-2">
                  Tokenization Roadmap
                </h3>
                <p className="text-[var(--color-neutral-600)]">Our path to blockchain-enabled mineral investment</p>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                {norchainTimeline.map((phase, index) => (
                  <div 
                    key={phase.phase}
                    className={`relative p-6 rounded-2xl transition-all hover:shadow-lg ${
                      phase.status === 'completed' 
                        ? 'bg-[var(--color-earth-copper)]/10 border-2 border-[var(--color-earth-copper)]' 
                        : phase.status === 'in-progress'
                        ? 'bg-[var(--color-earth-gold-bright)]/10 border-2 border-[var(--color-earth-gold-bright)]'
                        : 'bg-[var(--color-neutral-50)] border border-[var(--color-neutral-200)]'
                    }`}
                  >
                    {/* Status indicator */}
                    <div className={`absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                      phase.status === 'completed' 
                        ? 'bg-[var(--color-earth-copper)] text-white' 
                        : phase.status === 'in-progress'
                        ? 'bg-[var(--color-earth-gold-bright)] text-[var(--color-brand-primary)]'
                        : 'bg-[var(--color-neutral-300)] text-[var(--color-neutral-600)]'
                    }`}>
                      {phase.status === 'completed' ? '✓ Complete' : phase.status === 'in-progress' ? '● In Progress' : '○ Upcoming'}
                    </div>

                    {/* Phase number and date */}
                    <div className="mb-4 mt-2">
                      <span className={`text-sm font-bold ${
                        phase.status === 'completed' 
                          ? 'text-[var(--color-earth-copper)]' 
                          : phase.status === 'in-progress'
                          ? 'text-[var(--color-earth-gold-warm)]'
                          : 'text-[var(--color-neutral-500)]'
                      }`}>{phase.phase}</span>
                      <span className="text-[var(--color-neutral-400)] text-sm ml-2">• {phase.date}</span>
                    </div>

                    {/* Title */}
                    <h4 className="text-lg font-bold text-[var(--color-brand-primary)] mb-4">{phase.title}</h4>

                    {/* Items */}
                    <ul className="space-y-2">
                      {phase.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-neutral-600)]">
                          <CheckCircle size={14} className={`mt-0.5 flex-shrink-0 ${
                            phase.status === 'completed' 
                              ? 'text-[var(--color-earth-copper)]' 
                              : phase.status === 'in-progress'
                              ? 'text-[var(--color-earth-gold-warm)]'
                              : 'text-[var(--color-neutral-400)]'
                          }`} />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Connector line */}
                    {index < 3 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[var(--color-earth-copper)]/30 to-transparent" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <GoldDivider />

      {/* Team Section */}
      <section id="team" className="py-20 md:py-28 bg-white scroll-mt-20">
        <div className="site-container">
          <AnimatedSection animation="fade-in-up" className="text-center mb-16">
            <span className="section-badge section-badge--filled mb-4">
              Our Team
            </span>
            <h2 className="display-3 text-[var(--color-brand-primary)] mb-4">
              Expert{" "}
              <span className="text-[var(--color-earth-copper)]">Geological Team</span>
            </h2>
            <p className="lead text-[var(--color-neutral-600)] max-w-2xl mx-auto">
              Our team combines decades of geological expertise with modern exploration technology
            </p>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[var(--color-neutral-50)] to-white border-2 border-[var(--color-earth-copper)]/20">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--color-earth-copper)]/10 flex items-center justify-center">
                  <Users size={24} className="text-[var(--color-earth-copper)]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-display font-bold text-[var(--color-brand-primary)] mb-2">
                    Team Information Coming Soon
                  </h3>
                  <p className="text-[var(--color-neutral-700)] leading-relaxed">
                    We are currently preparing detailed information about our expert geological team, 
                    including their backgrounds, specializations, and contributions to our exploration 
                    programs. Our team includes experienced geologists, exploration specialists, and 
                    technical experts who bring decades of combined expertise to Pure Minerals.
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-[var(--color-neutral-600)]">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-[var(--color-earth-copper)] flex-shrink-0" />
                  <span>Geological mapping and interpretation specialists</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-[var(--color-earth-copper)] flex-shrink-0" />
                  <span>Field exploration and survey experts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-[var(--color-earth-copper)] flex-shrink-0" />
                  <span>Technical analysis and quality control</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-[var(--color-earth-copper)] flex-shrink-0" />
                  <span>Project management and oversight</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Investor CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-earth-obsidian)]">
        <div className="site-container text-center">
          <AnimatedSection animation="fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 border border-white/20">
              <Gem size={18} className="text-[var(--color-earth-gold-bright)]" />
              <span className="text-white/80 text-sm font-medium">Investment Opportunity</span>
            </div>
            <h2 className="display-2 text-on-dark mb-6 max-w-3xl mx-auto">
              Ready to Explore the{" "}
              <span className="text-[var(--color-earth-gold-bright)]">Opportunity</span>?
            </h2>
            <p className="lead text-on-dark-muted mb-10 max-w-2xl mx-auto">
              Connect with our team to discuss investment opportunities, 
              partnership possibilities, and learn more about our exploration projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                icon={<ArrowRight size={18} />}
                className="bg-[var(--color-earth-gold-bright)] hover:bg-[var(--color-earth-gold-warm)] text-[var(--color-brand-primary)]"
              >
                Schedule a Meeting
              </Button>
              <Button
                href="/projects"
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
              >
                View Project Details
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
