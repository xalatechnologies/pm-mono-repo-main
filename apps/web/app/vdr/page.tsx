import Button from "../components/ui/Button";

export const metadata = {
  title: "VDR | Pure Minerals",
  description: "Virtual Data Room access for qualified investors and partners.",
};

export default function VdrPage() {
  return (
    <main className="bg-[var(--background)]">
      <section className="py-16 md:py-20">
        <div className="site-container">
          <div className="max-w-3xl">
            <span className="section-badge section-badge--filled mb-6">Resources</span>
            <h1 className="display-2 text-on-light mb-4">Virtual Data Room (VDR)</h1>
            <p className="lead text-[var(--color-neutral-600)]">
              The VDR provides controlled access to selected internal and supporting
              documents for qualified investors, partners, and stakeholders.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="p-8 rounded-2xl bg-white border border-[var(--color-neutral-200)]">
              <h2 className="text-xl font-semibold text-[var(--color-brand-primary)] mb-3">
                What you can request access to
              </h2>
              <ul className="space-y-2 text-[var(--color-neutral-700)]">
                <li>- Portfolio and license documentation</li>
                <li>- Technical memos and exploration summaries</li>
                <li>- Selected external references where applicable</li>
                <li>- Program plans and timelines (where relevant)</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[var(--color-neutral-200)]">
              <h2 className="text-xl font-semibold text-[var(--color-brand-primary)] mb-3">
                Access process
              </h2>
              <p className="text-[var(--color-neutral-700)] mb-3">
                Access is granted on a case-by-case basis. You may be asked to confirm
                your affiliation and accept confidentiality terms.
              </p>
              <p className="text-[var(--color-neutral-600)] text-sm">
                For faster handling, include your company name, role, and the purpose of
                access in your message.
              </p>
            </div>
          </div>

          <div className="mt-10 flex gap-4 flex-col sm:flex-row">
            <Button href="/contact" variant="primary" size="md">
              Request Access
            </Button>
            <Button href="/report-archive" variant="outline" size="md">
              View Report Archive
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}


