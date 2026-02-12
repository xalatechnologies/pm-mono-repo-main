import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import StructuredData from "@/app/components/seo/StructuredData";

export const metadata: Metadata = generateSEOMetadata({
  title: "Gaulstad-Mokk Project",
  description:
    "Gaulstad-Mokk mining project: 12 licenses covering 138 km² in Trøndelag, Norway. Historic mining district with proven copper (7.95%), zinc, nickel, iron, silver (12.45 ppm), gold (0.05 ppm), and rare earth elements. 50+ historic mines documented dating back to 1760.",
  keywords: [
    "Gaulstad Mokk mining",
    "copper mining Norway",
    "Trøndelag mining project",
    "historic mining district",
    "mining licenses",
    "Norwegian copper exploration",
    "cobalt mining Norway",
    "nickel exploration Trøndelag",
  ],
  canonical: "https://pureminerals.no/projects/mokk",
});

// GeoJSON polygon for the Gaulstad-Mokk license area (outer boundary)
const mokkGeoShape = [
  [11.510863, 63.998386],
  [11.613082, 63.996612],
  [12.023322, 64.090467],
  [12.338163, 63.997170],
  [12.291518, 63.960586],
  [12.205476, 63.919950],
  [12.066145, 63.956200],
  [12.087552, 63.956441],
  [11.510863, 63.998386],
];

export default function MokkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData
        type="MiningProject"
        url="https://pureminerals.no/projects/mokk"
        data={{
          project: {
            name: "Gaulstad-Mokk Mining Project",
            description:
              "Historic copper mining district in Trøndelag, Norway dating back to 1760. 12 licenses covering 138 km² with over 50 documented historic mines. Proven grades of 7.95% copper, 840 ppm cobalt, and precious metals.",
            minerals: ["Copper", "Zinc", "Nickel", "Cobalt", "Silver", "Gold", "REE"],
            area: "138",
            licenses: 12,
            coordinates: {
              latitude: 63.98,
              longitude: 12.2,
            },
            geoShape: mokkGeoShape,
            established: "2021",
            status: "Exploration",
          },
        }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: "Home", url: "https://pureminerals.no" },
            { name: "Projects", url: "https://pureminerals.no/projects" },
            { name: "Gaulstad-Mokk", url: "https://pureminerals.no/projects/mokk" },
          ],
        }}
      />
      {children}
    </>
  );
}

