import AnimatedSection from "../components/ui/AnimatedSection";

export default function TermsPage() {
  return (
    <main className="bg-[var(--background)] min-h-screen">
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AnimatedSection animation="fade-in-up">
            <h1 className="text-4xl font-serif font-bold text-[var(--primary)] mb-8">
              Terms of Service
            </h1>
            
            <div className="prose prose-lg max-w-none text-[var(--stone-grey)]">
              <p className="text-lg mb-6">
                Last updated: December 2025
              </p>

              <h2 className="text-2xl font-serif font-bold text-[var(--primary)] mt-8 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="mb-4">
                By accessing and using this website, you accept and agree to be bound by the terms 
                and provisions of this agreement. If you do not agree to these terms, please do not 
                use this website.
              </p>

              <h2 className="text-2xl font-serif font-bold text-[var(--primary)] mt-8 mb-4">
                2. Use of Website
              </h2>
              <p className="mb-4">
                This website is provided for informational purposes about Pure Minerals AS and its 
                exploration activities. You agree to use this website only for lawful purposes and 
                in a way that does not infringe the rights of others.
              </p>

              <h2 className="text-2xl font-serif font-bold text-[var(--primary)] mt-8 mb-4">
                3. Intellectual Property
              </h2>
              <p className="mb-4">
                All content on this website, including text, graphics, logos, images, and software, 
                is the property of Pure Minerals AS and is protected by Norwegian and international 
                copyright laws.
              </p>

              <h2 className="text-2xl font-serif font-bold text-[var(--primary)] mt-8 mb-4">
                4. Disclaimer
              </h2>
              <p className="mb-4">
                The information provided on this website is for general informational purposes only. 
                While we strive to keep the information up to date and accurate, we make no 
                representations or warranties of any kind about the completeness, accuracy, or 
                reliability of the information.
              </p>

              <h2 className="text-2xl font-serif font-bold text-[var(--primary)] mt-8 mb-4">
                5. Investment Disclaimer
              </h2>
              <p className="mb-4">
                Nothing on this website constitutes investment advice or a solicitation to invest. 
                Any investment decisions should be made after consulting with qualified financial 
                advisors and conducting your own due diligence.
              </p>

              <h2 className="text-2xl font-serif font-bold text-[var(--primary)] mt-8 mb-4">
                6. Contact
              </h2>
              <p className="mb-4">
                For any questions regarding these Terms of Service, please contact us at:
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

