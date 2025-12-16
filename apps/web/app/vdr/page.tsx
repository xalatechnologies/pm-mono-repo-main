"use client";

import Button from "../components/ui/Button";
import { Shield, FileText, Lock, CheckCircle, Mail, ArrowRight, Clock } from "lucide-react";
import { trackVDRRequest } from "@/lib/analytics";
import { useRouter } from "next/navigation";

export default function VdrPage() {
  const router = useRouter();

  const handleVDRRequest = () => {
    trackVDRRequest();
    router.push("/contact");
  };
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

          {/* Security Notice */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-[var(--color-earth-copper)]/5 to-[var(--color-earth-patina)]/5 border border-[var(--color-earth-copper)]/20">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[var(--color-earth-copper)]/10 flex items-center justify-center">
                <Shield size={20} className="text-[var(--color-earth-copper)]" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--color-brand-primary)] mb-2">
                  Secure & Confidential Access
                </h3>
                <p className="text-sm text-[var(--color-neutral-700)]">
                  All documents in the VDR are protected by confidentiality agreements. Access is granted 
                  on a case-by-case basis to qualified parties. You may be asked to confirm your affiliation 
                  and accept confidentiality terms before access is provided.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="p-8 rounded-2xl bg-white border border-[var(--color-neutral-200)] hover:border-[var(--color-earth-copper)]/40 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-earth-copper)]/10 flex items-center justify-center mb-4">
                <FileText size={24} className="text-[var(--color-earth-copper)]" />
              </div>
              <h2 className="text-xl font-semibold text-[var(--color-brand-primary)] mb-4">
                Available Documents
              </h2>
              <ul className="space-y-3 text-[var(--color-neutral-700)]">
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-[var(--color-earth-copper)] mt-0.5 flex-shrink-0" />
                  <span>Portfolio and license documentation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-[var(--color-earth-copper)] mt-0.5 flex-shrink-0" />
                  <span>Technical memos and exploration summaries</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-[var(--color-earth-copper)] mt-0.5 flex-shrink-0" />
                  <span>Geological survey results and analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-[var(--color-earth-copper)] mt-0.5 flex-shrink-0" />
                  <span>Selected external references where applicable</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-[var(--color-earth-copper)] mt-0.5 flex-shrink-0" />
                  <span>Program plans and timelines (where relevant)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-[var(--color-earth-copper)] mt-0.5 flex-shrink-0" />
                  <span>Financial and regulatory filings</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[var(--color-neutral-200)] hover:border-[var(--color-earth-copper)]/40 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-earth-patina)]/10 flex items-center justify-center mb-4">
                <Lock size={24} className="text-[var(--color-earth-patina)]" />
              </div>
              <h2 className="text-xl font-semibold text-[var(--color-brand-primary)] mb-4">
                Access Process
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-earth-copper)] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--color-brand-primary)] mb-1">Submit Request</h4>
                    <p className="text-sm text-[var(--color-neutral-700)]">
                      Contact us through the form below or via email with your request for VDR access.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-earth-copper)] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--color-brand-primary)] mb-1">Verification</h4>
                    <p className="text-sm text-[var(--color-neutral-700)]">
                      We review your request and may ask for additional information to verify your 
                      affiliation and purpose.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-earth-copper)] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--color-brand-primary)] mb-1">Access Granted</h4>
                    <p className="text-sm text-[var(--color-neutral-700)]">
                      Once approved, you&apos;ll receive secure login credentials and access instructions 
                      via email.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 rounded-xl bg-[var(--color-neutral-50)] border border-[var(--color-neutral-200)]">
                <div className="flex items-start gap-2">
                  <Clock size={16} className="text-[var(--color-earth-copper)] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-[var(--color-neutral-600)]">
                    <strong className="text-[var(--color-brand-primary)]">Tip:</strong> For faster processing, 
                    include your company name, role, and the specific purpose of access in your request.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Request Access Section */}
          <div className="mt-10 p-8 rounded-2xl bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-earth-obsidian)] text-white">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-display font-bold mb-3">
                Request VDR Access
              </h2>
              <p className="text-white/80 mb-6">
                Ready to explore our detailed documentation? Contact us to request access to the Virtual Data Room.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  href="/contact" 
                  variant="primary" 
                  size="md"
                  icon={<Mail size={18} />}
                  className="bg-[var(--color-earth-gold-bright)] hover:bg-[var(--color-earth-gold-warm)] text-[var(--color-brand-primary)]"
                  onClick={handleVDRRequest}
                >
                  Request Access
                </Button>
                <Button 
                  href="/report-archive" 
                  variant="outline" 
                  size="md"
                  icon={<ArrowRight size={18} />}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  View Report Archive
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


