import type { ProjectMapConfig } from "../types";
import { Mountain, FlaskConical, Search, FileCheck, Rocket } from "lucide-react";
import { PORTFOLIO } from "@/lib/portfolio";

export const skrattaasenConfig: ProjectMapConfig = {
  id: "skrattaasen",
  mapConfig: {
    center: [11.55, 64.0548],
    zoom: 11,
    maxZoom: 18,
    minZoom: 8,
  },
  scannerConfig: {
    speed: 0.005,
    startLng: 11.46,
    range: 0.18,
    latRange: [64.035, 64.09],
  },
  projectInfo: {
    name: "Skrattås-Byafossen Project",
    licenses: PORTFOLIO.districts.skrattasByafossen.licenses,
    area: `${PORTFOLIO.districts.skrattasByafossen.coverageKm2} km²`,
    minerals: [...PORTFOLIO.districts.skrattasByafossen.minerals],
    status: "Active",
    established: "2022",
    seoDescription:
      "Historic mining district in Steinkjer, Trøndelag with exceptional zinc (28.8%), lead, silver (539 ppm), and gold (10 ppm) mineralization. Proven reserves with mineralization continuing below 80m depth.",
    location: {
      region: "Trøndelag",
      country: "Norway",
      coordinates: [11.55, 64.0548],
    },
  },
  markers: [
    {
      name: "Skrattås Mine",
      coordinates: [11.54, 64.055],
      type: "mine",
      description: "Historic zinc mine. 1979-1981 production: 5,000 tons at 34% Zn, 10.4% Pb, 1.9% Cu. Underground reaches 80m depth.",
      minerals: ["Zinc", "Lead", "Silver"],
    },
    {
      name: "Bjønsås Mine",
      coordinates: [11.58, 64.048],
      type: "mine",
      description: "Significant copper grades detected. Magnetite-rich zones with high mineral potential.",
      minerals: ["Copper", "Zinc", "Pyrite"],
    },
    {
      name: "High-Grade Zone",
      coordinates: [11.52, 64.062],
      type: "sample",
      description: "Sample analysis: 28.8% Zn, 9% Pb, 539 ppm Ag, 10 ppm Au. Exceptional grades confirmed.",
      minerals: ["Zinc", "Lead", "Silver", "Gold"],
    },
    {
      name: "Galena Sample Site",
      coordinates: [11.56, 64.042],
      type: "sample",
      description: "Lead sulfide observed in stream samples alongside sphalerite and mica.",
      minerals: ["Galena", "Sphalerite", "Mica"],
    },
    {
      name: "TEM Survey Area",
      coordinates: [11.50, 64.07],
      type: "poi",
      description: "Geophysical TEM survey planned for 2025 following GeoVista AB recommendations.",
    },
    {
      name: "Mineralization Extension",
      coordinates: [11.60, 64.065],
      type: "poi",
      description: "Mineralization continues below 80m depth. Tabular body 0.4-2.6m thickness.",
    },
  ],
  geoJsonFeatures: [
    {
      type: "Feature",
      properties: { navn: "Byafossen 1", potential: 0.7 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [11.468118, 64.037042],
            [11.471048, 64.054965],
            [11.625597, 64.053124],
            [11.621366, 64.03429],
            [11.468118, 64.037042],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { navn: "Byafossen 2", potential: 0.85 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [11.490118, 64.072344],
            [11.488771, 64.054702],
            [11.62295, 64.053286],
            [11.624694, 64.069044],
            [11.490118, 64.072344],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { navn: "Byafossen 3", potential: 0.6 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [11.519934, 64.090011],
            [11.518978, 64.071693],
            [11.621371, 64.0692],
            [11.621965, 64.087972],
            [11.519934, 64.090011],
          ],
        ],
      },
    },
  ],
  contentCards: [
    {
      title: "Exceptional Mineral Grades",
      content:
        "The Skrattås deposit contains some of the highest grades in our portfolio. Laboratory analysis shows up to 28.8% Zinc, 9% Lead, 539 ppm Silver, and 10 ppm Gold. The estimated historic reserve was 80,000 tons at 1.5% Cu, 7% Zn, and 2.5% Pb. During 1979-1981, extracted ore averaged an exceptional 34% Zn, 10.4% Pb, and 1.9% Cu.",
      imageUrl: "/bjonsas-mineral.jpg",
      alt: "Mineral samples from Skrattås",
      imagePosition: "right",
      category: "mineralization",
      highlights: ["28.8% Zinc", "539 ppm Silver", "10 ppm Gold", "34% Historic Grade"],
    },
    {
      title: "Historic Mining Operations",
      content:
        "Test mining was conducted during 1886-1914 by several owners. Constant production registered 1925-1927. The underground work terminated at 80m depth, however, the mineralization continues downward. The mineral body is tabular, including both massive sulphides and disseminations alternating on a thickness between 0.4 and 2.6 meters.",
      imageUrl: "/skrattas-mine-1.jpg",
      alt: "Skrattås mine entrance",
      imagePosition: "left",
      category: "history",
      year: "1886-1927",
      location: "Skrattås, Steinkjer",
      highlights: ["80m Depth", "Massive Sulphides", "Continuous Mineralization"],
    },
    {
      title: "Rich Mineralization Suite",
      content:
        "The dominating mineralization includes copper sulphide (CuFeS₂) and iron sulphide (FeS₂). Locally found: zinc sulphide or sphalerite (ZnS) and lead sulphide or galena (PbS). Following the base metals are notable concentrations of precious metals like silver (Ag) and gold (Au), along with trace amounts of platinum (Pt), palladium (Pd) and rhodium (Rh). Additional rare elements include indium and REE.",
      imageUrl: "/copper-minerals.jpg",
      imagePosition: "right",
      alt: "Copper minerals from exploration",
      category: "mineralization",
      highlights: ["Sphalerite", "Chalcopyrite", "Galena", "REE Elements", "70+ Elements"],
    },
    {
      title: "Advanced Exploration Technology",
      content:
        "In late 2022 and 2023, we engaged Sunnfjord Geo Center AS and GeoVista AB for high-performance geological mapping combined with evaluation of existing geophysical data. A follow-up geophysical TEM-survey is planned for late 2025. XRF measurements and comprehensive sampling have confirmed the mineral potential.",
      imageUrl: "/tem-study.jpg",
      imagePosition: "left",
      alt: "TEM geophysical survey",
      category: "fieldwork",
      year: "2023-2025",
      highlights: ["TEM Survey", "XRF Analysis", "GeoVista AB", "SGC AS"],
    },
    {
      title: "Bjønsås Mine - Copper Potential",
      content:
        "Drilling in the adjacent Bjønsås mining area has proved significant high grades of copper. The mine shows magnetite-rich zones detected via compass interference. Green and rust-red colorations inside the mines testify to ongoing oxidation of copper and iron-bearing minerals. The area shows exceptional potential for copper, while Skrattås excels in zinc, silver and gold.",
      imageUrl: "/bjonsas-mine-interior.jpg",
      imagePosition: "right",
      alt: "Bjønsås mine interior",
      category: "discovery",
      highlights: ["High-Grade Copper", "Magnetite Zones", "Active Oxidation"],
    },
  ],
  timeline: [
    {
      icon: Mountain,
      title: "1886",
      subtitle: "First Mining Operations",
      description: "Test mining began at Skrattås, marking the start of organized mineral extraction in the area. Multiple owners conducted exploration over the following decades.",
      image: "/skrattas-mine-1.jpg",
      items: [
        "Test mining operations 1886-1914",
        "Multiple ownership transitions",
        "Early underground development",
        "Initial ore body characterization"
      ],
    },
    {
      icon: Mountain,
      title: "1925-1927",
      subtitle: "Commercial Production",
      description: "Constant production registered during this period, establishing Skrattås as a viable commercial mining operation.",
      image: "/marken-mine.jpg",
      items: [
        "Consistent ore extraction",
        "Underground workings expanded",
        "Grade optimization achieved",
        "Infrastructure development"
      ],
    },
    {
      icon: FlaskConical,
      title: "1979-1981",
      subtitle: "Peak Production Era",
      description: "High-grade ore extraction reached exceptional levels with 5,000 tons at 34% Zn, 10.4% Pb, and 1.9% Cu. Underground operations terminated at 80m depth.",
      image: "/bjonsas-mineral.jpg",
      highlight: true,
      items: [
        "5,000 tons extracted",
        "34% Zinc grade achieved",
        "10.4% Lead content",
        "80m depth reached"
      ],
    },
    {
      icon: FileCheck,
      title: "2022",
      subtitle: "License Acquisition",
      description: "Pure Minerals secured 7 exploration licenses covering 51 km² in the Skrattås-Byafossen area. Modern exploration program initiated.",
      image: "/gaulstad-mokk-map.jpg",
      highlight: true,
      items: [
        "7 licenses acquired",
        "51 km² exploration area",
        "Modern survey program launched",
        "Historic data compilation"
      ],
    },
    {
      icon: Search,
      title: "2023-2024",
      subtitle: "Advanced Exploration",
      description: "Comprehensive geological mapping with Sunnfjord Geo Center AS and GeoVista AB. XRF analysis confirmed exceptional grades: 28.8% Zn, 9% Pb, 539 ppm Ag, 10 ppm Au.",
      image: "/tem-study.jpg",
      highlight: true,
      items: [
        "XRF measurements completed",
        "28.8% Zinc confirmed",
        "539 ppm Silver detected",
        "10 ppm Gold identified"
      ],
      button: {
        url: "/about",
        text: "View Full Analysis"
      }
    },
    {
      icon: Rocket,
      title: "2025",
      subtitle: "Deep Drilling Campaign",
      description: "Follow-up TEM survey and deep drilling strategy implementation planned. Mineralization continues below 80m depth with significant untapped potential.",
      image: "/copper-minerals.jpg",
      highlight: true,
      items: [
        "TEM survey Q2 2025",
        "Deep drilling program",
        "Below 80m exploration",
        "Resource estimation"
      ],
      button: {
        url: "/contact",
        text: "Join the Program"
      }
    },
  ],
};
