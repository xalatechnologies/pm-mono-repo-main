import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "News & Updates",
  description:
    "Stay informed about Pure Minerals latest exploration activities, project updates, geological findings, and company news. Updates on mining licenses, exploration programs, and investment opportunities in Trøndelag, Norway.",
  keywords: [
    "mining news",
    "exploration updates",
    "mining industry news Norway",
    "mineral exploration news",
  ],
  canonical: "https://pureminerals.no/articles",
});

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

