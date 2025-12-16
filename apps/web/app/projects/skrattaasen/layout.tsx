import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import StructuredData from "@/app/components/seo/StructuredData";

export const metadata: Metadata = generateSEOMetadata({
  title: "Skrattåsen-Byafossen Project",
  description:
    "Skrattåsen-Byafossen mining project: 7 licenses covering 51 km² in Trøndelag, Norway. Proven mineralization including zinc (28.8%), lead (9%), copper (7.01%), silver (539 ppm), gold (10 ppm), and rare earth elements. Historic production with mineralization continuing below 80m depth.",
  keywords: [
    "Skrattåsen mining",
    "Byafossen mining",
    "zinc mining Norway",
    "Trøndelag mining project",
    "mining licenses",
    "Steinkjer mining",
    "silver exploration Norway",
    "gold mining Trøndelag",
  ],
  canonical: "https://pureminerals.no/projects/skrattaasen",
});

// GeoJSON polygon for the Skrattås-Byafossen license area
const skrattaasenGeoShape = [
  [11.468118, 64.037042],
  [11.471048, 64.054965],
  [11.625597, 64.053124],
  [11.624694, 64.069044],
  [11.621965, 64.087972],
  [11.519934, 64.090011],
  [11.490118, 64.072344],
  [11.468118, 64.037042],
];

export default function SkrattaasenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData
        type="MiningProject"
        url="https://pureminerals.no/projects/skrattaasen"
        data={{
          project: {
            name: "Skrattås-Byafossen Mining Project",
            description:
              "Historic mining district in Trøndelag, Norway with exceptional zinc, lead, silver, and gold grades. 7 licenses covering 51 km² with proven mineralization continuing below 80m depth.",
            minerals: ["Zinc", "Lead", "Copper", "Silver", "Gold", "REE"],
            area: "51",
            licenses: 7,
            coordinates: {
              latitude: 64.0548,
              longitude: 11.55,
            },
            geoShape: skrattaasenGeoShape,
            established: "2022",
            status: "Active",
          },
        }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: "Home", url: "https://pureminerals.no" },
            { name: "Projects", url: "https://pureminerals.no/projects" },
            { name: "Skrattåsen-Byafossen", url: "https://pureminerals.no/projects/skrattaasen" },
          ],
        }}
      />
      {children}
    </>
  );
}

