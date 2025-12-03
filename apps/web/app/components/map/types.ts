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
  category?: "history" | "mineralization" | "geology" | "fieldwork" | "discovery";
  highlights?: string[];
  year?: string;
  location?: string;
}

export interface MineMarker {
  name: string;
  coordinates: [number, number];
  type: "mine" | "sample" | "poi";
  description?: string;
  minerals?: string[];
  depth?: string;
  status?: string;
}

export interface ProjectInfo {
  name: string;
  licenses: number;
  area: string;
  minerals: string[];
  status?: "Active" | "Exploration" | "Development";
  established?: string;
}

export interface ProjectMapConfig {
  id: string;
  mapConfig: MapConfig;
  scannerConfig: ScannerConfig;
  geoJsonFeatures: Feature<Polygon>[];
  contentCards: ContentCard[];
  markers?: MineMarker[];
  projectInfo?: ProjectInfo;
}

export type { Feature, Polygon, FeatureCollection };
