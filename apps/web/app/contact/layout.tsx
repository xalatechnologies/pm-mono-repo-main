import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import StructuredData from "@/app/components/seo/StructuredData";

export const metadata: Metadata = generateSEOMetadata({
  title: "Contact Us",
  description:
    "Contact Pure Minerals AS in Steinkjer, Trøndelag, Norway. Get in touch about investment opportunities, partnership possibilities, VDR access, or learn more about our exploration projects.",
  keywords: [
    "contact Pure Minerals",
    "mining investment contact",
    "Norway mining company contact",
    "Steinkjer mining",
    "investor relations mining",
  ],
  canonical: "https://pureminerals.no/contact",
});

export default function ContactLayout({
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
            { name: "Contact", url: "https://pureminerals.no/contact" },
          ],
        }}
      />
      {children}
    </>
  );
}

