import type { Metadata } from "next";
import "./globals.css";
import ClientThemeProvider from "./components/ClientThemeProvider";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import StructuredData from "./components/seo/StructuredData";
import GoogleAnalytics from "./components/analytics/GoogleAnalytics";
import CookieConsent from "./components/CookieConsent";

const defaultMetadata = generateSEOMetadata({
  title: "Pure Minerals | Geological Exploration & Mining",
  description:
    "What Tomorrow Needs, We Find Today. Norwegian exploration company focused on sustainable mineral development in Trøndelag. Specializing in copper, zinc, gold, silver, and rare earth elements (REE).",
  keywords: [
    "Norwegian mining exploration",
    "Trøndelag mineral exploration",
    "Steinkjer mining company",
    "Norway rare earth elements",
    "Norwegian copper exploration",
    "mining investment Norway",
    "blockchain mining assets",
  ],
  image: "/logo.svg",
  canonical: "https://pureminerals.no",
});

export const metadata: Metadata = {
  ...defaultMetadata,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.svg",
  },
  manifest: "/site.webmanifest",
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }),
  // Add geographic targeting
  other: {
    "geo.region": "NO-50", // Trøndelag
    "geo.placename": "Steinkjer",
    "geo.position": "64.0147;11.4953",
    "ICBM": "64.0147, 11.4953",
  },
};

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable}`}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* Geographic meta tags */}
        <meta name="geo.region" content="NO-50" />
        <meta name="geo.placename" content="Steinkjer, Trøndelag, Norway" />
        <meta name="geo.position" content="64.0147;11.4953" />
        <meta name="ICBM" content="64.0147, 11.4953" />
        {/* Structured Data */}
        <StructuredData type="Organization" />
        <StructuredData type="WebSite" />
        <StructuredData type="LocalBusiness" />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <GoogleAnalytics />
        <ClientThemeProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <CookieConsent />
        </ClientThemeProvider>
      </body>
    </html>
  );
}
