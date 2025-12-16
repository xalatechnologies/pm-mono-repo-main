import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "News & Insights",
  description:
    "Industry news, mineral exploration updates, and insights from the mining sector. Stay current with the latest developments in geology, critical minerals, rare earth elements, and Pure Minerals project updates in Trøndelag, Norway.",
  keywords: [
    // General mining
    "mining news",
    "mining industry news",
    "mineral exploration news",
    "geology news",
    // Base metals
    "copper mining news",
    "zinc mining updates",
    "nickel mining",
    "cobalt mining",
    // Precious metals
    "gold mining news",
    "silver mining",
    "platinum group metals",
    // Critical minerals & REE
    "critical minerals",
    "rare earth elements",
    "REE mining",
    "lithium mining news",
    "battery metals",
    // Geographic
    "Norway mining industry",
    "Scandinavia mining",
    "Nordic mineral exploration",
    "Trøndelag mining",
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

