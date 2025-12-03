"use client";

import { useState } from "react";
import Image from "next/image";
import AnimatedSection from "../components/ui/AnimatedSection";
import Button from "../components/ui/Button";
import {
  Mail,
  MapPin,
  Globe,
  Building2,
  Send,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const contactInfo = [
  {
    icon: <Building2 size={24} />,
    title: "Company",
    lines: ["Pure Minerals AS", "Org.nr: NO 928 309 231 MVA"],
  },
  {
    icon: <MapPin size={24} />,
    title: "Address",
    lines: ["Ølvegata 18B", "7715 STEINKJER", "Norway"],
  },
  {
    icon: <Mail size={24} />,
    title: "Email",
    lines: ["post@pureminerals.no"],
    href: "mailto:post@pureminerals.no",
  },
  {
    icon: <Globe size={24} />,
    title: "Website",
    lines: ["pureminerals.no"],
    href: "https://pureminerals.no",
    external: true,
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <main className="bg-[var(--background)]">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--obsidian)]" />
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/minerals.jpg"
            alt="Geological background"
            fill
            className="object-cover"
          />
        </div>

        <div className="site-container relative z-10">
          <AnimatedSection animation="fade-in-up" className="text-center">
            <span className="inline-block px-4 py-2 mb-6 text-[var(--secondary)] text-sm uppercase tracking-[0.2em] border border-[var(--secondary)]/30 rounded-full">
              Get in Touch
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6">
              Contact <span className="text-[var(--secondary)]">Us</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Interested in learning more about our exploration projects or
              investment opportunities? We&apos;d love to hear from you.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="site-container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <AnimatedSection animation="slide-in-left">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--primary)] mb-6">
                  Contact Information
                </h2>
                <p className="text-[var(--stone-grey)] mb-8 leading-relaxed">
                  Reach out to discuss project opportunities, partnerships, or any
                  questions about Pure Minerals AS.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <div key={info.title} className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[var(--secondary)]/10 flex items-center justify-center text-[var(--secondary)] flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[var(--primary)] mb-1">
                          {info.title}
                        </h3>
                        {info.href ? (
                          <a
                            href={info.href}
                            target={info.external ? "_blank" : undefined}
                            rel={info.external ? "noopener noreferrer" : undefined}
                            className="text-[var(--stone-grey)] hover:text-[var(--secondary)] transition-colors"
                          >
                            {info.lines.join(", ")}
                          </a>
                        ) : (
                          <div className="text-[var(--stone-grey)] text-sm">
                            {info.lines.map((line, i) => (
                              <div key={i}>{line}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map placeholder */}
                <div className="mt-10 aspect-video rounded-xl overflow-hidden bg-[var(--stone-grey)]/10 border border-[var(--stone-grey)]/20">
                  <div className="w-full h-full flex items-center justify-center text-[var(--stone-grey)]">
                    <div className="text-center">
                      <MapPin size={48} className="mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Steinkjer, Trøndelag, Norway</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <AnimatedSection animation="slide-in-right" delay={200}>
                <div className="bg-white rounded-2xl shadow-sm border border-[var(--stone-grey)]/10 p-8 lg:p-10">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-[var(--accent)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} className="text-[var(--accent)]" />
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-[var(--primary)] mb-4">
                        Message Sent!
                      </h3>
                      <p className="text-[var(--stone-grey)] mb-8">
                        Thank you for reaching out. We&apos;ll get back to you as soon
                        as possible.
                      </p>
                      <Button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            name: "",
                            email: "",
                            company: "",
                            subject: "",
                            message: "",
                          });
                        }}
                        variant="outline"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-serif font-bold text-[var(--primary)] mb-2">
                        Send Us a Message
                      </h2>
                      <p className="text-[var(--stone-grey)] mb-8">
                        Fill out the form below and we&apos;ll respond within 1-2
                        business days.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-[var(--primary)] mb-2"
                            >
                              Full Name *
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-lg border border-[var(--stone-grey)]/20 focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--secondary)]/20 outline-none transition-all bg-transparent"
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-[var(--primary)] mb-2"
                            >
                              Email Address *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-lg border border-[var(--stone-grey)]/20 focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--secondary)]/20 outline-none transition-all bg-transparent"
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                          <div>
                            <label
                              htmlFor="company"
                              className="block text-sm font-medium text-[var(--primary)] mb-2"
                            >
                              Company
                            </label>
                            <input
                              type="text"
                              id="company"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-lg border border-[var(--stone-grey)]/20 focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--secondary)]/20 outline-none transition-all bg-transparent"
                              placeholder="Your Company"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="subject"
                              className="block text-sm font-medium text-[var(--primary)] mb-2"
                            >
                              Subject *
                            </label>
                            <select
                              id="subject"
                              name="subject"
                              required
                              value={formData.subject}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-lg border border-[var(--stone-grey)]/20 focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--secondary)]/20 outline-none transition-all bg-transparent"
                            >
                              <option value="">Select a subject</option>
                              <option value="investment">Investment Inquiry</option>
                              <option value="partnership">Partnership Opportunity</option>
                              <option value="projects">Project Information</option>
                              <option value="media">Media Inquiry</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="message"
                            className="block text-sm font-medium text-[var(--primary)] mb-2"
                          >
                            Message *
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            required
                            rows={6}
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-[var(--stone-grey)]/20 focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--secondary)]/20 outline-none transition-all bg-transparent resize-none"
                            placeholder="How can we help you?"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-sm text-[var(--stone-grey)]">
                            * Required fields
                          </p>
                          <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            disabled={isSubmitting}
                            icon={
                              isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              ) : (
                                <Send size={18} />
                              )
                            }
                            iconPosition="right"
                          >
                            {isSubmitting ? "Sending..." : "Send Message"}
                          </Button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--sandstone)]">
        <div className="site-container-narrow text-center">
          <AnimatedSection animation="fade-in-up">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--primary)] mb-6">
              Explore Our Projects First?
            </h2>
            <p className="text-[var(--stone-grey)] mb-8">
              Learn more about our active exploration areas before reaching out.
            </p>
            <Button href="/projects" variant="outline" icon={<ArrowRight size={18} />}>
              View Projects
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
