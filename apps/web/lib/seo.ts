import { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://pureminerals.no";
const SITE_NAME = "Pure Minerals";
const DEFAULT_DESCRIPTION =
  "Norwegian exploration company focused on sustainable mineral development in Trøndelag. Specializing in copper, zinc, gold, silver, and rare earth elements (REE).";

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
}

export function generateMetadata(config: SEOConfig = {}): Metadata {
  const {
    title,
    description = DEFAULT_DESCRIPTION,
    keywords = [],
    image = "/logo.svg",
    type = "website",
    publishedTime,
    modifiedTime,
    author,
    noindex = false,
    canonical,
  } = config;

  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Geological Exploration & Mining`;
  const defaultKeywords = [
    "mining exploration",
    "Norway",
    "Trøndelag",
    "copper",
    "zinc",
    "gold",
    "silver",
    "rare earth elements",
    "REE",
    "mineral exploration",
    "Norwegian mining",
    "geological exploration",
    "mining licenses",
    "blockchain mining",
    "tokenized assets",
    "NorChain",
    "Steinkjer",
    "Gaulstad",
    "Mokk",
    "Skrattåsen",
  ];
  const allKeywords = [...defaultKeywords, ...keywords].join(", ");

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: allKeywords,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonical || undefined,
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
      locale: "en_US",
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
    },
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

