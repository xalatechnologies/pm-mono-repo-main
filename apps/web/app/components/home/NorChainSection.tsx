"use client";

import Image from "next/image";
import AnimatedSection from "../ui/AnimatedSection";
import Button from "../ui/Button";
import { Shield, Globe, Lock, ExternalLink } from "lucide-react";

const features = [
  {
    icon: <Shield size={24} />,
    title: "Tokenized Assets",
    description: "Our mineral assets are securely tokenized on the NorChain blockchain for transparent ownership.",
  },
  {
    icon: <Globe size={24} />,
    title: "Global Access",
    description: "Enabling worldwide investment opportunities in Norwegian mineral exploration.",
  },
  {
    icon: <Lock size={24} />,
    title: "Secure & Transparent",
    description: "Blockchain-verified transactions with complete audit trails and compliance.",
  },
];

export default function NorChainSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--sandstone)] via-[var(--background)] to-[var(--sandstone)]" />

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--secondary)]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl" />

      <div className="site-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <AnimatedSection animation="slide-in-left">
            <span className="section-badge section-badge--filled mb-4">
              Blockchain Integration
            </span>
            <h2 className="display-2 text-on-light mb-6 text-balance">
              Our Assets are Tokenized on{" "}
              <span className="text-copper">NorChain</span>
            </h2>
            <p className="lead mb-8 text-pretty">
              Pure Minerals has partnered with NorChain to bring transparency and accessibility
              to mineral exploration. Our assets are tokenized, enabling secure, verifiable
              ownership and investment opportunities powered by blockchain technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                href="https://norchain.org"
                external
                variant="primary"
                size="lg"
                icon={<ExternalLink size={18} />}
              >
                Visit NorChain
              </Button>
              <Button href="/about" variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </AnimatedSection>

          {/* Features Grid */}
          <AnimatedSection animation="slide-in-right" delay={200}>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="
                    flex gap-4 p-6
                    bg-white rounded-xl
                    border border-[var(--stone-grey)]/10
                    shadow-sm hover:shadow-md
                    transition-all duration-300
                    group
                  "
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-[var(--secondary)]/10 text-[var(--secondary)] group-hover:bg-[var(--secondary)] group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="body-large weight-semibold text-on-light mb-1">
                      {feature.title}
                    </h3>
                    <p className="body-small text-on-light-muted">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* NorChain Badge */}
            <div className="mt-8 p-4 bg-[var(--primary)]/5 rounded-xl border border-[var(--primary)]/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 shadow-md">
                  <Image
                    src="/norchain-logo.png"
                    alt="NorChain"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="body-small weight-semibold text-on-light">
                    Powered by NorChain
                  </div>
                  <div className="caption">
                    The Complete Blockchain Operating System
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

