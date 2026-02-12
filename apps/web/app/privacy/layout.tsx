import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy for Pure Minerals AS. Learn how we collect, use, and protect your information when you visit our website or contact us about mining exploration opportunities in Norway.",
  keywords: ["privacy policy", "data protection", "GDPR", "privacy"],
  canonical: "https://pureminerals.no/privacy",
  noindex: true, // Privacy pages typically shouldn't be indexed
});

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}





