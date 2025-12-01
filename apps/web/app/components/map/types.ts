import type { Feature, Polygon, FeatureCollection } from "geojson";

export interface MapConfig {
  center: [number, number];
  zoom: number;
  maxZoom: number;
  minZoom: number;
  flyToZoom?: number;
}

export interface ScannerConfig {
  speed: number;
  startLng: number;
  range: number;
  latRange: [number, number];
}

export interface ContentCard {
  title: string;
  content: string;
  imageUrl: string;
  imagePosition?: "top" | "left" | "right";
  alt: string;
}

export interface ProjectMapConfig {
  id: string;
  mapConfig: MapConfig;
  scannerConfig: ScannerConfig;
  geoJsonFeatures: Feature<Polygon>[];
  contentCards: ContentCard[];
}

export type { Feature, Polygon, FeatureCollection };

