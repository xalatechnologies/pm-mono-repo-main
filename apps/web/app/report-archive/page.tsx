import Link from "next/link";
import Button from "../components/ui/Button";

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

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="p-8 rounded-2xl bg-white border border-[var(--color-neutral-200)]">
              <h2 className="text-xl font-semibold text-[var(--color-brand-primary)] mb-3">
                Pure Minerals Reports
              </h2>
              <ul className="space-y-2 text-[var(--color-neutral-700)]">
                <li>- Portfolio updates and presentations</li>
                <li>- Exploration program summaries</li>
                <li>- Technical memos and fieldwork highlights</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[var(--color-neutral-200)]">
              <h2 className="text-xl font-semibold text-[var(--color-brand-primary)] mb-3">
                Selected External Documents
              </h2>
              <p className="text-[var(--color-neutral-700)] mb-4">
                Third-party references and supporting materials may be provided where relevant.
              </p>
              <p className="text-[var(--color-neutral-600)] text-sm">
                Need access? Request via the Virtual Data Room (VDR) or contact our team.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Button href="/vdr" variant="primary" size="md">
              Request VDR Access
            </Button>
            <Button href="/contact" variant="outline" size="md">
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


