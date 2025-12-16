import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import StructuredData from "@/app/components/seo/StructuredData";

export const metadata: Metadata = generateSEOMetadata({
  title: "Virtual Data Room (VDR)",
  description:
    "Secure Virtual Data Room access for qualified investors and partners. Request access to portfolio documentation, technical memos, exploration summaries, and regulatory filings for Pure Minerals mining licenses in Norway.",
  keywords: [
    "virtual data room",
    "mining investment documents",
    "due diligence",
    "investor access",
    "mining documentation",
    "mining exploration data",
  ],
  canonical: "https://pureminerals.no/vdr",
});

export default function VDRLayout({
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
            { name: "Virtual Data Room", url: "https://pureminerals.no/vdr" },
          ],
        }}
      />
      {children}
    </>
  );
}

