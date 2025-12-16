import AnimatedSection from "../components/ui/AnimatedSection";
import Link from "next/link";
import { FileText, Scale, AlertTriangle, Globe, Mail } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="bg-[var(--background)] min-h-screen">
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-primary)] via-[var(--color-earth-slate)] to-[var(--color-earth-obsidian)]" />
        <div className="site-container relative z-10">
          <AnimatedSection animation="fade-in-up" className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 border border-white/20">
              <Scale size={16} className="text-[var(--color-earth-gold-bright)]" />
              <span className="text-white/90 text-sm font-medium">Legal Document</span>
            </div>
            <h1 className="display-2 text-on-dark mb-4">Terms of Service</h1>
            <p className="lead text-on-dark-muted max-w-2xl mx-auto">
              Terms and conditions governing your use of this website
            </p>
            <p className="text-sm text-white/60 mt-4">Last updated: December 2025</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AnimatedSection animation="fade-in-up">
            <div className="prose prose-lg max-w-none">

              {/* Important Notice */}
              <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 mb-12">
                <h2 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">
                  <AlertTriangle size={20} className="text-amber-600" />
                  Important Notice
                </h2>
                <p className="text-amber-700 text-sm mb-0">
                  By accessing this website, you agree to be bound by these Terms of Service. 
                  This website contains information about mining exploration activities and should 
                  not be construed as investment advice. Please read the Investment Disclaimer 
                  carefully in Section 7.
                </p>
              </div>

              {/* Section 1 */}
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)] mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-[var(--color-neutral-700)] mb-4">
                  By accessing and using the Pure Minerals AS website (&quot;Website&quot;), you accept and agree 
                  to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, 
                  please do not use this Website.
                </p>
                <p className="text-[var(--color-neutral-700)] mb-4">
                  These Terms constitute a legally binding agreement between you and Pure Minerals AS 
                  (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), a Norwegian company registered with 
                  organization number NO 928 309 231 MVA.
                </p>
              </section>

              {/* Section 2 */}
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)] mb-4">
                  2. Use of Website
                </h2>
                <h3 className="text-lg font-semibold text-[var(--color-brand-primary)] mt-6 mb-3">
                  2.1 Permitted Use
                </h3>
                <p className="text-[var(--color-neutral-700)] mb-4">
                  This Website is provided for informational purposes about Pure Minerals AS and its 
                  exploration activities. You may use this Website only for lawful purposes and in 
                  accordance with these Terms.
                </p>

                <h3 className="text-lg font-semibold text-[var(--color-brand-primary)] mt-6 mb-3">
                  2.2 Prohibited Conduct
                </h3>
                <p className="text-[var(--color-neutral-700)] mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-[var(--color-neutral-700)]">
                  <li>Use the Website in violation of any applicable law or regulation</li>
                  <li>Attempt to gain unauthorized access to any part of the Website</li>
                  <li>Interfere with or disrupt the Website or its servers</li>
                  <li>Use automated systems to access the Website without permission</li>
                  <li>Reproduce, distribute, or commercially exploit Website content without authorization</li>
                  <li>Misrepresent your identity or affiliation</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)] mb-4">
                  3. Intellectual Property Rights
                </h2>
                <p className="text-[var(--color-neutral-700)] mb-4">
                  All content on this Website, including but not limited to text, graphics, logos, images, 
                  photographs, maps, geological data, and software, is the property of Pure Minerals AS 
                  or its licensors and is protected by Norwegian and international copyright, trademark, 
                  and other intellectual property laws.
                </p>
                <p className="text-[var(--color-neutral-700)] mb-4">
                  You may not reproduce, modify, distribute, display, perform, or otherwise use any content 
                  from this Website without our prior written consent, except for personal, non-commercial 
                  use with proper attribution.
                </p>
              </section>

              {/* Section 4 */}
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)] mb-4">
                  4. Information Accuracy
                </h2>
                <p className="text-[var(--color-neutral-700)] mb-4">
                  While we strive to provide accurate and up-to-date information, the information on this 
                  Website is provided &quot;as is&quot; without warranties of any kind. We do not guarantee the 
                  completeness, accuracy, reliability, or suitability of the information for any particular 
                  purpose.
                </p>
                <p className="text-[var(--color-neutral-700)] mb-4">
                  Geological and exploration data presented on this Website represents our best estimates 
                  based on available information and should not be considered as verified mineral resources 
                  or reserves unless explicitly stated.
                </p>
              </section>

              {/* Section 5 - Forward-Looking Statements */}
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)] mb-4">
                  5. Forward-Looking Statements
                </h2>
                <div className="p-4 bg-[var(--color-neutral-100)] rounded-xl border-l-4 border-[var(--color-earth-copper)]">
                  <p className="text-[var(--color-neutral-700)] mb-4">
                    This Website may contain forward-looking statements regarding our exploration activities, 
                    business plans, and prospects. These statements are based on current expectations and 
                    assumptions and involve known and unknown risks and uncertainties.
                  </p>
                  <p className="text-[var(--color-neutral-700)] mb-0">
                    Actual results may differ materially from those projected due to factors including, 
                    but not limited to: geological conditions, commodity prices, regulatory changes, 
                    financing availability, and general economic conditions.
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)] mb-4">
                  6. Virtual Data Room (VDR)
                </h2>
                <p className="text-[var(--color-neutral-700)] mb-4">
                  Access to the Virtual Data Room is subject to additional terms and confidentiality 
                  agreements. VDR access is granted at our sole discretion to qualified parties after 
                  verification of identity and purpose.
                </p>
                <p className="text-[var(--color-neutral-700)] mb-4">
                  Information obtained through the VDR is confidential and may not be disclosed, reproduced, 
                  or used for any purpose other than evaluating a potential business relationship with 
                  Pure Minerals AS.
                </p>
              </section>

              {/* Section 7 - Investment Disclaimer */}
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)] mb-4 flex items-center gap-2">
                  <AlertTriangle size={24} className="text-[var(--color-earth-copper)]" />
                  7. Investment Disclaimer
                </h2>
                <div className="p-6 rounded-2xl bg-red-50 border border-red-200">
                  <p className="text-red-800 mb-4 font-semibold">
                    IMPORTANT: This is not investment advice.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-red-700">
                    <li>
                      Nothing on this Website constitutes an offer to sell, or a solicitation of an offer 
                      to buy, any securities or investment products.
                    </li>
                    <li>
                      Information presented should not be construed as financial, legal, tax, or investment 
                      advice.
                    </li>
                    <li>
                      Mineral exploration is inherently speculative and involves significant risks, including 
                      the possibility of total loss of investment.
                    </li>
                    <li>
                      Past performance and historical data do not guarantee future results.
                    </li>
                    <li>
                      Any investment decisions should be made only after consulting with qualified financial, 
                      legal, and tax advisors and conducting independent due diligence.
                    </li>
                    <li>
                      Information about tokenized assets on NorChain is for informational purposes only and 
                      does not constitute a securities offering.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 8 - Limitation of Liability */}
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)] mb-4">
                  8. Limitation of Liability
                </h2>
                <p className="text-[var(--color-neutral-700)] mb-4">
                  To the fullest extent permitted by Norwegian law:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-[var(--color-neutral-700)]">
                  <li>
                    Pure Minerals AS, its directors, officers, employees, and agents shall not be liable 
                    for any direct, indirect, incidental, special, consequential, or punitive damages 
                    arising from your use of this Website.
                  </li>
                  <li>
                    We are not liable for any errors, omissions, or inaccuracies in the content, or for 
                    any actions taken in reliance on information provided on this Website.
                  </li>
                  <li>
                    Our total liability for any claims arising from your use of this Website shall not 
                    exceed NOK 10,000.
                  </li>
                </ul>
              </section>

              {/* Section 9 - Indemnification */}
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)] mb-4">
                  9. Indemnification
                </h2>
                <p className="text-[var(--color-neutral-700)] mb-4">
                  You agree to indemnify, defend, and hold harmless Pure Minerals AS and its affiliates, 
                  directors, officers, employees, and agents from any claims, damages, losses, liabilities, 
                  costs, and expenses (including legal fees) arising from:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-[var(--color-neutral-700)]">
                  <li>Your use of this Website</li>
                  <li>Your violation of these Terms</li>
                  <li>Your violation of any third-party rights</li>
                  <li>Any content you submit to this Website</li>
                </ul>
              </section>

              {/* Section 10 - Third-Party Links */}
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)] mb-4">
                  10. Third-Party Links
                </h2>
                <p className="text-[var(--color-neutral-700)] mb-4">
                  This Website may contain links to third-party websites, including NorChain and partner 
                  organizations. We are not responsible for the content, privacy practices, or availability 
                  of these external sites. Linking to a third-party site does not imply endorsement.
                </p>
              </section>

              {/* Section 11 - Governing Law */}
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)] mb-4 flex items-center gap-2">
                  <Globe size={24} className="text-[var(--color-earth-copper)]" />
                  11. Governing Law & Jurisdiction
                </h2>
                <p className="text-[var(--color-neutral-700)] mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of the 
                  Kingdom of Norway, without regard to its conflict of law provisions.
                </p>
                <p className="text-[var(--color-neutral-700)] mb-4">
                  Any disputes arising from these Terms or your use of this Website shall be subject 
                  to the exclusive jurisdiction of the courts of Norway, with Inntrøndelag District 
                  Court (Inntrøndelag tingrett) as the agreed legal venue.
                </p>
              </section>

              {/* Section 12 - Severability */}
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)] mb-4">
                  12. Severability
                </h2>
                <p className="text-[var(--color-neutral-700)] mb-4">
                  If any provision of these Terms is found to be invalid, illegal, or unenforceable, 
                  the remaining provisions shall continue in full force and effect. The invalid provision 
                  shall be modified to the minimum extent necessary to make it valid and enforceable.
                </p>
              </section>

              {/* Section 13 - Changes */}
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)] mb-4">
                  13. Changes to Terms
                </h2>
                <p className="text-[var(--color-neutral-700)] mb-4">
                  We reserve the right to modify these Terms at any time. Changes will be effective 
                  immediately upon posting to this Website. Your continued use of the Website after 
                  any changes constitutes acceptance of the modified Terms.
                </p>
                <p className="text-[var(--color-neutral-700)] mb-4">
                  We recommend reviewing these Terms periodically to stay informed of any updates.
                </p>
              </section>

              {/* Section 14 - Contact */}
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)] mb-4">
                  14. Contact Information
                </h2>
                <p className="text-[var(--color-neutral-700)] mb-4">
                  For questions regarding these Terms of Service, please contact:
                </p>
                <div className="p-4 bg-[var(--color-neutral-100)] rounded-xl mb-6">
                  <p className="font-semibold text-[var(--color-brand-primary)]">Pure Minerals AS</p>
                  <p className="text-[var(--color-neutral-600)]">
                    Ølvegata 18B, 7715 Steinkjer, Norway<br />
                    Organization number: NO 928 309 231 MVA<br />
                    Email:{" "}
                    <a href="mailto:post@pureminerals.no" className="text-[var(--color-earth-copper)] hover:underline">
                      post@pureminerals.no
                    </a>
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="mailto:post@pureminerals.no"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-earth-copper)] text-white font-semibold hover:bg-[var(--color-earth-copper-dark)] transition-colors"
                  >
                    <Mail size={18} />
                    Email Us
                  </a>
                  <Link
                    href="/privacy"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] font-semibold hover:bg-[var(--color-brand-primary)] hover:text-white transition-colors"
                  >
                    <FileText size={18} />
                    Privacy Policy
                  </Link>
                </div>
              </section>

            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
