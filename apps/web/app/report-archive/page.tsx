import Link from "next/link";
import Button from "../components/ui/Button";
import { FileText, Clock, Mail } from "lucide-react";

export const metadata = {
  title: "Report Archive | Pure Minerals",
  description: "Archive of Pure Minerals reports and selected external documents.",
};

export default function ReportArchivePage() {
  return (
    <main className="bg-[var(--background)]">
      <section className="py-16 md:py-20">
        <div className="site-container">
          <div className="max-w-3xl">
            <span className="section-badge section-badge--filled mb-6">Resources</span>
            <h1 className="display-2 text-on-light mb-4">Report Archive</h1>
            <p className="lead text-[var(--color-neutral-600)]">
              Access company reports and selected external documents related to our license
              portfolio and exploration activity.
            </p>
          </div>

          {/* Coming Soon Notice */}
          <div className="mt-12 p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[var(--color-neutral-50)] to-white border-2 border-[var(--color-earth-copper)]/20 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--color-earth-copper)]/10 flex items-center justify-center">
                <Clock size={24} className="text-[var(--color-earth-copper)]" />
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-earth-copper)]/10 border border-[var(--color-earth-copper)]/20 mb-4">
                  <span className="text-xs font-semibold text-[var(--color-earth-copper)] uppercase tracking-wider">
                    Coming Soon
                  </span>
                </div>
                <h2 className="text-2xl font-display font-bold text-[var(--color-brand-primary)] mb-3">
                  Report Archive Under Development
                </h2>
                <p className="text-[var(--color-neutral-700)] mb-4 leading-relaxed">
                  We are currently organizing our report archive to provide easy access to portfolio updates, 
                  exploration program summaries, technical memos, and fieldwork highlights. The archive will 
                  include both Pure Minerals reports and selected external documents.
                </p>
                <p className="text-[var(--color-neutral-600)] text-sm mb-6">
                  In the meantime, qualified investors and partners can request access to specific documents 
                  through our Virtual Data Room (VDR).
                </p>
              </div>
            </div>
          </div>

          {/* What Will Be Available */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="p-8 rounded-2xl bg-white border border-[var(--color-neutral-200)] hover:border-[var(--color-earth-copper)]/40 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-earth-copper)]/10 flex items-center justify-center mb-4">
                <FileText size={24} className="text-[var(--color-earth-copper)]" />
              </div>
              <h2 className="text-xl font-semibold text-[var(--color-brand-primary)] mb-3">
                Pure Minerals Reports
              </h2>
              <ul className="space-y-2 text-[var(--color-neutral-700)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-earth-copper)] mt-1">•</span>
                  <span>Portfolio updates and presentations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-earth-copper)] mt-1">•</span>
                  <span>Exploration program summaries</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-earth-copper)] mt-1">•</span>
                  <span>Technical memos and fieldwork highlights</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-earth-copper)] mt-1">•</span>
                  <span>Geological survey results and analysis</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[var(--color-neutral-200)] hover:border-[var(--color-earth-copper)]/40 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-earth-patina)]/10 flex items-center justify-center mb-4">
                <FileText size={24} className="text-[var(--color-earth-patina)]" />
              </div>
              <h2 className="text-xl font-semibold text-[var(--color-brand-primary)] mb-3">
                Selected External Documents
              </h2>
              <p className="text-[var(--color-neutral-700)] mb-4">
                Third-party references and supporting materials may be provided where relevant, including:
              </p>
              <ul className="space-y-2 text-[var(--color-neutral-700)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-earth-patina)] mt-1">•</span>
                  <span>Regulatory filings and permits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-earth-patina)] mt-1">•</span>
                  <span>Historical mining records</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-earth-patina)] mt-1">•</span>
                  <span>Geological survey references</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Button href="/vdr" variant="primary" size="md" icon={<FileText size={18} />}>
              Request VDR Access
            </Button>
            <Button href="/contact" variant="outline" size="md" icon={<Mail size={18} />}>
              Contact Us
            </Button>
            <Link
              href="/articles"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-[var(--color-neutral-300)] text-[var(--color-brand-primary)] hover:bg-[var(--color-neutral-50)] transition-colors"
            >
              News & Updates
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}


