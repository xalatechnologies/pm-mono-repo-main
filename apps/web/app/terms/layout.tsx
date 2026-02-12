import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Terms of Service",
  description:
    "Terms of Service for Pure Minerals AS website. Read our terms and conditions for using our website and accessing information about our mining exploration activities in Norway.",
  keywords: ["terms of service", "terms and conditions", "legal"],
  canonical: "https://pureminerals.no/terms",
  noindex: true, // Terms pages typically shouldn't be indexed
});

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}





