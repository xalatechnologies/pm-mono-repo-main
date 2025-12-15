import Button from "../components/ui/Button";

export const metadata = {
  title: "Laboratories | Pure Minerals",
  description: "Laboratories used for analysis and verification.",
};

const labs = [
  {
    name: "Stratum Reservoir",
    country: "United Kingdom",
    notes: "Independent lab services supporting reservoir and sample analysis workflows.",
  },
  {
    name: "AGAT",
    country: "Canada",
    notes: "Analytical services supporting geochemical and mineral sample testing.",
  },
  {
    name: "ALS",
    country: "Ireland",
    notes: "International laboratory services for geochemistry and exploration programs.",
  },
] as const;

export default function LaboratoriesPage() {
  return (
    <main className="bg-[var(--background)]">
      <section className="py-16 md:py-20">
        <div className="site-container">
          <div className="max-w-3xl">
            <span className="section-badge section-badge--filled mb-6">Resources</span>
            <h1 className="display-2 text-on-light mb-4">Laboratories Used</h1>
            <p className="lead text-[var(--color-neutral-600)]">
              We work with reputable laboratories to support reliable analysis and
              verification across our exploration programs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {labs.map((lab) => (
              <div
                key={lab.name}
                className="p-7 rounded-2xl bg-white border border-[var(--color-neutral-200)] hover:border-[var(--color-earth-copper)]/40 hover:shadow-lg transition-all"
              >
                <div className="text-xs uppercase tracking-widest text-[var(--color-neutral-500)] mb-2">
                  {lab.country}
                </div>
                <h2 className="text-xl font-semibold text-[var(--color-brand-primary)] mb-3">
                  {lab.name}
                </h2>
                <p className="text-[var(--color-neutral-700)] text-sm leading-relaxed">
                  {lab.notes}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex gap-4 flex-col sm:flex-row">
            <Button href="/contact" variant="primary" size="md">
              Ask About Methods & QA/QC
            </Button>
            <Button href="/report-archive" variant="outline" size="md">
              Back to Report Archive
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}


