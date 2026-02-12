import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import StructuredData from "@/app/components/seo/StructuredData";

export const metadata: Metadata = generateSEOMetadata({
  title: "Projects",
  description:
    "Explore Pure Minerals mining projects in Trøndelag, Norway. Skrattåsen-Byafossen (7 licenses, 51 km²) and Gaulstad-Mokk (12 licenses, 138 km²) with proven mineralization of copper, zinc, gold, silver, and rare earth elements.",
  keywords: [
    "mining projects Norway",
    "Skrattåsen mining",
    "Gaulstad Mokk",
    "Trøndelag mining projects",
    "mining licenses",
    "Norwegian mineral exploration",
    "copper zinc exploration",
  ],
  canonical: "https://pureminerals.no/projects",
});

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData
        type="GeoPlace"
        url="https://pureminerals.no/projects"
        data={{
          name: "Pure Minerals Exploration Area - Trøndelag",
          description:
            "19 mining licenses covering 189 km² in Trøndelag, Norway. Two strategic mining districts: Skrattåsen-Byafossen and Gaulstad-Mokk with proven copper, zinc, silver, gold, and REE mineralization.",
          coordinates: {
            latitude: 64.0,
            longitude: 11.8,
          },
          minerals: ["Copper", "Zinc", "Lead", "Silver", "Gold", "Cobalt", "Nickel", "REE"],
        }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: "Home", url: "https://pureminerals.no" },
            { name: "Projects", url: "https://pureminerals.no/projects" },
          ],
        }}
      />
      {children}
    </>
  );
}

