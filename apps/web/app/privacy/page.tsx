import AnimatedSection from "../components/ui/AnimatedSection";
import Link from "next/link";
import { Mail, Shield, FileText, Clock, Globe, Lock } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="bg-[var(--background)] min-h-screen">
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-primary)] via-[var(--color-earth-slate)] to-[var(--color-earth-obsidian)]" />
        <div className="site-container relative z-10">
          <AnimatedSection animation="fade-in-up" className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 border border-white/20">
              <Shield size={16} className="text-[var(--color-earth-gold-bright)]" />
              <span className="text-white/90 text-sm font-medium">Legal Document</span>
            </div>
            <h1 className="display-2 text-on-dark mb-4">Privacy Policy</h1>
            <p className="lead text-on-dark-muted max-w-2xl mx-auto">
              How we collect, use, and protect your personal information
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
              
              {/* Quick Summary */}
              <div className="p-6 rounded-2xl bg-[var(--color-earth-copper)]/5 border border-[var(--color-earth-copper)]/20 mb-12">
                <h2 className="text-xl font-bold text-[var(--color-brand-primary)] mb-4 flex items-center gap-2">
                  <FileText size={20} className="text-[var(--color-earth-copper)]" />
                  Quick Summary
                </h2>
                <ul className="space-y-2 text-[var(--color-neutral-700)] text-sm">
                  <li>• We only collect data you provide directly (contact forms, emails)</li>
                  <li>• We use Google Analytics for anonymous website statistics</li>
                  <li>• We never sell your personal data to third parties</li>
                  <li>• You can request deletion of your data at any time</li>
                  <li>• We comply with GDPR and Norwegian data protection laws</li>
                </ul>
              </div>

              {/* Section 1 */}
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)] mb-4">
                  1. Data Controller
                </h2>
                <p className="text-[var(--color-neutral-700)] mb-4">
                  The data controller responsible for your personal data is:
                </p>
                <div className="p-4 bg-[var(--color-neutral-100)] rounded-xl">
                  <p className="font-semibold text-[var(--color-brand-primary)]">Pure Minerals AS</p>
                  <p className="text-[var(--color-neutral-600)]">
                    Organization number: NO 928 309 231 MVA<br />
                    Ølvegata 18B, 7715 Steinkjer, Norway<br />
                    Email: <a href="mailto:post@pureminerals.no" className="text-[var(--color-earth-copper)] hover:underline">post@pureminerals.no</a>
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)] mb-4">
                  2. Information We Collect
                </h2>
                
                <h3 className="text-lg font-semibold text-[var(--color-brand-primary)] mt-6 mb-3">
                  2.1 Information You Provide
                </h3>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-[var(--color-neutral-700)]">
                  <li><strong>Contact Information:</strong> Name, email address, company name when you submit forms</li>
                  <li><strong>Communication Data:</strong> Content of messages you send us</li>
                  <li><strong>VDR Access Requests:</strong> Professional information for due diligence access</li>
                </ul>

                <h3 className="text-lg font-semibold text-[var(--color-brand-primary)] mt-6 mb-3">
                  2.2 Automatically Collected Information
                </h3>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-[var(--color-neutral-700)]">
                  <li><strong>Analytics Data:</strong> Anonymous usage statistics via Google Analytics (pages visited, time on site, device type)</li>
                  <li><strong>Technical Data:</strong> IP address (anonymized), browser type, operating system</li>
                  <li><strong>Cookies:</strong> Essential and analytics cookies (see Section 6)</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)] mb-4">
                  3. Legal Basis for Processing (GDPR Article 6)
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-[var(--color-neutral-200)] rounded-xl overflow-hidden">
                    <thead className="bg-[var(--color-neutral-100)]">
                      <tr>
                        <th className="p-3 text-left font-semibold text-[var(--color-brand-primary)]">Purpose</th>
                        <th className="p-3 text-left font-semibold text-[var(--color-brand-primary)]">Legal Basis</th>
                      </tr>
                    </thead>
                    <tbody className="text-[var(--color-neutral-700)]">
                      <tr className="border-t border-[var(--color-neutral-200)]">
                        <td className="p-3">Responding to inquiries</td>
                        <td className="p-3">Legitimate interest / Contract performance</td>
                      </tr>
                      <tr className="border-t border-[var(--color-neutral-200)]">
                        <td className="p-3">Website analytics</td>
                        <td className="p-3">Consent (via cookie banner)</td>
                      </tr>
                      <tr className="border-t border-[var(--color-neutral-200)]">
                        <td className="p-3">VDR access management</td>
                        <td className="p-3">Contract performance / Legitimate interest</td>
                      </tr>
                      <tr className="border-t border-[var(--color-neutral-200)]">
                        <td className="p-3">Legal compliance</td>
                        <td className="p-3">Legal obligation</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 4 */}
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)] mb-4">
                  4. How We Use Your Information
                </h2>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-[var(--color-neutral-700)]">
                  <li>Respond to your inquiries and provide requested information</li>
                  <li>Process VDR access requests and manage investor relations</li>
                  <li>Improve our website and services through analytics</li>
                  <li>Send updates about our projects (only with your consent)</li>
                  <li>Comply with legal and regulatory obligations</li>
                  <li>Protect against fraud and ensure website security</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)] mb-4">
                  5. Data Sharing & Third Parties
                </h2>
                <p className="text-[var(--color-neutral-700)] mb-4">
                  We do not sell your personal data. We may share data with:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-[var(--color-neutral-700)]">
                  <li><strong>Google Analytics:</strong> Anonymous usage statistics (USA - Privacy Shield certified)</li>
                  <li><strong>Web3Forms:</strong> Contact form processing (Privacy-focused, no data storage)</li>
                  <li><strong>Legal authorities:</strong> When required by Norwegian law</li>
                  <li><strong>Professional advisors:</strong> Lawyers, accountants under confidentiality agreements</li>
                </ul>
              </section>

              {/* Section 6 - Cookies */}
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)] mb-4">
                  6. Cookies & Tracking Technologies
                </h2>
                
                <h3 className="text-lg font-semibold text-[var(--color-brand-primary)] mt-6 mb-3">
                  Essential Cookies
                </h3>
                <p className="text-[var(--color-neutral-700)] mb-4">
                  Required for website functionality. Cannot be disabled.
                </p>

                <h3 className="text-lg font-semibold text-[var(--color-brand-primary)] mt-6 mb-3">
                  Analytics Cookies (Google Analytics)
                </h3>
                <p className="text-[var(--color-neutral-700)] mb-4">
                  Help us understand how visitors use our website. You can opt-out via the cookie banner 
                  or by installing the{" "}
                  <a 
                    href="https://tools.google.com/dlpage/gaoptout" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[var(--color-earth-copper)] hover:underline"
                  >
                    Google Analytics Opt-out Browser Add-on
                  </a>.
                </p>

                <div className="p-4 bg-[var(--color-neutral-100)] rounded-xl">
                  <p className="text-sm text-[var(--color-neutral-600)]">
                    <strong>Cookie Settings:</strong> You can manage your cookie preferences at any time through 
                    your browser settings or by clicking the cookie settings link in the footer.
                  </p>
                </div>
              </section>

              {/* Section 7 - Data Retention */}
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)] mb-4 flex items-center gap-2">
                  <Clock size={24} className="text-[var(--color-earth-copper)]" />
                  7. Data Retention
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-[var(--color-neutral-200)] rounded-xl overflow-hidden">
                    <thead className="bg-[var(--color-neutral-100)]">
                      <tr>
                        <th className="p-3 text-left font-semibold text-[var(--color-brand-primary)]">Data Type</th>
                        <th className="p-3 text-left font-semibold text-[var(--color-brand-primary)]">Retention Period</th>
                      </tr>
                    </thead>
                    <tbody className="text-[var(--color-neutral-700)]">
                      <tr className="border-t border-[var(--color-neutral-200)]">
                        <td className="p-3">Contact form submissions</td>
                        <td className="p-3">2 years or until deletion request</td>
                      </tr>
                      <tr className="border-t border-[var(--color-neutral-200)]">
                        <td className="p-3">VDR access records</td>
                        <td className="p-3">Duration of access + 5 years</td>
                      </tr>
                      <tr className="border-t border-[var(--color-neutral-200)]">
                        <td className="p-3">Analytics data</td>
                        <td className="p-3">26 months (Google Analytics default)</td>
                      </tr>
                      <tr className="border-t border-[var(--color-neutral-200)]">
                        <td className="p-3">Email correspondence</td>
                        <td className="p-3">3 years from last contact</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 8 - Your Rights */}
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)] mb-4 flex items-center gap-2">
                  <Lock size={24} className="text-[var(--color-earth-copper)]" />
                  8. Your Rights Under GDPR
                </h2>
                <p className="text-[var(--color-neutral-700)] mb-4">
                  Under the General Data Protection Regulation (GDPR), you have the following rights:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: "Right of Access", desc: "Request a copy of your personal data" },
                    { title: "Right to Rectification", desc: "Correct inaccurate personal data" },
                    { title: "Right to Erasure", desc: "Request deletion of your data ('right to be forgotten')" },
                    { title: "Right to Restrict Processing", desc: "Limit how we use your data" },
                    { title: "Right to Data Portability", desc: "Receive your data in a portable format" },
                    { title: "Right to Object", desc: "Object to processing based on legitimate interests" },
                    { title: "Right to Withdraw Consent", desc: "Withdraw consent at any time" },
                    { title: "Right to Complain", desc: "Lodge a complaint with supervisory authority" },
                  ].map((right, idx) => (
                    <div key={idx} className="p-4 bg-[var(--color-neutral-50)] rounded-xl border border-[var(--color-neutral-200)]">
                      <h4 className="font-semibold text-[var(--color-brand-primary)] mb-1">{right.title}</h4>
                      <p className="text-sm text-[var(--color-neutral-600)]">{right.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[var(--color-neutral-700)] mt-4">
                  To exercise any of these rights, contact us at{" "}
                  <a href="mailto:post@pureminerals.no" className="text-[var(--color-earth-copper)] hover:underline">
                    post@pureminerals.no
                  </a>. We will respond within 30 days.
                </p>
              </section>

              {/* Section 9 - International Transfers */}
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)] mb-4 flex items-center gap-2">
                  <Globe size={24} className="text-[var(--color-earth-copper)]" />
                  9. International Data Transfers
                </h2>
                <p className="text-[var(--color-neutral-700)] mb-4">
                  Some of our service providers (e.g., Google Analytics) may process data outside the EEA. 
                  When this occurs, we ensure appropriate safeguards are in place:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-[var(--color-neutral-700)]">
                  <li>EU-US Data Privacy Framework certification</li>
                  <li>Standard Contractual Clauses (SCCs)</li>
                  <li>Adequacy decisions by the European Commission</li>
                </ul>
              </section>

              {/* Section 10 - Security */}
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)] mb-4">
                  10. Data Security
                </h2>
                <p className="text-[var(--color-neutral-700)] mb-4">
                  We implement appropriate technical and organizational measures to protect your data:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-[var(--color-neutral-700)]">
                  <li>HTTPS encryption for all data transmission</li>
                  <li>Secure hosting infrastructure</li>
                  <li>Access controls and authentication</li>
                  <li>Regular security assessments</li>
                </ul>
              </section>

              {/* Section 11 - Supervisory Authority */}
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)] mb-4">
                  11. Supervisory Authority
                </h2>
                <p className="text-[var(--color-neutral-700)] mb-4">
                  If you believe we have not handled your data correctly, you have the right to lodge a 
                  complaint with the Norwegian Data Protection Authority:
                </p>
                <div className="p-4 bg-[var(--color-neutral-100)] rounded-xl">
                  <p className="font-semibold text-[var(--color-brand-primary)]">Datatilsynet</p>
                  <p className="text-[var(--color-neutral-600)]">
                    Postboks 458 Sentrum, 0105 Oslo, Norway<br />
                    Phone: +47 22 39 69 00<br />
                    Website:{" "}
                    <a 
                      href="https://www.datatilsynet.no" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[var(--color-earth-copper)] hover:underline"
                    >
                      www.datatilsynet.no
                    </a>
                  </p>
                </div>
              </section>

              {/* Section 12 - Contact */}
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)] mb-4">
                  12. Contact Us
                </h2>
                <p className="text-[var(--color-neutral-700)] mb-4">
                  For any questions about this Privacy Policy or to exercise your rights:
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="mailto:post@pureminerals.no"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-earth-copper)] text-white font-semibold hover:bg-[var(--color-earth-copper-dark)] transition-colors"
                  >
                    <Mail size={18} />
                    Email Us
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] font-semibold hover:bg-[var(--color-brand-primary)] hover:text-white transition-colors"
                  >
                    Contact Form
                  </Link>
                </div>
              </section>

              {/* Section 13 - Changes */}
              <section>
                <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)] mb-4">
                  13. Changes to This Policy
                </h2>
                <p className="text-[var(--color-neutral-700)] mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any significant 
                  changes by posting the new policy on this page and updating the &quot;Last updated&quot; date. 
                  We encourage you to review this policy periodically.
                </p>
              </section>

            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
