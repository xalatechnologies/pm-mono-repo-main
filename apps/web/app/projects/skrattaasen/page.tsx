"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl, { SourceSpecification } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Feature, Polygon, FeatureCollection, LineString } from "geojson";
import { ScanEye, EyeOff } from "lucide-react";
import ImageCard from "@/app/components/cards/ImageCard";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function Page() {
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
      center: [11.55, 64.0548],
      zoom: 11,
      pitch: 65,
      bearing: -20,
      maxZoom: 18,
      minZoom: 8,
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
          features: [
            {
              type: "Feature",
              properties: { navn: "Byafossen 1" },
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
              properties: { navn: "Byafossen 2" },
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
              properties: { navn: "Byafossen 3" },
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
        },
      };
      const originalGeoData = geoJson.data as FeatureCollection<Polygon>;
      map.addSource("skrattaasen", geoJson);

      // Glow line
      map.addLayer({
        id: "skrattaasen-glow",
        type: "line",
        source: "skrattaasen",
        paint: {
          "line-color": "#00f0ff",
          "line-width": ["interpolate", ["linear"], ["coalesce", ["get", "scan"], 0], 0, 0, 1, 12],
          "line-opacity": ["interpolate", ["linear"], ["coalesce", ["get", "scan"], 0], 0, 0.2, 1, 0.8],
          "line-blur": 4,
        },
      });

      // Highlight fill
      map.addLayer({
        id: "skrattaasen-highlight",
        type: "fill",
        source: "skrattaasen",
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
        scanProgress += scanDirection * 0.005;
        if (scanProgress >= 1) {
          scanProgress = 1;
          scanDirection = -1;
        }
        if (scanProgress <= 0) {
          scanProgress = 0;
          scanDirection = 1;
        }
        const lng = 11.46 + scanProgress * 0.18;

        const stripe: FeatureCollection<LineString> = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: [
                  [lng, 64.035],
                  [lng, 64.09],
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
          const id = f.properties.navn as string;
          const hit = lng >= Math.min(...lons) && lng <= Math.max(...lons);
          if (hit) {
            f.properties.scan = 0.6 + 0.2 * Math.sin(now / 500);
            hitCooldown[id] = now;
          } else if (hitCooldown[id] && now - hitCooldown[id] < 1500) {
            f.properties.scan = Math.max(0, (1500 - (now - hitCooldown[id])) / 1500);
          } else {
            f.properties.scan = 0;
          }
        });
        (map.getSource("skrattaasen") as mapboxgl.GeoJSONSource).setData({
          type: "FeatureCollection",
          features: updated.features,
        });
      }, 100);
    });

    return () => {
      mapRef.current?.remove();
      clearInterval(scanInterval);
      // map.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    let bearing = mapRef.current.getBearing();
    let direction = 1;
    const id = setInterval(() => {
      if (rotateEnabled) {
        bearing += direction * 0.1;
        if (bearing > 10 || bearing < -50) direction *= -1;
        mapRef.current?.setBearing(bearing);
      }
    }, 100);
    return () => clearInterval(id);
  }, [rotateEnabled]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // 1) Rydd opp alle eksisterende timere
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    if (isMaximized) {
      // 2a) Maksimert: aktiver interaksjoner, deaktiver rotasjon
      map.scrollZoom.enable();
      map.boxZoom.enable();
      map.dragRotate.enable();
      map.dragPan.enable();
      map.keyboard.enable();
      map.doubleClickZoom.enable();
      map.touchZoomRotate.enable();
      setRotateEnabled(false);
    } else {
      // 2b) Ikke maks: deaktiver interaksjoner + flyTo & rotasjon
      map.scrollZoom.disable();
      map.boxZoom.disable();
      map.dragRotate.disable();
      map.dragPan.disable();
      map.keyboard.disable();
      map.doubleClickZoom.disable();
      map.touchZoomRotate.disable();

      const flyId = window.setTimeout(() => {
        map.flyTo({
          center: [11.55, 64.0548],
          zoom: 11,
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
  }, [isMaximized]);

  return (
    <>
      <button
        onClick={() => setIsMaximized((prev) => !prev)}
        className="fixed top-[100px] right-4 z-50 bg-[var(--primary-blue)] text-white opacity-50 hover:opacity-100  p-1 rounded shadow cursor-pointer"
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
        <>
          {/* <div className="max-w-4xl mx-auto p-4">
            <StandardCard
              title="Our Mission"
              content="We source minerals in ways that support long-term sustainability and innovation."
            />
          </div> */}

          <div className="relative z-100 container mx-auto px-4 mt-5  pb-8">
            <ImageCard
              title="Skrattåsen Mines - A Glimpse into the Past"
              content="Active from 1888 to 1927, Skrattåsen was one of several zinc mines in the area, with up to 30 people working underground. Remains such as sleepers, rails and tools are still present inside the mine corridors, which reach depths of 75 meters and lengths up to 170 meters."
              imageUrl="/mine1.png"
              // imagePosition="left"
              alt="Mine at Skrattåsen"
            />

            <ImageCard
              title="Rich Mineralization - From Azurite to Zinc"
              content="The mines at Skrattåsen and Bjørnås are rich in ore minerals. Field studies have documented occurrences of sphalerite (zinc blende), chalcopyrite (copper), galena (lead), pyrite, bornite, hematite, malachite, and azurite. At Bjørnås, compass interference hinted at magnetite-rich zones. Green and rust-red colorations inside the mines testify to the ongoing oxidation of copper and iron-bearing minerals."
              imageUrl="/minerals1.png"
              imagePosition="left"
              alt="Rich Mineralization"
            />
            <ImageCard
              title="Tectonic Forces and Folded Rocks"
              content="The rocks at Skrattåsen are intensely deformed. Foliation is often vertical and folded, aligning with structures of the Møre-Trøndelag Fault Zone. Observations include mylonite, isoclinal folds, and foliation-parallel quartz and limestone lenses. These features indicate multiple tectonic phases, from ductile shearing to brittle faulting."
              imageUrl="/folds1.png"
              imagePosition="right"
              alt="Folded Rocks"
            />

            <ImageCard
              title="Fieldwork 2024 - Mapping the Invisible"
              content="During June and August 2024, geologists conducted extensive fieldwork across Skrattåsen and nearby areas. Over 30 km² were logged with detailed measurements, samples, and structural mapping. Findings include foliation-parallel limestone lenses, isoclinal folds, and signs of syn-sedimentary deformation. The work contributes to a broader understanding of the Møre-Trøndelag Fault Zone and its mineral potential."
              imageUrl="/fieldwork1.png"
              imagePosition="left"
              alt="Fieldwork"
            />
            <ImageCard
              title="Galena, Malachite and Metallic Colors Underground"
              content="The Skrattåsen area is unusually rich in ore-bearing minerals. Galena (lead sulfide) was observed in stream samples near the Bjørnås mine, alongside shiny patches of sphalerite and mica. Inside the mine walls, striking green malachite and blue azurite coat the rocks—classic signs of copper mineralization. Together with bornite and chalcopyrite, these minerals suggest a complex and valuable metallogenic history."
              imageUrl="/azurite1.png"
              imagePosition="right"
              alt="Azurite"
            />
          </div>
        </>
      )}
    </>
  );
}
