import Button from "../components/ui/Button";

export const metadata = {
  title: "Exploration Specialists | Pure Minerals",
  description: "Specialist partners supporting our exploration programs.",
};

const specialists = [
  {
    name: "GeoVista AB",
    focus: "Geological mapping & interpretation",
    notes: "High-performance geological mapping and evaluation of existing geophysical data.",
  },
  {
    name: "Sunnfjord Geo Center (SGC)",
    focus: "Field surveys & geoscience services",
    notes: "Fieldwork execution, mapping support, and integrated survey delivery.",
  },
  {
    name: "Geopark Vest (Espen)",
    focus: "Local expertise & regional geology",
    notes: "Regional knowledge and on-the-ground support in Norway.",
  },
  {
    name: "Internal",
    focus: "Project management & technical oversight",
    notes: "Planning, prioritization, and quality control across exploration programs.",
  },
] as const;

export default function ExplorationSpecialistsPage() {
  return (
    <main className="bg-[var(--background)]">
      <section className="py-16 md:py-20">
        <div className="site-container">
          <div className="max-w-3xl">
            <span className="section-badge section-badge--filled mb-6">Resources</span>
            <h1 className="display-2 text-on-light mb-4">Exploration Specialists</h1>
            <p className="lead text-[var(--color-neutral-600)]">
              Our exploration programs are supported by experienced specialists and trusted
              partners across fieldwork, mapping, interpretation, and technical oversight.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {specialists.map((s) => (
              <div
                key={s.name}
                className="p-7 rounded-2xl bg-white border border-[var(--color-neutral-200)] hover:border-[var(--color-earth-copper)]/40 hover:shadow-lg transition-all"
              >
                <h2 className="text-xl font-semibold text-[var(--color-brand-primary)] mb-1">
                  {s.name}
                </h2>
                <div className="text-sm text-[var(--color-earth-copper)] font-medium mb-3">
                  {s.focus}
                </div>
                <p className="text-[var(--color-neutral-700)] text-sm leading-relaxed">
                  {s.notes}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex gap-4 flex-col sm:flex-row">
            <Button href="/partners" variant="primary" size="md">
              See Partners
            </Button>
            <Button href="/contact" variant="outline" size="md">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}


