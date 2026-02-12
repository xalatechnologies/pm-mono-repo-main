import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import StructuredData from "@/app/components/seo/StructuredData";

export const metadata: Metadata = generateSEOMetadata({
  title: "About Us",
  description:
    "Learn about Pure Minerals AS - a Norwegian exploration company with 19 mining licenses covering 189 km² in Trøndelag. Discover our investment thesis, geological expertise, strategic advantages, and partnership with NorChain for blockchain tokenization.",
  keywords: [
    "about Pure Minerals",
    "Norwegian mining company",
    "mining investment",
    "exploration company Norway",
    "Trøndelag mining",
    "NorChain blockchain mining",
    "tokenized mining assets",
  ],
  canonical: "https://pureminerals.no/about",
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: "Home", url: "https://pureminerals.no" },
            { name: "About Us", url: "https://pureminerals.no/about" },
          ],
        }}
      />
      {children}
    </>
  );
}

