"use client";

import Image from "next/image";
import AnimatedSection from "../components/ui/AnimatedSection";
import Button from "../components/ui/Button";
import ImageCard from "../components/cards/ImageCard";
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
} from "lucide-react";

const investmentHighlights = [
  {
    value: "110+",
    unit: "km²",
    label: "Exploration Area",
    description: "Strategic license holdings in proven mineral districts",
  },
  {
    value: "18",
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

const timeline = [
  {
    year: "1760",
    title: "First Discovery",
    description: "Major copper ore discovered at Gruvfjellet plateau. Gaulstad No. 1 mine operational by 1764.",
    highlight: true,
  },
  {
    year: "2021",
    title: "Pure Minerals Founded",
    description: "Company established to explore and develop mineral deposits in Trøndelag County.",
    highlight: false,
  },
  {
    year: "2022",
    title: "License Acquisition",
    description: "Secured 18 mining licenses: 11 in Gaulstad-Mokk (~110 km²) and 7 in Skrattås-Byafossen.",
    highlight: true,
  },
  {
    year: "2023",
    title: "Geological Mapping",
    description: "Engaged Sunnfjord Geo Center AS and GeoVista AB for high-performance geological surveys.",
    highlight: false,
  },
  {
    year: "2024",
    title: "Advanced Exploration",
    description: "XRF measurements, sampling, and geochemical analysis. Over 70 elements analyzed.",
    highlight: true,
  },
  {
    year: "2025",
    title: "Strategic Development",
    description: "Deep drilling strategy implementation and NorChain tokenization partnership.",
    highlight: true,
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
  { name: "Copper", symbol: "Cu", color: "bg-[#b87333]", grade: "Up to 7.95%" },
  { name: "Zinc", symbol: "Zn", color: "bg-[#7c8b99]", grade: "Up to 28.8%" },
  { name: "Gold", symbol: "Au", color: "bg-[#f0c878]", grade: "Up to 10 ppm" },
  { name: "Silver", symbol: "Ag", color: "bg-[#c4cdd5]", grade: "Up to 539 ppm" },
  { name: "Lead", symbol: "Pb", color: "bg-[#5a6169]", grade: "Up to 9%" },
  { name: "REE", symbol: "La+", color: "bg-[#8b5cf6]", grade: "Trace amounts" },
];

export default function AboutPage() {
  return (
    <main className="bg-[var(--color-background)]">
      {/* Hero Section - Investor Focused */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-primary)] via-[var(--color-earth-slate)] to-[var(--color-earth-obsidian)]" />
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/mokk-gruvfjellet.jpg"
            alt="Gruvfjellet mountain plateau - historic mining district"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-earth-copper)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-earth-patina)]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="site-container relative z-10">
          <AnimatedSection animation="fade-in-up" className="text-center max-w-4xl mx-auto">
            <span className="section-badge section-badge--bordered backdrop-blur-sm mb-6">
              Investment Opportunity
            </span>
            <h1 className="display-1 text-on-dark mb-6 text-balance">
              Unlocking Norway&apos;s{" "}
              <span className="text-[var(--color-earth-gold-bright)]">Mineral Wealth</span>
            </h1>
            <p className="lead text-on-dark-muted max-w-3xl mx-auto mb-10 text-balance">
              Pure Minerals AS is a Norwegian exploration company pioneering sustainable 
              mineral development in one of Europe&apos;s most promising geological regions.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                icon={<ArrowRight size={18} />}
              >
                Investor Inquiries
              </Button>
              <Button
                href="/projects"
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
              >
                View Projects
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

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

      {/* Investment Thesis Section */}
      <section className="py-20 md:py-28">
        <div className="site-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection animation="slide-in-left">
              <span className="section-badge section-badge--filled mb-4">
                Why Invest
              </span>
              <h2 className="display-3 text-on-light mb-6">
                A Compelling Investment Thesis
              </h2>
              <div className="space-y-5 text-[var(--color-neutral-600)] body-large leading-relaxed">
                <p>
                  Pure Minerals represents a <strong className="text-[var(--color-brand-primary)]">ground-floor opportunity</strong> in 
                  one of Europe&apos;s most stable mining jurisdictions. Our strategic 
                  license portfolio covers historic mining districts with proven mineralization.
                </p>
                <p>
                  With the global push toward electrification and renewable energy, 
                  demand for copper and other base metals is projected to surge. 
                  Norway offers <strong className="text-[var(--color-brand-primary)]">political stability</strong>, 
                  world-class infrastructure, and supportive regulatory frameworks.
                </p>
                <p>
                  Our partnership with <strong className="text-[var(--color-brand-primary)]">NorChain</strong> enables 
                  tokenized asset ownership, providing unprecedented transparency and 
                  accessibility for investors worldwide.
                </p>
              </div>
              
              {/* Mineral badges */}
              <div className="mt-8 flex flex-wrap gap-3">
                {minerals.map((mineral) => (
                  <div
                    key={mineral.symbol}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-neutral-100)] border border-[var(--color-neutral-200)]"
                  >
                    <span className={`w-3 h-3 rounded-full ${mineral.color}`} />
                    <span className="font-semibold text-[var(--color-brand-primary)]">
                      {mineral.name}
                    </span>
                    <span className="text-[var(--color-neutral-400)] text-sm">
                      ({mineral.symbol})
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Button href="/projects" variant="primary" icon={<ArrowRight size={18} />}>
                  Explore Our Projects
                </Button>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-right" delay={200}>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/copper-minerals.jpg"
                    alt="Copper mineral samples from exploration sites"
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Floating stat cards */}
                <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-xl shadow-xl border border-[var(--color-neutral-200)]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-earth-copper)]/10 flex items-center justify-center">
                      <Mountain size={24} className="text-[var(--color-earth-copper)]" />
                    </div>
                    <div>
                      <div className="text-2xl font-display font-bold text-[var(--color-brand-primary)]">
                        110+ km²
                      </div>
                      <div className="text-xs text-[var(--color-neutral-500)] uppercase tracking-wider">
                        Exploration Area
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 bg-[var(--color-brand-primary)] p-4 rounded-xl shadow-xl text-white">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-[var(--color-earth-gold-bright)]" />
                    <span className="font-semibold">18 Licenses</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Market Opportunity Section */}
      <section className="py-20 bg-[var(--color-brand-primary)]">
        <div className="site-container">
          <AnimatedSection animation="fade-in-up" className="text-center mb-16">
            <span className="section-badge section-badge--bordered border-[var(--color-earth-gold-bright)]/40 text-[var(--color-earth-gold-bright)] mb-4">
              Market Opportunity
            </span>
            <h2 className="display-3 text-on-dark mb-4">
              The Right Time to Invest
            </h2>
            <p className="lead text-on-dark-muted max-w-2xl mx-auto">
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
                <div className="relative p-8 rounded-2xl bg-white/[0.05] backdrop-blur-sm border border-white/10 hover:border-[var(--color-earth-gold-bright)]/40 transition-all group h-full">
                  <div className="w-14 h-14 rounded-xl bg-[var(--color-earth-gold-bright)]/20 flex items-center justify-center text-[var(--color-earth-gold-bright)] mb-6 group-hover:bg-[var(--color-earth-gold-bright)]/30 transition-colors">
                    {item.icon}
                  </div>
                  <div className="text-4xl font-display font-bold text-[var(--color-earth-gold-bright)] mb-2">
                    {item.stat}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/70">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Mineral Occurrences Data Section */}
      <section className="py-20 md:py-28 bg-[var(--color-neutral-100)]">
        <div className="site-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Image Gallery */}
            <AnimatedSection animation="slide-in-left">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/mokk-geology.jpg"
                    alt="Geological samples from Mokk"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-square rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/bjonsas-mineral.jpg"
                    alt="Mineral samples from Bjønsås"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-square rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/copper-minerals-2.jpg"
                    alt="Copper mineral specimens"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </AnimatedSection>

            {/* Right: Data Table */}
            <AnimatedSection animation="slide-in-right" delay={200}>
              <span className="section-badge section-badge--filled mb-4">
                Geological Data
              </span>
              <h2 className="display-3 text-on-light mb-4">
                Proven Mineral Occurrences
              </h2>
              <p className="lead mb-8">
                Over 70 elements analyzed across our license areas, with exceptional grades in key minerals.
              </p>

              {/* Data Table */}
              <div className="bg-white rounded-2xl border border-[var(--color-neutral-200)] overflow-hidden shadow-lg">
                <div className="grid grid-cols-4 bg-[var(--color-brand-primary)] text-white text-sm font-bold">
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
              <div className="mt-6 p-5 rounded-xl bg-[var(--color-earth-copper)]/10 border border-[var(--color-earth-copper)]/20">
                <div className="flex items-start gap-3">
                  <Gem size={24} className="text-[var(--color-earth-copper)] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-[var(--color-brand-primary)] mb-1">Historic Production</h4>
                    <p className="text-sm text-[var(--color-neutral-600)]">
                      Skrattås produced ore grading <strong>34% Zn, 10.4% Pb, 1.9% Cu</strong> during 1979-1981. 
                      Mineralization continues below 80m depth.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Strategic Advantages */}
      <section className="py-20 md:py-28">
        <div className="site-container">
          <AnimatedSection animation="fade-in-up" className="text-center mb-16">
            <span className="section-badge section-badge--filled mb-4">
              Competitive Edge
            </span>
            <h2 className="display-3 text-on-light mb-4">
              Strategic Advantages
            </h2>
            <p className="lead max-w-2xl mx-auto">
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
                <div className="p-8 rounded-2xl bg-white border border-[var(--color-neutral-200)] hover:border-[var(--color-earth-copper)]/40 hover:shadow-xl transition-all h-full">
                  <div className="w-14 h-14 rounded-xl bg-[var(--color-earth-copper)]/10 flex items-center justify-center text-[var(--color-earth-copper)] mb-6">
                    {advantage.icon}
                  </div>
                  <h3 className="headline text-on-light mb-4">
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

      {/* Values Section */}
      <section className="py-20 bg-[var(--color-neutral-100)]">
        <div className="site-container">
          <AnimatedSection animation="fade-in-up" className="text-center mb-16">
            <span className="section-badge section-badge--filled mb-4">
              Our Values
            </span>
            <h2 className="display-3 text-on-light mb-4">
              Guiding Principles
            </h2>
            <p className="lead max-w-2xl mx-auto">
              Excellence and integrity in everything we do
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <AnimatedSection
                key={value.title}
                animation="fade-in-up"
                delay={index * 100}
              >
                <div className="bg-white p-6 rounded-2xl border border-[var(--color-neutral-200)] h-full hover:shadow-lg hover:border-[var(--color-earth-copper)]/30 transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-xl bg-[var(--color-earth-copper)]/10 flex items-center justify-center text-[var(--color-earth-copper)] mb-5 group-hover:bg-[var(--color-earth-copper)] group-hover:text-white transition-colors duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-display font-bold text-[var(--color-brand-primary)] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-[var(--color-neutral-500)] text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 md:py-28">
        <div className="site-container-narrow">
          <AnimatedSection animation="fade-in-up" className="text-center mb-16">
            <span className="section-badge section-badge--filled mb-4">
              Our Journey
            </span>
            <h2 className="display-3 text-on-light mb-4">
              Key Milestones
            </h2>
            <p className="lead max-w-xl mx-auto">
              From founding to strategic development
            </p>
          </AnimatedSection>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--color-earth-copper)] via-[var(--color-neutral-300)] to-transparent md:-translate-x-0.5" />

            {timeline.map((item, index) => (
              <AnimatedSection
                key={item.year}
                animation={index % 2 === 0 ? "slide-in-left" : "slide-in-right"}
                delay={index * 100}
              >
                <div
                  className={`relative flex items-start gap-8 mb-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 mt-1.5 ring-4 ring-[var(--color-background)] ${
                    item.highlight 
                      ? "bg-[var(--color-earth-copper)]" 
                      : "bg-[var(--color-neutral-400)]"
                  }`} />

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <span className={`inline-block px-3 py-1 text-sm font-bold rounded-full mb-3 ${
                      item.highlight 
                        ? "text-white bg-[var(--color-earth-copper)]" 
                        : "text-[var(--color-earth-copper)] bg-[var(--color-earth-copper)]/10"
                    }`}>
                      {item.year}
                    </span>
                    <h3 className="text-xl font-display font-bold text-[var(--color-brand-primary)] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[var(--color-neutral-500)]">{item.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

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
                content="18 licenses covering 110+ km² across Gaulstad-Mokk and Skrattås-Byafossen districts with documented commercial mineralization."
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

      {/* NorChain Partnership Highlight */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--sandstone)] via-[var(--background)] to-[var(--sandstone)]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--secondary)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-3xl" />

        <div className="site-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="slide-in-left">
              <span className="section-badge section-badge--filled mb-4">
                Blockchain Innovation
              </span>
              <h2 className="display-3 text-on-light mb-6">
                Tokenized on{" "}
                <span className="text-[var(--color-earth-copper)]">NorChain</span>
              </h2>
              <p className="lead mb-6">
                We&apos;ve partnered with NorChain to bring transparency and accessibility 
                to mineral exploration through blockchain technology.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Transparent ownership records on blockchain",
                  "Fractional investment opportunities",
                  "Real-time asset tracking and verification",
                  "Secure, compliant tokenization framework",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-[var(--color-earth-patina)] flex-shrink-0" />
                    <span className="text-[var(--color-neutral-600)]">{item}</span>
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
                  <div className="w-64 h-64 rounded-full bg-[var(--color-brand-primary)]/5 border border-[var(--color-brand-primary)]/10 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full bg-[var(--color-brand-primary)]/10 border border-[var(--color-brand-primary)]/20 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl">
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
                  <div className="absolute -top-4 -right-4 px-4 py-2 bg-white rounded-full shadow-lg border border-[var(--color-neutral-200)]">
                    <span className="text-sm font-semibold text-[var(--color-brand-primary)]">Tokenized</span>
                  </div>
                  <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-white rounded-full shadow-lg border border-[var(--color-neutral-200)]">
                    <span className="text-sm font-semibold text-[var(--color-brand-primary)]">Verified</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

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
