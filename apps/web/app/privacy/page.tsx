import AnimatedSection from "../components/ui/AnimatedSection";

export default function PrivacyPage() {
  return (
    <main className="bg-[var(--background)] min-h-screen">
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AnimatedSection animation="fade-in-up">
            <h1 className="text-4xl font-serif font-bold text-[var(--primary)] mb-8">
              Privacy Policy
            </h1>
            
            <div className="prose prose-lg max-w-none text-[var(--stone-grey)]">
              <p className="text-lg mb-6">
                Last updated: December 2025
              </p>

              <h2 className="text-2xl font-serif font-bold text-[var(--primary)] mt-8 mb-4">
                1. Introduction
              </h2>
              <p className="mb-4">
                Pure Minerals AS (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, and safeguard your information when you 
                visit our website.
              </p>

              <h2 className="text-2xl font-serif font-bold text-[var(--primary)] mt-8 mb-4">
                2. Information We Collect
              </h2>
              <p className="mb-4">
                We may collect information you provide directly to us, such as when you fill out a 
                contact form, subscribe to our newsletter, or communicate with us. This may include:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Name and contact information</li>
                <li>Email address</li>
                <li>Company name</li>
                <li>Any other information you choose to provide</li>
              </ul>

              <h2 className="text-2xl font-serif font-bold text-[var(--primary)] mt-8 mb-4">
                3. How We Use Your Information
              </h2>
              <p className="mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Respond to your inquiries and requests</li>
                <li>Send you updates about our projects and company news</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-serif font-bold text-[var(--primary)] mt-8 mb-4">
                4. Contact Us
              </h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mb-4">
                <strong>Pure Minerals AS</strong><br />
                Steinkjer, Trøndelag<br />
                Norway<br />
                Email: contact@pureminerals.no
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}

