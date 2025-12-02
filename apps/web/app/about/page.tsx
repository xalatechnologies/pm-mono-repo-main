"use client";

import Image from "next/image";
import AnimatedSection from "../components/ui/AnimatedSection";
import Button from "../components/ui/Button";
import ImageCard from "../components/cards/ImageCard";
import { Target, Compass, Shield, Users, ArrowRight } from "lucide-react";

const values = [
  {
    icon: <Target size={28} />,
    title: "Precision",
    description: "Advanced geological surveys and systematic exploration methods ensure accurate resource identification.",
  },
  {
    icon: <Compass size={28} />,
    title: "Innovation",
    description: "Embracing cutting-edge technology including blockchain tokenization for transparent asset management.",
  },
  {
    icon: <Shield size={28} />,
    title: "Sustainability",
    description: "Committed to environmentally responsible exploration practices and community engagement.",
  },
  {
    icon: <Users size={28} />,
    title: "Partnership",
    description: "Building lasting relationships with stakeholders, communities, and industry partners.",
  },
];

const timeline = [
  {
    year: "2021",
    title: "Company Founded",
    description: "Pure Minerals AS established to explore mineral deposits in Trøndelag County.",
  },
  {
    year: "2022",
    title: "License Acquisition",
    description: "Secured 16 mining licenses covering key areas in Gaulstad, Mokk, and Skrattåsen.",
  },
  {
    year: "2023",
    title: "Geological Surveys",
    description: "Comprehensive XRF measurements and geochemical analysis across license areas.",
  },
  {
    year: "2024",
    title: "Advanced Exploration",
    description: "High-resolution investigations and TEM surveys at Skrattåsen site.",
  },
  {
    year: "2025",
    title: "Strategic Development",
    description: "Deep drilling strategy implementation and NorChain tokenization partnership.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-[var(--background)]">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--obsidian)]" />
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/minerals.jpg"
            alt="Geological background"
            fill
            className="object-cover"
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <AnimatedSection animation="fade-in-up" className="text-center">
            <span className="inline-block px-4 py-2 mb-6 text-[var(--secondary)] text-sm uppercase tracking-[0.2em] border border-[var(--secondary)]/30 rounded-full">
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6">
              Pioneering Mineral{" "}
              <span className="text-[var(--secondary)]">Exploration</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Pure Minerals AS is a Norwegian exploration company committed to
              discovering and developing sustainable mineral resources in Trøndelag.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="slide-in-left">
              <span className="inline-block px-4 py-2 mb-4 text-[var(--secondary)] text-sm uppercase tracking-[0.2em] bg-[var(--secondary)]/10 rounded-full">
                Our Story
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--primary)] mb-6">
                Building the Future of Norwegian Mining
              </h2>
              <div className="space-y-4 text-[var(--stone-grey)] leading-relaxed">
                <p>
                  Pure Minerals AS was founded with a clear vision: to unlock the
                  mineral potential of Norway&apos;s Trøndelag region through modern,
                  sustainable exploration practices.
                </p>
                <p>
                  Our team combines decades of geological expertise with innovative
                  technology, including blockchain-based asset tokenization through
                  our partnership with NorChain.
                </p>
                <p>
                  From the historic mining districts of Gaulstad and Mokk to the
                  promising Skrattåsen site, we&apos;re systematically exploring and
                  developing valuable copper, zinc, gold, and silver deposits.
                </p>
              </div>
              <div className="mt-8">
                <Button href="/projects" variant="primary" icon={<ArrowRight size={18} />}>
                  Explore Our Projects
                </Button>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-right" delay={200}>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/mokk2.png"
                    alt="Pure Minerals exploration"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Floating stat card */}
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-4xl font-serif font-bold text-[var(--secondary)]">
                    138 km²
                  </div>
                  <div className="text-sm text-[var(--stone-grey)] uppercase tracking-wider">
                    Exploration Area
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-[var(--sandstone)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimatedSection animation="fade-in-up" className="text-center mb-16">
            <span className="inline-block px-4 py-2 mb-4 text-[var(--secondary)] text-sm uppercase tracking-[0.2em] bg-[var(--secondary)]/10 rounded-full">
              Our Values
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--primary)] mb-4">
              Guiding Principles
            </h2>
            <p className="text-[var(--stone-grey)] max-w-2xl mx-auto">
              Our commitment to excellence is reflected in everything we do.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <AnimatedSection
                key={value.title}
                animation="fade-in-up"
                delay={index * 100}
              >
                <div className="bg-white p-6 rounded-xl border border-[var(--stone-grey)]/10 h-full hover:shadow-lg hover:border-[var(--secondary)]/30 transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-xl bg-[var(--secondary)]/10 flex items-center justify-center text-[var(--secondary)] mb-4 group-hover:bg-[var(--secondary)] group-hover:text-white transition-colors duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[var(--primary)] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-[var(--stone-grey)] text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AnimatedSection animation="fade-in-up" className="text-center mb-16">
            <span className="inline-block px-4 py-2 mb-4 text-[var(--secondary)] text-sm uppercase tracking-[0.2em] bg-[var(--secondary)]/10 rounded-full">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--primary)] mb-4">
              Milestones
            </h2>
          </AnimatedSection>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--secondary)] via-[var(--stone-grey)]/30 to-transparent" />

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
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[var(--secondary)] rounded-full transform -translate-x-1/2 mt-2 ring-4 ring-[var(--background)]" />

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <span className="inline-block px-3 py-1 text-sm font-bold text-[var(--secondary)] bg-[var(--secondary)]/10 rounded-full mb-2">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[var(--primary)] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[var(--stone-grey)]">{item.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-[var(--primary)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimatedSection animation="fade-in-up" className="text-center mb-16">
            <span className="inline-block px-4 py-2 mb-4 text-[var(--secondary)] text-sm uppercase tracking-[0.2em] border border-[var(--secondary)]/30 rounded-full">
              Our Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
              Geological Excellence
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            <AnimatedSection animation="fade-in-up" delay={0}>
              <ImageCard
                title="Strategic License Areas"
                content="We hold 16 licenses covering approximately 138 km² with strong potential for commercial mineralization including copper, zinc, gold, and silver."
                imageUrl="/map1.png"
                alt="Exploration map"
                variant="dark"
              />
            </AnimatedSection>

            <AnimatedSection animation="fade-in-up" delay={100}>
              <ImageCard
                title="Geology and Mineral Wealth"
                content="Our license areas are rich in valuable minerals. The Skrattås region shows exceptional zinc, lead, and silver, while Mokk contains strong copper deposits."
                imageUrl="/core1.png"
                alt="Core samples"
                variant="dark"
              />
            </AnimatedSection>

            <AnimatedSection animation="fade-in-up" delay={200}>
              <ImageCard
                title="From Prospect to Production"
                content="Following a structured development plan from prospecting to resource confirmation, with the goal of full-scale mining operations."
                imageUrl="/production1.png"
                alt="Mining operations"
                variant="dark"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection animation="fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--primary)] mb-6">
              Interested in Learning More?
            </h2>
            <p className="text-[var(--stone-grey)] text-lg mb-8">
              Get in touch with our team to discuss exploration opportunities
              and partnerships.
            </p>
            <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight size={20} />}>
              Contact Us
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
