"use client";

import { useState } from "react";
import Image from "next/image";
import AnimatedSection from "../components/ui/AnimatedSection";
import {
  Mail,
  MapPin,
  Building2,
  Send,
  CheckCircle,
  Clock,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

const contactInfo = [
  {
    icon: <Building2 size={24} strokeWidth={1.5} />,
    title: "Company",
    content: "Pure Minerals AS",
    subContent: "Org.nr: NO 928 309 231 MVA",
  },
  {
    icon: <MapPin size={24} strokeWidth={1.5} />,
    title: "Address",
    content: "Ølvegata 18B",
    subContent: "7715 Steinkjer, Norway",
  },
  {
    icon: <Mail size={24} strokeWidth={1.5} />,
    title: "Email",
    content: "post@pureminerals.no",
    href: "mailto:post@pureminerals.no",
  },
  {
    icon: <Clock size={24} strokeWidth={1.5} />,
    title: "Response Time",
    content: "Within 24-48 hours",
    subContent: "Monday - Friday",
  },
];

const quickLinks = [
  { label: "Our Projects", href: "/projects", icon: <ArrowRight size={16} /> },
  { label: "About Us", href: "/about", icon: <ArrowRight size={16} /> },
  { label: "Visit Website", href: "https://pureminerals.no", icon: <ExternalLink size={16} />, external: true },
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
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "a95eaf84-d632-4091-b34e-fc067083df6d",
          name: formData.name,
          email: formData.email,
          company: formData.company || "Not specified",
          subject: `Pure Minerals Contact: ${formData.subject}`,
          message: formData.message,
          from_name: "Pure Minerals Website",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", company: "", subject: "", message: "" });
      } else {
        handleMailtoFallback();
      }
    } catch {
      handleMailtoFallback();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMailtoFallback = () => {
    const subject = encodeURIComponent(`Pure Minerals Contact: ${formData.subject}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || "Not specified"}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:post@pureminerals.no?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  };

  return (
    <main className="bg-[var(--color-background)]">
      {/* Hero Section */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-primary)] via-[var(--color-earth-slate)] to-[var(--color-earth-obsidian)]" />
        <div className="absolute inset-0 opacity-15">
          <Image
            src="/minerals.jpg"
            alt="Geological background"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Decorative orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-earth-copper)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-earth-patina)]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="site-container relative z-10">
          <AnimatedSection animation="fade-in-up" className="text-center">
            <span className="section-badge section-badge--bordered backdrop-blur-sm mb-6">
              Get in Touch
            </span>
            <h1 className="display-1 text-on-dark mb-6 text-balance">
              Let&apos;s Start a{" "}
              <span className="text-[var(--color-earth-gold-bright)]">Conversation</span>
            </h1>
            <p className="lead text-on-dark-muted max-w-2xl mx-auto text-balance">
              Interested in learning more about our exploration projects, 
              investment opportunities, or partnership possibilities? We&apos;d love to hear from you.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 md:py-28">
        <div className="site-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Left Column - Contact Info */}
            <AnimatedSection animation="slide-in-left">
              <div className="space-y-10">
                {/* Section Header */}
                <div>
                  <h2 className="display-3 text-on-light mb-4">
                    Contact Information
                  </h2>
                  <p className="body-large text-on-light-muted">
                    Reach out to discuss project opportunities, partnerships, or any
                    questions about Pure Minerals AS.
                  </p>
                </div>

                {/* Info Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {contactInfo.map((info, index) => (
                    <div
                      key={info.title}
                      className="group p-5 rounded-xl bg-[var(--color-brand-primary)]/[0.03] border border-[var(--color-neutral-200)] hover:border-[var(--color-earth-copper)]/40 hover:bg-[var(--color-brand-primary)]/[0.06] transition-all duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Icon */}
                      <div className="w-11 h-11 rounded-lg bg-[var(--color-earth-copper)]/10 flex items-center justify-center text-[var(--color-earth-copper)] mb-4 group-hover:bg-[var(--color-earth-copper)]/20 transition-colors">
                        {info.icon}
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-earth-copper)] mb-2">
                       <span className="text-[var(--color-earth-copper)]">{info.title}</span>
                      </h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-[var(--color-brand-primary)] font-semibold text-lg hover:text-[var(--color-earth-copper)] transition-colors block"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-[var(--color-brand-primary)] font-semibold text-lg">{info.content}</p>
                      )}
                      {info.subContent && (
                        <p className="text-[var(--color-neutral-500)] text-sm mt-1">{info.subContent}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Map */}
                <div className="relative rounded-2xl overflow-hidden border border-[var(--color-neutral-200)] aspect-[16/10] shadow-sm">
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=11.4,64.0,11.6,64.1&layer=mapnik&marker=64.0167,11.4950"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Pure Minerals Location - Steinkjer, Norway"
                    className="hover:grayscale-0 transition-all duration-500"
                  />
                  
                  {/* Map overlay card */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 backdrop-blur-sm rounded-xl border border-[var(--color-neutral-200)] shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[var(--color-earth-copper)] flex items-center justify-center flex-shrink-0 shadow-md">
                        <MapPin size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="text-[var(--color-brand-primary)] font-bold text-lg">Steinkjer, Norway</p>
                        <p className="text-[var(--color-neutral-500)] text-sm">Trøndelag Region</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-neutral-500)] mb-4">
                    Quick Links
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {quickLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-brand-primary)]/5 border border-[var(--color-neutral-200)] text-[var(--color-brand-primary)] font-medium hover:bg-[var(--color-earth-copper)]/10 hover:border-[var(--color-earth-copper)]/40 hover:text-[var(--color-earth-copper)] transition-all text-sm"
                      >
                        {link.label}
                        {link.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Right Column - Contact Form */}
            <AnimatedSection animation="slide-in-right" delay={200}>
              <div className="bg-white rounded-2xl shadow-xl border border-[var(--color-neutral-200)] p-8 lg:p-10 sticky top-24">
                {isSubmitted ? (
                  /* Success State */
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-[var(--color-earth-patina)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={40} className="text-[var(--color-earth-patina)]" />
                    </div>
                    <h3 className="headline text-on-light mb-4">
                      Message Sent!
                    </h3>
                    <p className="text-[var(--color-neutral-500)] mb-8 max-w-sm mx-auto">
                      Thank you for reaching out. We&apos;ll get back to you within 24-48 hours.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: "", email: "", company: "", subject: "", message: "" });
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] font-semibold hover:bg-[var(--color-brand-primary)] hover:text-white transition-all"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  /* Form */
                  <>
                    <div className="mb-8">
                      <h2 className="headline text-on-light mb-2">
                        Send Us a Message
                      </h2>
                      <p className="text-[var(--color-neutral-500)]">
                        Fill out the form and our team will respond within 1-2 business days.
                      </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Name & Email */}
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-semibold text-[var(--color-brand-primary)] mb-2"
                          >
                            Full Name <span className="text-[var(--color-earth-copper)]">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 rounded-xl border-2 border-[var(--color-neutral-200)] focus:border-[var(--color-earth-copper)] focus:ring-4 focus:ring-[var(--color-earth-copper)]/10 outline-none transition-all bg-[var(--color-neutral-50)]"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-[var(--color-brand-primary)] mb-2"
                          >
                            Email <span className="text-[var(--color-earth-copper)]">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 rounded-xl border-2 border-[var(--color-neutral-200)] focus:border-[var(--color-earth-copper)] focus:ring-4 focus:ring-[var(--color-earth-copper)]/10 outline-none transition-all bg-[var(--color-neutral-50)]"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      {/* Company & Subject */}
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="company"
                            className="block text-sm font-semibold text-[var(--color-brand-primary)] mb-2"
                          >
                            Company
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 rounded-xl border-2 border-[var(--color-neutral-200)] focus:border-[var(--color-earth-copper)] focus:ring-4 focus:ring-[var(--color-earth-copper)]/10 outline-none transition-all bg-[var(--color-neutral-50)]"
                            placeholder="Your Company"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="subject"
                            className="block text-sm font-semibold text-[var(--color-brand-primary)] mb-2"
                          >
                            Subject <span className="text-[var(--color-earth-copper)]">*</span>
                          </label>
                          <select
                            id="subject"
                            name="subject"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 rounded-xl border-2 border-[var(--color-neutral-200)] focus:border-[var(--color-earth-copper)] focus:ring-4 focus:ring-[var(--color-earth-copper)]/10 outline-none transition-all bg-[var(--color-neutral-50)] cursor-pointer"
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

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-semibold text-[var(--color-brand-primary)] mb-2"
                        >
                          Message <span className="text-[var(--color-earth-copper)]">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-[var(--color-neutral-200)] focus:border-[var(--color-earth-copper)] focus:ring-4 focus:ring-[var(--color-earth-copper)]/10 outline-none transition-all bg-[var(--color-neutral-50)] resize-none"
                          placeholder="How can we help you?"
                        />
                      </div>

                      {/* Submit */}
                      <div className="flex items-center justify-between pt-2">
                        <p className="text-sm text-[var(--color-neutral-400)]">
                          <span className="text-[var(--color-earth-copper)]">*</span> Required fields
                        </p>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--color-earth-copper)] to-[var(--color-earth-gold)] text-white font-semibold shadow-lg shadow-[var(--color-earth-copper)]/25 hover:shadow-xl hover:shadow-[var(--color-earth-copper)]/30 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send size={18} />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ / Additional Info Section */}
      <section className="py-20 bg-[var(--color-brand-primary)]">
        <div className="site-container">
          <AnimatedSection animation="fade-in-up" className="text-center mb-16">
            <span className="section-badge section-badge--bordered mb-6 border-[var(--color-earth-gold-bright)]/40 text-[var(--color-earth-gold-bright)]">
              FAQ
            </span>
            <h2 className="display-3 text-on-dark mb-4">
              Frequently Asked Questions
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                q: "What types of minerals do you explore?",
                a: "We focus on copper, zinc, lead, silver, gold, iron, nickel and cobalt. Additionally, our target is traces of REE (Rare Earth Elements)."
              },
              {
                q: "How can I invest in Pure Minerals?",
                a: "Contact us directly to discuss investment opportunities. We offer various partnership and investment models."
              },
              {
                q: "Where are your projects located?",
                a: "Our primary exploration areas are in the Steinkjer region of Trøndelag County, including Skrattåsen and Gaulstad/Mokk."
              },
              {
                q: "Do you offer site visits?",
                a: "Yes, we arrange site visits for qualified investors and partners. Please contact us to schedule."
              },
              {
                q: "What is NorChain tokenization?",
                a: "Our assets are tokenized on the NorChain blockchain, enabling transparent and accessible investment opportunities."
              },
              {
                q: "How quickly do you respond?",
                a: "We aim to respond to all inquiries within 24-48 business hours."
              },
            ].map((faq, index) => (
              <AnimatedSection
                key={index}
                animation="fade-in-up"
                delay={index * 100}
              >
                <div className="p-6 rounded-xl bg-white/[0.05] border border-white/10 hover:border-[var(--color-earth-gold-bright)]/30 transition-all h-full">
                  <h3 className="text-white font-semibold text-lg mb-3"><span className="text-[var(--color-earth-gold-bright)]">{faq.q}</span></h3>
                  <p className="text-white/70 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--color-neutral-100)]">
        <div className="site-container-narrow text-center">
          <AnimatedSection animation="fade-in-up">
            <h2 className="display-3 text-on-light mb-6">
              Prefer to Explore First?
            </h2>
            <p className="lead mb-10 max-w-xl mx-auto">
              Learn more about our active exploration areas and company background before reaching out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--color-earth-copper)] to-[var(--color-earth-gold)] text-white font-semibold shadow-lg shadow-[var(--color-earth-copper)]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                View Projects
                <ArrowRight size={18} />
              </a>
              <a
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] font-semibold hover:bg-[var(--color-brand-primary)] hover:text-white transition-all"
              >
                About Us
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
