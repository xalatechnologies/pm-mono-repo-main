import { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://pureminerals.no";
const SITE_NAME = "Pure Minerals";
const DEFAULT_DESCRIPTION =
  "Norwegian exploration company focused on sustainable mineral development in Trøndelag. Specializing in copper, zinc, gold, silver, and rare earth elements (REE).";

// Language configuration for future multi-language support
export const SUPPORTED_LOCALES = ["en", "no"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: SupportedLocale = "en";

export interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noindex?: boolean;
  canonical?: string;
  locale?: SupportedLocale;
  alternateLocales?: { locale: SupportedLocale; url: string }[];
}

export function generateMetadata(config: SEOConfig = {}): Metadata {
  const {
    title,
    description = DEFAULT_DESCRIPTION,
    keywords = [],
    image = "/opengraph-image",
    type = "website",
    publishedTime,
    modifiedTime,
    author,
    noindex = false,
    canonical,
    locale = DEFAULT_LOCALE,
    alternateLocales,
  } = config;

  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Geological Exploration & Mining`;
  
  // Comprehensive keyword list for mining/exploration SEO
  const defaultKeywords = [
    // Primary keywords
    "mining exploration",
    "Norway",
    "Trøndelag",
    // Minerals
    "copper",
    "zinc",
    "gold",
    "silver",
    "rare earth elements",
    "REE",
    "cobalt",
    "nickel",
    "lead",
    // Industry terms
    "mineral exploration",
    "Norwegian mining",
    "geological exploration",
    "mining licenses",
    "mining investment",
    "exploration company",
    // Technology
    "blockchain mining",
    "tokenized assets",
    "NorChain",
    // Locations
    "Steinkjer",
    "Gaulstad",
    "Mokk",
    "Skrattåsen",
    "Byafossen",
    // Long-tail keywords
    "Norwegian mining company",
    "Trøndelag mineral exploration",
    "Norway copper mining",
    "critical minerals Norway",
    "green transition minerals",
  ];
  const allKeywords = [...new Set([...defaultKeywords, ...keywords])].join(", ");

  // Build language alternates for hreflang
  const languages: Record<string, string> = {};
  if (alternateLocales) {
    alternateLocales.forEach(({ locale: altLocale, url }) => {
      languages[altLocale] = url;
    });
  }

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: allKeywords,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonical || undefined,
      languages: Object.keys(languages).length > 0 ? languages : undefined,
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url: canonical || SITE_URL,
      images: [
        {
          url: image.startsWith("http") ? image : `${SITE_URL}${image}`,
          width: 1200,
          height: 630,
          alt: title || SITE_NAME,
        },
      ],
      locale: locale === "no" ? "nb_NO" : "en_US",
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.startsWith("http") ? image : `${SITE_URL}${image}`],
      creator: "@pureminerals",
      site: "@pureminerals",
    },
    // Additional metadata for better SEO
    category: "Mining & Exploration",
    classification: "Business",
    ...(publishedTime && { publicationTime: publishedTime }),
    ...(modifiedTime && { modificationTime: modifiedTime }),
  };

  return metadata;
}

export function generateCanonicalUrl(path: string): string {
  const baseUrl = SITE_URL.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

export const defaultSEOKeywords = [
  "mining exploration Norway",
  "rare earth elements Norway",
  "copper exploration Trøndelag",
  "mineral exploration investment",
  "Norwegian mining licenses",
  "blockchain tokenized mining assets",
  "Norwegian mining company",
  "Trøndelag mineral exploration",
  "Steinkjer mining",
  "Norway REE exploration",
];

