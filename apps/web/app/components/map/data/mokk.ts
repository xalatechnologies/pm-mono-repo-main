import type { ProjectMapConfig } from "../types";
import { Mountain, FlaskConical, Search, FileCheck, Rocket, Building } from "lucide-react";
import { PORTFOLIO } from "@/lib/portfolio";

export const mokkConfig: ProjectMapConfig = {
  id: "mokk",
  mapConfig: {
    center: [12.2, 63.98],
    zoom: 9.5,
    maxZoom: 16,
    minZoom: 6,
    flyToZoom: 10.5,
  },
  scannerConfig: {
    speed: 0.0085,
    startLng: 12.01,
    range: 0.35,
    latRange: [63.905, 64.095],
  },
  projectInfo: {
    name: "Gaulstad/Mokk Project",
    licenses: PORTFOLIO.districts.gaulstadMokk.licenses,
    area: `${PORTFOLIO.districts.gaulstadMokk.coverageKm2} km²`,
    minerals: [...PORTFOLIO.districts.gaulstadMokk.minerals],
    status: "Exploration",
    established: "2021",
    seoDescription:
      "Historic copper mining district in Trøndelag, Norway dating back to 1760. Over 50 documented mines with proven grades of 7.95% copper, 840 ppm cobalt, and precious metals across 138 km².",
    location: {
      region: "Trøndelag",
      country: "Norway",
      coordinates: [12.2, 63.98],
    },
  },
  markers: [
    {
      name: "Gaulstad No. 1 Mine",
      coordinates: [12.15, 63.97],
      type: "mine",
      description: "Historic copper mine operational from 1764-1891. Documented 7.95% Cu grades. First discovery at Gruvfjellet 1760.",
      minerals: ["Copper", "Nickel"],
    },
    {
      name: "Mokk No. 1 - Blankstøiten",
      coordinates: [12.12, 63.96],
      type: "mine",
      description: "Historic mine following Gaulstad. Part of the 50+ documented workings in the Gruvfjellet plateau.",
      minerals: ["Copper", "Zinc"],
    },
    {
      name: "High-Grade Copper Zone",
      coordinates: [12.22, 63.99],
      type: "sample",
      description: "Sample analysis: 7.95% Cu, 1.24% Zn, 12.45 ppm Ag, 840 ppm Co. Confirmed high-grade copper.",
      minerals: ["Copper", "Zinc", "Silver", "Cobalt"],
    },
    {
      name: "Silver Anomaly",
      coordinates: [12.18, 64.02],
      type: "sample",
      description: "Geochemical sampling indicates elevated silver values. 12.45 ppm Ag confirmed.",
      minerals: ["Silver", "Gold"],
    },
    {
      name: "GeoVista Survey Base",
      coordinates: [12.08, 63.95],
      type: "poi",
      description: "2023 geological mapping by GeoVista AB and SGC AS. Comprehensive XRF analysis conducted.",
    },
    {
      name: "2026 Exploration Target",
      coordinates: [12.25, 63.975],
      type: "poi",
      description: "Further geological and geophysical exploration planned for 2026 based on survey results.",
    },
  ],
  geoJsonFeatures: [
    {
      type: "Feature",
      properties: { navn: "Mokk 10B", potential: 0.6 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [12.023322576720176, 64.09046783140886],
            [12.125704313249457, 64.09161378466243],
            [12.127018949167905, 64.07405016568342],
            [12.023948113002291, 64.07203542909551],
            [12.023322576720176, 64.09046783140886],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { navn: "Mokk 11B", potential: 0.7 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [12.12781431959499, 64.05589718337481],
            [12.02577827325996, 64.05417982948552],
            [12.023958648932876, 64.07202958435656],
            [12.127029866604488, 64.0740466726279],
            [12.12781431959499, 64.05589718337481],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { navn: "Mokk 18B", potential: 0.8 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [12.133368711700683, 64.01130591214812],
            [12.23508526265141, 64.0132514575152],
            [12.236839778841244, 63.99540646792522],
            [12.134706015814686, 63.993378227704454],
            [12.133368711700683, 64.01130591214812],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { navn: "Mokk 19", potential: 0.75 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [12.136322093880608, 63.97539874680635],
            [12.238451639554114, 63.97739349037553],
            [12.236811167729002, 63.99540925090963],
            [12.13471829661026, 63.99336909972172],
            [12.136322093880608, 63.97539874680635],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { navn: "Mokk 9B", potential: 0.85 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [12.338163982129373, 63.99717093555361],
            [12.339629407852385, 63.97902265538792],
            [12.238703835246213, 63.97725320094102],
            [12.237070690352056, 63.995407664956616],
            [12.338163982129373, 63.99717093555361],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { navn: "Mokk", potential: 0.9 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [12.085869082937933, 63.97446175701643],
            [12.08755203097806, 63.95644183916505],
            [12.18899369392912, 63.958737396196454],
            [12.187572984027895, 63.9763709907308],
            [12.085869082937933, 63.97446175701643],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { navn: "Mokk 22", potential: 0.7 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [12.291518154490745, 63.96058691267774],
            [12.289703099957933, 63.97813968305684],
            [12.187565539947542, 63.976338790437666],
            [12.188999861379529, 63.95872829187442],
            [12.291518154490745, 63.96058691267774],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { navn: "Mokk 23B", potential: 0.55 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [12.066145661255092, 63.956200707551375],
            [12.116997417484413, 63.95701494538511],
            [12.120781502247269, 63.92595776001954],
            [12.0698669126229, 63.925350120031],
            [12.066145661255092, 63.956200707551375],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { navn: "Mokk 25B", potential: 0.65 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [12.154118636416058, 63.957813984210304],
            [12.158384574728217, 63.908703536735004],
            [12.12272878925637, 63.9084727827061],
            [12.11699729905294, 63.95700643096231],
            [12.154118636416058, 63.957813984210304],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { navn: "Mokk 26", potential: 0.6 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [12.199817872498699, 63.958813624490915],
            [12.205476460345352, 63.91995075375678],
            [12.157521919159166, 63.91894334991309],
            [12.154086995399524, 63.95791813104188],
            [12.199817872498699, 63.958813624490915],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { navn: "Mokk 28B", potential: 0.5 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [11.510863357580092, 63.99838610652563],
            [11.509345204471742, 63.98041821514178],
            [11.61104323729623, 63.97874872207046],
            [11.613082622616531, 63.996612771457876],
            [11.510863357580092, 63.99838610652563],
          ],
        ],
      },
    },
  ],
  contentCards: [
    {
      title: "Mining Heritage Since 1760",
      content:
        "The mining history in the upper Ogndalen area started when a major copper ore was discovered at Gruvfjellet plateau in 1760. By 1764, the Gaulstad No. 1 mine was in full operation, followed by the Mokk No. 1 mine 'Blankstøiten'. The first copper mining phase continued for 22 years until 1786, followed by operations during 1830-1850, and finally 1880-1891 targeting nickel.",
      imageUrl: "/hero-mokk-gruvfjellet.jpg",
      alt: "Gruvfjellet mountain plateau",
      imagePosition: "right",
      category: "history",
      year: "1760-1891",
      location: "Gaulstad-Mokk, Trøndelag",
      highlights: ["First Discovery 1760", "50+ Historic Mines", "130+ Years of Mining"],
    },
    {
      title: "Exceptional Copper Grades",
      content:
        "Modern XRF analysis and geochemical sampling confirm exceptional mineral grades: 7.95% Copper, 1.24% Zinc, 12.45 ppm Silver, 840 ppm Cobalt, and trace gold. The polymetallic nature of the deposits significantly increases economic potential. Over 70 elements have been analyzed across the license area.",
      imageUrl: "/project-mokk-mineral.jpg",
      alt: "Mokk mineral samples",
      imagePosition: "left",
      category: "mineralization",
      highlights: ["7.95% Copper", "840 ppm Cobalt", "12.45 ppm Silver", "70+ Elements"],
    },
    {
      title: "Extensive License Holdings",
      content:
        "Pure Minerals holds 12 mining licenses in the Gaulstad-Mokk area, covering approximately 138 km² surrounding the Gruvfjellet mountain plateau. For the last 130 years, many governmental and private entities have explored the more than 50 identified worded mines and minor test pits throughout the area. Pure Minerals acquired these licenses in 2021-2022.",
      imageUrl: "/gaulstad-mokk-map.jpg",
      alt: "License area map",
      imagePosition: "right",
      category: "discovery",
      highlights: ["12 Licenses", "138 km²", "50+ Historic Workings", "Full Ownership"],
    },
    {
      title: "Professional Geological Surveys",
      content:
        "During late 2021 and throughout 2022, we explored several Gaulstad and Mokk mine entrances at Gruvfjellet. In 2023, Sunnfjord Geo Center AS and GeoVista AB executed high-performance geological mapping combined with evaluation of existing geophysical data. Further exploration planned for 2026.",
      imageUrl: "/hero-mokk-mine.jpg",
      imagePosition: "left",
      alt: "Mine entrance at Mokk",
      category: "fieldwork",
      year: "2021-Present",
      highlights: ["XRF Analysis", "GeoVista AB", "SGC AS", "2026 Program"],
    },
    {
      title: "Geology of the Mining District",
      content:
        "The area is insufficiently explored with significant upside potential. Located within the Støren Nappe of the Scandinavian Caledonides, featuring greenschist to low-amphibolite facies rocks. Geological conditions are comparable to the world-renowned Røros mining district, suggesting substantial commercial potential.",
      imageUrl: "/project-mokk-3.jpg",
      imagePosition: "right",
      alt: "Mokk geological features",
      category: "geology",
      highlights: ["Støren Nappe", "Caledonides", "Røros Analogue", "High Potential"],
    },
  ],
  timeline: [
    {
      icon: Mountain,
      title: "1760",
      subtitle: "First Discovery",
      description: "Major copper ore discovered at Gruvfjellet plateau. This marked the beginning of organized mining in the upper Ogndalen area, establishing a tradition that would span over 130 years.",
      image: "/hero-mokk-gruvfjellet.jpg",
      items: [
        "Copper ore discovery at Gruvfjellet",
        "Mining infrastructure development begins",
        "First ore extraction documented",
        "Historic mining tradition established"
      ],
    },
    {
      icon: Building,
      title: "1764-1891",
      subtitle: "Commercial Mining Era",
      description: "Gaulstad No. 1 mine in full operation from 1764, followed by Mokk No. 1 'Blankstøiten'. Three major mining phases: 1764-1786 (copper), 1830-1850 (expansion), and 1880-1891 (nickel targeting).",
      image: "/hero-mokk-mine.jpg",
      highlight: true,
      items: [
        "Gaulstad No. 1 operational 1764",
        "50+ mines documented",
        "130+ years of mining",
        "Copper, zinc, and nickel extracted"
      ],
    },
    {
      icon: FileCheck,
      title: "2021-2022",
      subtitle: "Modern License Acquisition",
      description: "Pure Minerals acquired 12 mining licenses covering approximately 138 km² in the Gaulstad-Mokk area. Initial exploration of Gaulstad and Mokk mine entrances at Gruvfjellet began.",
      image: "/gaulstad-mokk-map.jpg",
      highlight: true,
      items: [
        "12 licenses acquired",
        "138 km² exploration area",
        "Mine entrance exploration",
        "Historic data compilation"
      ],
    },
    {
      icon: Search,
      title: "2023",
      subtitle: "Geological Surveys",
      description: "Sunnfjord Geo Center AS and GeoVista AB executed high-performance geological mapping combined with evaluation of existing geophysical data. Comprehensive XRF analysis conducted.",
      image: "/tem-study.jpg",
      items: [
        "Partnership with SGC AS",
        "GeoVista AB surveys",
        "Geophysical data evaluation",
        "XRF sample analysis"
      ],
    },
    {
      icon: FlaskConical,
      title: "2024",
      subtitle: "Analysis Results",
      description: "XRF analysis confirmed exceptional grades: 7.95% Cu, 1.24% Zn, 12.45 ppm Ag, 840 ppm Co. Over 70 elements analyzed across the license area.",
      image: "/project-mokk-mineral.jpg",
      highlight: true,
      items: [
        "7.95% Copper confirmed",
        "840 ppm Cobalt detected",
        "12.45 ppm Silver identified",
        "70+ elements analyzed"
      ],
      button: {
        url: "/about",
        text: "View Full Analysis"
      }
    },
    {
      icon: Rocket,
      title: "2026",
      subtitle: "Expansion Program",
      description: "Further geological and geophysical exploration planned based on 2023 survey results. Focus on deeper mineralization and extension of known ore bodies.",
      image: "/copper-minerals.jpg",
      highlight: true,
      items: [
        "Extended geological mapping",
        "Deep exploration targets",
        "Resource estimation",
        "Investment program launch"
      ],
      button: {
        url: "/contact",
        text: "Join the Program"
      }
    },
  ],
};
