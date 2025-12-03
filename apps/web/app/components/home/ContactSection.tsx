"use client";

import { useState } from "react";
import AnimatedSection from "../ui/AnimatedSection";
import {
  Mail,
  MapPin,
  Building2,
  Send,
  CheckCircle,
  Globe,
  Clock,
} from "lucide-react";

const contactInfo = [
  {
    icon: <Building2 size={22} strokeWidth={1.5} />,
    title: "Company",
    content: "Pure Minerals AS",
    subContent: "Org.nr: NO 928 309 231 MVA",
  },
  {
    icon: <MapPin size={22} strokeWidth={1.5} />,
    title: "Address",
    content: "Ølvegata 18B",
    subContent: "7715 Steinkjer, Norway",
  },
  {
    icon: <Mail size={22} strokeWidth={1.5} />,
    title: "Email",
    content: "post@pureminerals.no",
    href: "mailto:post@pureminerals.no",
  },
  {
    icon: <Clock size={22} strokeWidth={1.5} />,
    title: "Response Time",
    content: "Within 24-48 hours",
    subContent: "Monday - Friday",
  },
];

export default function ContactSection() {
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
    setError(null); // Clear error on input change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Option 1: Send via Web3Forms (free form submission service)
      // Replace YOUR_ACCESS_KEY with actual key from https://web3forms.com
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY",
          name: formData.name,
          email: formData.email,
          company: formData.company || "Not specified",
          subject: `Pure Minerals Contact: ${formData.subject}`,
          message: formData.message,
          from_name: "Pure Minerals Website",
          to: "post@pureminerals.no",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          subject: "",
          message: "",
        });
      } else {
        // Fallback to mailto if API fails
        handleMailtoFallback();
      }
    } catch {
      // Fallback to mailto link if fetch fails
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
    <section className="relative py-24 md:py-32 overflow-hidden bg-[var(--color-brand-primary)]">
      {/* Background decorations */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-primary)] via-[var(--color-earth-slate)] to-[var(--color-earth-obsidian)]" />
        
        {/* Decorative orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-earth-copper)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-earth-patina)]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="contact-dots" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contact-dots)" />
          </svg>
        </div>
      </div>

      <div className="site-container relative z-10">
        {/* Section Header */}
        <AnimatedSection animation="fade-in-up" className="text-center mb-16">
          <span className="section-badge section-badge--bordered backdrop-blur-sm mb-6 border-[var(--color-earth-copper)]/40">
            Get in Touch
          </span>
          <h2 className="display-2 text-on-dark mb-6 text-balance">
            Ready to Explore{" "}
            <span className="text-copper">Opportunities?</span>
          </h2>
          <p className="lead text-on-dark-muted max-w-2xl mx-auto text-balance">
            Connect with our team to discuss exploration projects, 
            investment opportunities, or partnership possibilities.
          </p>
        </AnimatedSection>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left Column - Info & Map */}
          <AnimatedSection animation="slide-in-left" delay={200}>
            <div className="space-y-8">
              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <div
                    key={info.title}
                    className="group relative p-6 rounded-xl bg-white/[0.08] backdrop-blur-sm border border-white/20 hover:border-[#f0c878]/60 hover:bg-white/[0.12] transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Icon */}
                    <div className="w-11 h-11 rounded-lg bg-[#e8b86d]/25 flex items-center justify-center text-[#f0c878] mb-4 group-hover:bg-[#e8b86d]/40 transition-colors">
                      {info.icon}
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#f0c878] mb-3">
                      <span className="text-[var(--color-earth-copper)]">{info.title}</span>
                    </h3>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-white font-semibold text-lg hover:text-[#f0c878] transition-colors block"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-white font-semibold text-lg">{info.content}</p>
                    )}
                    {info.subContent && (
                      <p className="text-white/80 text-sm mt-2">{info.subContent}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="relative rounded-2xl overflow-hidden border border-white/15 aspect-[4/3]">
                {/* Embedded OpenStreetMap */}
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=11.4,64.0,11.6,64.1&layer=mapnik&marker=64.0167,11.4950"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Pure Minerals Location - Steinkjer, Norway"
                  className="grayscale-[50%] opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                />
                
                {/* Map overlay card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-[var(--color-brand-primary)]/95 backdrop-blur-md rounded-xl border border-white/20 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-earth-copper)] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[var(--color-earth-copper)]/30">
                      <MapPin size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">Steinkjer, Norway</p>
                      <p className="text-white/75 text-sm">Trøndelag Region</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://pureminerals.no"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-medium hover:bg-[var(--color-earth-copper)]/20 hover:border-[var(--color-earth-copper)]/50 hover:text-white transition-all text-sm"
                >
                  <Globe size={16} className="text-[var(--color-earth-copper-light)]" />
                  pureminerals.no
                </a>
                <a
                  href="mailto:post@pureminerals.no"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-medium hover:bg-[var(--color-earth-copper)]/20 hover:border-[var(--color-earth-copper)]/50 hover:text-white transition-all text-sm"
                >
                  <Mail size={16} className="text-[var(--color-earth-copper-light)]" />
                  post@pureminerals.no
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* Right Column - Contact Form */}
          <AnimatedSection animation="slide-in-right" delay={300}>
            <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
              {isSubmitted ? (
                /* Success State */
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-[var(--color-earth-patina)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-[var(--color-earth-patina)]" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-[var(--color-brand-primary)] mb-4">
                    Message Sent!
                  </h3>
                  <p className="text-[var(--color-neutral-500)] mb-8">
                    Thank you for reaching out. We&apos;ll get back to you within 24-48 hours.
                  </p>
                  <button
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
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] font-semibold hover:bg-[var(--color-brand-primary)] hover:text-white transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                /* Form */
                <>
                  <div className="mb-8">
                    <h3 className="text-2xl font-display font-bold text-[var(--color-brand-primary)] mb-2">
                      Send Us a Message
                    </h3>
                    <p className="text-[var(--color-neutral-500)]">
                      Fill out the form and our team will respond promptly.
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
                          htmlFor="contact-name"
                          className="block text-sm font-semibold text-[var(--color-brand-primary)] mb-2"
                        >
                          Full Name <span className="text-[var(--color-earth-copper)]">*</span>
                        </label>
                        <input
                          type="text"
                          id="contact-name"
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
                          htmlFor="contact-email"
                          className="block text-sm font-semibold text-[var(--color-brand-primary)] mb-2"
                        >
                          Email <span className="text-[var(--color-earth-copper)]">*</span>
                        </label>
                        <input
                          type="email"
                          id="contact-email"
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
                          htmlFor="contact-company"
                          className="block text-sm font-semibold text-[var(--color-brand-primary)] mb-2"
                        >
                          Company
                        </label>
                        <input
                          type="text"
                          id="contact-company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-[var(--color-neutral-200)] focus:border-[var(--color-earth-copper)] focus:ring-4 focus:ring-[var(--color-earth-copper)]/10 outline-none transition-all bg-[var(--color-neutral-50)]"
                          placeholder="Your Company"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-subject"
                          className="block text-sm font-semibold text-[var(--color-brand-primary)] mb-2"
                        >
                          Subject <span className="text-[var(--color-earth-copper)]">*</span>
                        </label>
                        <select
                          id="contact-subject"
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
                        htmlFor="contact-message"
                        className="block text-sm font-semibold text-[var(--color-brand-primary)] mb-2"
                      >
                        Message <span className="text-[var(--color-earth-copper)]">*</span>
                      </label>
                      <textarea
                        id="contact-message"
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
  );
}

