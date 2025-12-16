// Google Analytics 4 utilities

type GtagCommand = "config" | "event" | "js" | "set" | "consent";
type GtagConfig = Record<string, string | number | boolean | undefined>;
type DataLayerItem = [GtagCommand, string | Date, GtagConfig?];

declare global {
  interface Window {
    gtag: (command: GtagCommand, targetId: string | Date, config?: GtagConfig) => void;
    dataLayer: DataLayerItem[];
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: Parameters<Window["gtag"]>) {
    window.dataLayer.push(args as DataLayerItem);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });
};

// Track page views
export const trackPageView = (url: string) => {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || !window.gtag) return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Track events
export const trackEvent = (
  eventName: string,
  eventParams?: {
    action?: string;
    category?: string;
    label?: string;
    value?: number;
    url?: string;
    location?: string;
  }
) => {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", eventName, {
    event_category: eventParams?.category || "general",
    event_label: eventParams?.label,
    value: eventParams?.value,
    ...eventParams,
  });
};

// Specific event tracking functions
export const trackContactFormSubmit = () => {
  trackEvent("contact_form_submit", {
    category: "engagement",
    label: "Contact Form",
  });
};

export const trackVDRRequest = () => {
  trackEvent("vdr_request", {
    category: "conversion",
    label: "VDR Access Request",
  });
};

export const trackReportDownload = (reportName: string) => {
  trackEvent("report_download", {
    category: "download",
    label: reportName,
  });
};

export const trackExternalLinkClick = (url: string, linkText: string) => {
  trackEvent("external_link_click", {
    category: "outbound",
    label: linkText,
    url,
  });
};

export const trackCTAClick = (ctaText: string, location: string) => {
  trackEvent("cta_click", {
    category: "engagement",
    label: ctaText,
    location,
  });
};

export const trackScrollDepth = (depth: number) => {
  trackEvent("scroll_depth", {
    category: "engagement",
    label: `${depth}%`,
    value: depth,
  });
};

export const trackVideoPlay = (videoName: string) => {
  trackEvent("video_play", {
    category: "engagement",
    label: videoName,
  });
};

// Conversion tracking
export const trackConversion = (conversionName: string, value?: number) => {
  trackEvent("conversion", {
    category: "conversion",
    label: conversionName,
    value,
  });
};

