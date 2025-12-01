"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl, { SourceSpecification } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Feature, Polygon, FeatureCollection, LineString } from "geojson";
import { ScanEye, EyeOff } from "lucide-react";
import ImageCard from "@/app/components/cards/ImageCard";
import type { ProjectMapConfig } from "./types";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

interface ProjectMapPageProps {
  config: ProjectMapConfig;
}

export default function ProjectMapPage({ config }: ProjectMapPageProps) {
  const { mapConfig, scannerConfig, geoJsonFeatures, contentCards, id } = config;

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const timeoutsRef = useRef<number[]>([]);
  const [isMaximized, setIsMaximized] = useState(false);
  const [rotateEnabled, setRotateEnabled] = useState(true);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: mapConfig.center,
      zoom: mapConfig.zoom,
      pitch: 65,
      bearing: -20,
      maxZoom: mapConfig.maxZoom,
      minZoom: mapConfig.minZoom,
      attributionControl: false,
    });

    mapRef.current = map;
    let scanInterval: NodeJS.Timeout;

    // Disable interactions initially
    map.scrollZoom.disable();
    map.boxZoom.disable();
    map.dragRotate.disable();
    map.dragPan.disable();
    map.keyboard.disable();
    map.doubleClickZoom.disable();
    map.touchZoomRotate.disable();

    map.on("load", () => {
      // Remove default controls and labels
      document.querySelectorAll<HTMLElement>(".mapboxgl-ctrl-bottom-left").forEach((el) => el.remove());
      ["road-number-shield", "road-label", "motorway-number-shield"].forEach((layerId) => {
        if (map.getLayer(layerId)) map.removeLayer(layerId);
      });

      // Terrain & fog
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.terrain-rgb",
        tileSize: 512,
      });
      map.setTerrain({ source: "mapbox-dem", exaggeration: 2 });
      map.setFog({
        range: [-0.5, 4],
        color: "white",
        "high-color": "#add8e6",
        "horizon-blend": 0.3,
        "space-color": "#d8f2ff",
        "star-intensity": 0,
      });

      // GeoJSON features
      const geoJson: SourceSpecification = {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: geoJsonFeatures,
        },
      };

      const originalGeoData = geoJson.data as FeatureCollection<Polygon>;
      map.addSource(id, geoJson);

      // Glow line
      map.addLayer({
        id: `${id}-glow`,
        type: "line",
        source: id,
        paint: {
          "line-color": "#00f0ff",
          "line-width": ["interpolate", ["linear"], ["coalesce", ["get", "scan"], 0], 0, 0, 1, 12],
          "line-opacity": ["interpolate", ["linear"], ["coalesce", ["get", "scan"], 0], 0, 0.2, 1, 0.8],
          "line-blur": 4,
        },
      });

      // Highlight fill
      map.addLayer({
        id: `${id}-highlight`,
        type: "fill",
        source: id,
        paint: {
          "fill-color": [
            "interpolate",
            ["linear"],
            ["coalesce", ["get", "scan"], 0],
            0,
            "#000000",
            0.5,
            "#005566",
            1,
            "#00f0ff",
          ],
          "fill-opacity": 0.6,
          "fill-outline-color": "#ffffff",
        },
      });

      // Scanner stripe source + layer
      map.addSource("scanner-stripe", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
      map.addLayer({
        id: "scanner-stripe",
        type: "line",
        source: "scanner-stripe",
        paint: {
          "line-color": ["interpolate", ["linear"], ["zoom"], 8, "#00f0ff", 12, "#66ffff"],
          "line-width": ["interpolate", ["linear"], ["zoom"], 8, 1, 12, 4],
          "line-opacity": ["interpolate", ["linear"], ["zoom"], 8, 0.3, 12, 0.8],
          "line-blur": 2,
        },
      });

      // Scanner animation
      let scanProgress = 0;
      let scanDirection = 1;
      const hitCooldown: Record<string, number> = {};

      scanInterval = setInterval(() => {
        scanProgress += scanDirection * scannerConfig.speed;

        if (scanProgress >= 1) {
          scanProgress = 1;
          scanDirection = -1;
        }
        if (scanProgress <= 0) {
          scanProgress = 0;
          scanDirection = 1;
        }

        const lng = scannerConfig.startLng + scanProgress * scannerConfig.range;

        const stripe: FeatureCollection<LineString> = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: [
                  [lng, scannerConfig.latRange[0]],
                  [lng, scannerConfig.latRange[1]],
                ],
              },
            },
          ],
        };

        (map.getSource("scanner-stripe") as mapboxgl.GeoJSONSource).setData(stripe);

        const now = Date.now();
        const updated = JSON.parse(JSON.stringify(originalGeoData));

        updated.features.forEach((f: Feature<Polygon>) => {
          f.properties = f.properties || {};
          const lons = (f.geometry.coordinates[0] as number[][]).map((c) => c[0]);
          const featureId = f.properties.navn as string;
          const hit = lng >= Math.min(...lons) && lng <= Math.max(...lons);

          if (hit) {
            f.properties.scan = 0.6 + 0.2 * Math.sin(now / 500);
            hitCooldown[featureId] = now;
          } else if (hitCooldown[featureId] && now - hitCooldown[featureId] < 1500) {
            f.properties.scan = Math.max(0, (1500 - (now - hitCooldown[featureId])) / 1500);
          } else {
            f.properties.scan = 0;
          }
        });

        (map.getSource(id) as mapboxgl.GeoJSONSource).setData({
          type: "FeatureCollection",
          features: updated.features,
        });
      }, 100);
    });

    return () => {
      mapRef.current?.remove();
      clearInterval(scanInterval);
    };
  }, [id, mapConfig, scannerConfig, geoJsonFeatures]);

  // Rotation effect
  useEffect(() => {
    if (!mapRef.current) return;

    let bearing = mapRef.current.getBearing();
    let direction = 1;

    const intervalId = setInterval(() => {
      if (rotateEnabled) {
        bearing += direction * 0.1;
        if (bearing > 10 || bearing < -50) direction *= -1;
        mapRef.current?.setBearing(bearing);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [rotateEnabled]);

  // Maximize/minimize effect
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear all existing timers
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    if (isMaximized) {
      // Enable interactions, disable rotation
      map.scrollZoom.enable();
      map.boxZoom.enable();
      map.dragRotate.enable();
      map.dragPan.enable();
      map.keyboard.enable();
      map.doubleClickZoom.enable();
      map.touchZoomRotate.enable();
      setRotateEnabled(false);
    } else {
      // Disable interactions + flyTo & rotation
      map.scrollZoom.disable();
      map.boxZoom.disable();
      map.dragRotate.disable();
      map.dragPan.disable();
      map.keyboard.disable();
      map.doubleClickZoom.disable();
      map.touchZoomRotate.disable();

      const flyId = window.setTimeout(() => {
        map.flyTo({
          center: mapConfig.center,
          zoom: mapConfig.flyToZoom ?? mapConfig.zoom,
          bearing: -20,
          pitch: 65,
          speed: 0.8,
          curve: 1,
        });
      }, 1000);
      timeoutsRef.current.push(flyId);

      const rotateId = window.setTimeout(() => {
        setRotateEnabled(true);
      }, 5500);
      timeoutsRef.current.push(rotateId);
    }

    const resizeId = window.setTimeout(() => {
      map.resize();
    }, 300);
    timeoutsRef.current.push(resizeId);

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [isMaximized, mapConfig]);

  return (
    <>
      <button
        onClick={() => setIsMaximized((prev) => !prev)}
        className="fixed top-[100px] right-4 z-50 bg-[var(--primary-blue)] text-white opacity-50 hover:opacity-100 p-1 rounded shadow cursor-pointer"
        aria-label={isMaximized ? "Minimer kart" : "Maximer kart"}
      >
        {isMaximized ? <EyeOff size={32} /> : <ScanEye size={32} />}
      </button>

      <div
        className={`map-container transition-all duration-500 ${
          isMaximized ? "fixed inset-0 maximized z-20" : "relative w-full h-[50vh]"
        }`}
      >
        <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
      </div>

      {!isMaximized && (
        <div className="relative z-100 container mx-auto px-4 mt-5 pb-8">
          {contentCards.map((card, index) => (
            <ImageCard
              key={index}
              title={card.title}
              content={card.content}
              imageUrl={card.imageUrl}
              imagePosition={card.imagePosition}
              alt={card.alt}
            />
          ))}
        </div>
      )}
    </>
  );
}

