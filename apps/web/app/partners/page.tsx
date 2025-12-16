import Button from "../components/ui/Button";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Partners",
  description:
    "Pure Minerals collaborates with trusted partners including NorChain for blockchain tokenization, field service providers, professional services, and local community partners to execute exploration programs efficiently in Norway.",
  keywords: [
    "mining partners",
    "blockchain partners",
    "NorChain",
    "mining services",
    "exploration partners",
  ],
  canonical: "https://pureminerals.no/partners",
});

const partnerGroups = [
  {
    title: "Technology & Tokenization",
    items: ["NorChain"],
  },
  {
    title: "Field & Operations",
    items: ["Hjelle feltservice", "Mokk Hotell"],
  },
  {
    title: "Professional Services",
    items: ["Lawers"],
  },
  {
    title: "Local & Community",
    items: ["Additional local suppliers and collaborators (project-specific)"],
  },
] as const;

export default function PartnersPage() {
  return (
    <main className="bg-[var(--background)]">
      <section className="py-16 md:py-20">
        <div className="site-container">
          <div className="max-w-3xl">
            <span className="section-badge section-badge--filled mb-6">Resources</span>
            <h1 className="display-2 text-on-light mb-4">Partners</h1>
            <p className="lead text-[var(--color-neutral-600)]">
              We collaborate with trusted partners across technology, operations, and
              professional services to execute exploration programs efficiently and
              responsibly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {partnerGroups.map((group) => (
              <div
                key={group.title}
                className="p-7 rounded-2xl bg-white border border-[var(--color-neutral-200)] hover:border-[var(--color-earth-copper)]/40 hover:shadow-lg transition-all"
              >
                <h2 className="text-xl font-semibold text-[var(--color-brand-primary)] mb-3">
                  {group.title}
                </h2>
                <ul className="space-y-2 text-[var(--color-neutral-700)]">
                  {group.items.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 flex gap-4 flex-col sm:flex-row">
            <Button href="/contact" variant="primary" size="md">
              Propose a Partnership
            </Button>
            <Button href="/exploration-specialists" variant="outline" size="md">
              Exploration Specialists
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}


