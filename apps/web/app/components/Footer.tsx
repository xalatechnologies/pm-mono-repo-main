import Link from "next/link";
import { Mail, MapPin, ExternalLink, Linkedin, Twitter } from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about#team" },
    { label: "Careers", href: "/contact" },
  ],
  projects: [
    { label: "Overview", href: "/projects" },
    { label: "Skrattåsen", href: "/projects/skrattaasen" },
    { label: "Gaulstad/Mokk", href: "/projects/mokk" },
  ],
  resources: [
    { label: "News & Updates", href: "/articles" },
    { label: "Contact", href: "/contact" },
    { label: "NorChain", href: "https://norchain.org", external: true },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--primary)] text-white relative">
      {/* Top Gold Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--secondary)] to-transparent" />
      
      {/* Main Footer */}
      <div className="site-container py-16 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <div className="flex flex-col gap-1">
                <span className="brand-name text-2xl text-white">
                  PURE MINERALS
                </span>
                <span className="tagline">
                  Geological Exploration
                </span>
              </div>
            </Link>
            <p className="text-on-dark-muted body-small mb-6">
              Norwegian exploration company focused on sustainable mineral
              development in the Trøndelag region.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[var(--secondary)] transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[var(--secondary)] transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="label text-on-dark-subtle mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="footer-link text-on-dark-muted hover:text-[var(--secondary)] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects Links */}
          <div>
            <h3 className="label text-on-dark-subtle mb-5">
              Projects
            </h3>
            <ul className="space-y-3">
              {footerLinks.projects.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="footer-link text-on-dark-muted hover:text-[var(--secondary)] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="label text-on-dark-subtle mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-copper flex-shrink-0 mt-0.5" />
                <span className="footer-link text-on-dark-muted">
                  Steinkjer, Trøndelag<br />
                  Norway
                </span>
              </li>
              <li>
                <a
                  href="mailto:contact@pureminerals.no"
                  className="flex items-center gap-3 footer-link text-on-dark-muted hover:text-[var(--secondary)] transition-colors duration-300"
                >
                  <Mail size={18} className="text-copper" />
                  contact@pureminerals.no
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* NorChain Partnership Banner */}
      <div className="border-t border-white/10">
        <div className="site-container py-6">
          <a
            href="https://norchain.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center sm:justify-between flex-wrap gap-4 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--secondary)] flex items-center justify-center text-white font-bold text-lg font-serif">
                N
              </div>
              <div>
                <div className="body-small weight-semibold text-on-dark group-hover:text-[var(--secondary)] transition-colors">
                  Assets Tokenized on NorChain
                </div>
                <div className="caption text-on-dark-subtle">
                  The Complete Blockchain Operating System
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-on-dark-subtle group-hover:text-[var(--secondary)] transition-colors body-small">
              <span>Visit NorChain</span>
              <ExternalLink size={14} />
            </div>
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="site-container py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 body-small text-on-dark-subtle">
            <p>© {currentYear} Pure Minerals AS. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
