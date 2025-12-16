"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, Settings, Check } from "lucide-react";

const COOKIE_CONSENT_KEY = "pm_cookie_consent";
const COOKIE_CONSENT_VERSION = "1.0";

interface ConsentState {
  essential: boolean;
  analytics: boolean;
  version: string;
  timestamp: number;
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    essential: true,
    analytics: false,
    version: COOKIE_CONSENT_VERSION,
    timestamp: 0,
  });

  useEffect(() => {
    // Check for existing consent
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent) as ConsentState;
        // Check if consent version is current
        if (parsed.version === COOKIE_CONSENT_VERSION) {
          setConsent(parsed);
          // Enable analytics if previously consented
          if (parsed.analytics && typeof window !== "undefined") {
            enableAnalytics();
          }
          return;
        }
      } catch {
        // Invalid stored consent, show banner
      }
    }
    
    // Show banner after a short delay for better UX
    const timer = setTimeout(() => setShowBanner(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const enableAnalytics = () => {
    // Re-enable Google Analytics tracking
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  };

  const disableAnalytics = () => {
    // Disable Google Analytics tracking
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      });
    }
  };

  const saveConsent = (newConsent: Partial<ConsentState>) => {
    const fullConsent: ConsentState = {
      ...consent,
      ...newConsent,
      version: COOKIE_CONSENT_VERSION,
      timestamp: Date.now(),
    };
    
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(fullConsent));
    setConsent(fullConsent);
    
    if (fullConsent.analytics) {
      enableAnalytics();
    } else {
      disableAnalytics();
    }
    
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    saveConsent({ essential: true, analytics: true });
  };

  const acceptEssentialOnly = () => {
    saveConsent({ essential: true, analytics: false });
  };

  const savePreferences = () => {
    saveConsent(consent);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`
          fixed inset-0 bg-black/50 z-[998] transition-opacity duration-300
          ${showSettings ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setShowSettings(false)}
      />

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 flex items-center justify-center z-[999] p-4">
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[var(--color-brand-primary)]">Cookie Settings</h2>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-[var(--color-neutral-100)] rounded-lg transition-colors"
                  aria-label="Close settings"
                >
                  <X size={20} className="text-[var(--color-neutral-500)]" />
                </button>
              </div>

              <p className="text-[var(--color-neutral-600)] text-sm mb-6">
                We use cookies to improve your experience on our website. You can choose which 
                cookies you want to allow.
              </p>

              {/* Essential Cookies */}
              <div className="p-4 bg-[var(--color-neutral-50)] rounded-xl mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-[var(--color-brand-primary)]">Essential Cookies</h3>
                  <span className="text-xs px-2 py-1 bg-[var(--color-earth-copper)]/10 text-[var(--color-earth-copper)] rounded-full font-medium">
                    Always On
                  </span>
                </div>
                <p className="text-sm text-[var(--color-neutral-600)]">
                  Required for the website to function properly. These cannot be disabled.
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="p-4 bg-[var(--color-neutral-50)] rounded-xl mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-[var(--color-brand-primary)]">Analytics Cookies</h3>
                  <button
                    onClick={() => setConsent(prev => ({ ...prev, analytics: !prev.analytics }))}
                    className={`
                      w-12 h-6 rounded-full transition-colors duration-300 relative
                      ${consent.analytics ? "bg-[var(--color-earth-copper)]" : "bg-[var(--color-neutral-300)]"}
                    `}
                    aria-label="Toggle analytics cookies"
                  >
                    <span 
                      className={`
                        absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300
                        ${consent.analytics ? "translate-x-7" : "translate-x-1"}
                      `}
                    />
                  </button>
                </div>
                <p className="text-sm text-[var(--color-neutral-600)]">
                  Help us understand how visitors use our website through Google Analytics. 
                  Data is anonymized.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={savePreferences}
                  className="flex-1 px-4 py-3 bg-[var(--color-earth-copper)] text-white rounded-xl font-semibold hover:bg-[var(--color-earth-copper-dark)] transition-colors"
                >
                  Save Preferences
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 px-4 py-3 border-2 border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] rounded-xl font-semibold hover:bg-[var(--color-brand-primary)] hover:text-white transition-colors"
                >
                  Accept All
                </button>
              </div>

              <p className="text-xs text-[var(--color-neutral-500)] mt-4 text-center">
                For more information, see our{" "}
                <Link href="/privacy" className="text-[var(--color-earth-copper)] hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Banner */}
      {!showSettings && (
        <div className="fixed bottom-0 left-0 right-0 z-[997] p-4 animate-slide-up">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-[var(--color-neutral-200)] overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex w-12 h-12 rounded-xl bg-[var(--color-earth-copper)]/10 items-center justify-center flex-shrink-0">
                  <Cookie size={24} className="text-[var(--color-earth-copper)]" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-[var(--color-brand-primary)] mb-2 text-lg">
                    We Value Your Privacy
                  </h3>
                  <p className="text-[var(--color-neutral-600)] text-sm mb-4">
                    We use cookies to enhance your browsing experience and analyze site traffic. 
                    By clicking &quot;Accept All&quot;, you consent to our use of cookies as described in our{" "}
                    <Link href="/privacy" className="text-[var(--color-earth-copper)] hover:underline">
                      Privacy Policy
                    </Link>.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={acceptAll}
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[var(--color-earth-copper)] text-white rounded-xl font-semibold hover:bg-[var(--color-earth-copper-dark)] transition-colors"
                    >
                      <Check size={18} />
                      Accept All
                    </button>
                    <button
                      onClick={acceptEssentialOnly}
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border-2 border-[var(--color-neutral-300)] text-[var(--color-neutral-700)] rounded-xl font-semibold hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] transition-colors"
                    >
                      Essential Only
                    </button>
                    <button
                      onClick={() => setShowSettings(true)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-[var(--color-neutral-600)] hover:text-[var(--color-earth-copper)] transition-colors"
                    >
                      <Settings size={18} />
                      Customize
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
      `}</style>
    </>
  );
}

