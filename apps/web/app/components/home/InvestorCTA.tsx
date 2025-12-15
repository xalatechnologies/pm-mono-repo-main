"use client";

import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "../ui/Lamp";
import Button from "../ui/Button";
import { ArrowRight, Gem, TrendingUp, Shield, Sparkles } from "lucide-react";
import { PORTFOLIO } from "@/lib/portfolio";

const highlights = [
  { icon: <Gem size={20} />, text: `${PORTFOLIO.totals.licenses} Mining Licenses`, special: false },
  { icon: <TrendingUp size={20} />, text: `${PORTFOLIO.totals.coverageKm2} km² Exploration`, special: false },
  { icon: <Sparkles size={20} />, text: "REE Target", special: true },
  { icon: <Shield size={20} />, text: "NorChain Tokenized", special: false },
];

export default function InvestorCTA() {
  return (
    <LampContainer className="min-h-[200px] pt-90">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center text-center max-w-3xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--color-earth-gold-bright)] animate-pulse" />
          <span className="text-white/80 text-sm font-medium">Investment Opportunity</span>
        </motion.div>

        {/* Heading */}
        <h2 className="bg-gradient-to-br from-white via-white/90 to-[var(--color-earth-gold-bright)] py-4 bg-clip-text text-center text-4xl font-display font-bold tracking-tight text-transparent md:text-6xl lg:text-7xl">
          The Future of<br />
          <span className="bg-gradient-to-r from-[var(--color-earth-copper)] to-[var(--color-earth-gold-bright)] bg-clip-text">
            Mineral Exploration
          </span>
        </h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 text-lg text-white/70 max-w-xl leading-relaxed"
        >
          Join us in unlocking Norway&apos;s mineral wealth. Our assets are tokenized on 
          NorChain, providing transparent and accessible investment opportunities.
        </motion.p>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          {highlights.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                item.special
                  ? "bg-gradient-to-r from-[var(--color-earth-patina)]/20 to-[var(--color-earth-copper)]/20 border border-[var(--color-earth-patina)]/40 text-white"
                  : "bg-white/5 border border-white/10 text-white/80"
              }`}
            >
              <span className={item.special ? "text-[var(--color-earth-patina)]" : "text-[var(--color-earth-gold-bright)]"}>
                {item.icon}
              </span>
              {item.text}
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mt-10"
        >
          <Button
            href="/contact"
            variant="primary"
            size="lg"
            icon={<ArrowRight size={18} />}
            className="bg-gradient-to-r from-[var(--color-earth-copper)] to-[var(--color-earth-gold)] hover:from-[var(--color-earth-gold)] hover:to-[var(--color-earth-copper)] shadow-lg shadow-[var(--color-earth-copper)]/30"
          >
            Investor Inquiries
          </Button>
          <Button
            href="/about"
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10"
          >
            Learn More
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <p className="text-white/50 text-sm">
            Pure Minerals AS • Org.nr: NO 928 309 231 MVA • Steinkjer, Norway
          </p>
        </motion.div>
      </motion.div>
    </LampContainer>
  );
}

