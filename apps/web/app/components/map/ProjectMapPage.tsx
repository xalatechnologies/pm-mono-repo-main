"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl, { SourceSpecification } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Feature, Polygon, FeatureCollection, LineString } from "geojson";
import { 
  ScanEye, 
  EyeOff, 
  Layers, 
  Mountain, 
  Satellite, 
  MapPin,
  Info,
  X,
  Gem,
  Ruler,
  FileText,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import ScrollTimeline from "@/app/components/ui/ScrollTimeline";
import GoldDivider from "@/app/components/ui/GoldDivider";
import Button from "@/app/components/ui/Button";
import type { ProjectMapConfig, MineMarker } from "./types";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

interface ProjectMapPageProps {
  config: ProjectMapConfig;
}

export default function ProjectMapPage({ config }: ProjectMapPageProps) {
  const { mapConfig, scannerConfig, geoJsonFeatures, id, markers = [], projectInfo } = config;

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const timeoutsRef = useRef<number[]>([]);
  
  const [isMaximized, setIsMaximized] = useState(false);
  const [rotateEnabled, setRotateEnabled] = useState(true);
  const [mapStyle, setMapStyle] = useState<"satellite" | "terrain">("satellite");
  const [showLegend, setShowLegend] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<MineMarker | null>(null);
  const [showMarkers, setShowMarkers] = useState(true);

  // Create markers
  const createMarkers = useCallback((map: mapboxgl.Map) => {
    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    if (!showMarkers) return;

    markers.forEach((marker) => {
      // Create custom marker element
      const el = document.createElement("div");
      el.className = "map-marker";
      el.innerHTML = `
        <div class="marker-pin ${marker.type === 'mine' ? 'mine' : marker.type === 'sample' ? 'sample' : 'poi'}">
          <div class="marker-inner"></div>
        </div>
      `;

      // Add click handler
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        setSelectedMarker(marker);
      });

      const mapMarker = new mapboxgl.Marker({ element: el })
        .setLngLat(marker.coordinates)
        .addTo(map);

      markersRef.current.push(mapMarker);
    });
  }, [markers, showMarkers]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;

    const styleUrl = mapStyle === "satellite" 
      ? "mapbox://styles/mapbox/satellite-streets-v12"
      : "mapbox://styles/mapbox/outdoors-v12";

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: styleUrl,
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
        color: mapStyle === "satellite" ? "white" : "#e8e4dc",
        "high-color": mapStyle === "satellite" ? "#add8e6" : "#b87333",
        "horizon-blend": 0.3,
        "space-color": mapStyle === "satellite" ? "#d8f2ff" : "#f5f0e8",
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

      // License area fill with gradient based on mineral potential
      map.addLayer({
        id: `${id}-fill`,
        type: "fill",
        source: id,
        paint: {
          "fill-color": [
            "interpolate",
            ["linear"],
            ["coalesce", ["get", "potential"], 0.5],
            0, "#1a1f2e",
            0.5, "#4a7c6f",
            1, "#b87333",
          ],
          "fill-opacity": 0.3,
        },
      });

      // Glow line
      map.addLayer({
        id: `${id}-glow`,
        type: "line",
        source: id,
        paint: {
          "line-color": "#b87333",
          "line-width": ["interpolate", ["linear"], ["coalesce", ["get", "scan"], 0], 0, 2, 1, 12],
          "line-opacity": ["interpolate", ["linear"], ["coalesce", ["get", "scan"], 0], 0, 0.4, 1, 1],
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
            "transparent",
            0.5,
            "#4a7c6f",
            1,
            "#b87333",
          ],
          "fill-opacity": 0.6,
          "fill-outline-color": "#b87333",
        },
      });

      // License area labels
      map.addLayer({
        id: `${id}-labels`,
        type: "symbol",
        source: id,
        layout: {
          "text-field": ["get", "navn"],
          "text-size": 12,
          "text-anchor": "center",
          "text-allow-overlap": false,
        },
        paint: {
          "text-color": "#ffffff",
          "text-halo-color": "#1a1f2e",
          "text-halo-width": 2,
        },
      });

      // Scanner stripe source + layer
      map.addSource("scanner-stripe", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
      map.addLayer({
        id: "scanner-stripe",
        type: "line",
        source: "scanner-stripe",
        paint: {
          "line-color": ["interpolate", ["linear"], ["zoom"], 8, "#b87333", 12, "#d4a574"],
          "line-width": ["interpolate", ["linear"], ["zoom"], 8, 1, 12, 4],
          "line-opacity": ["interpolate", ["linear"], ["zoom"], 8, 0.3, 12, 0.8],
          "line-blur": 2,
        },
      });

      // Create markers
      createMarkers(map);

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
      markersRef.current.forEach(m => m.remove());
      mapRef.current?.remove();
      clearInterval(scanInterval);
    };
  }, [id, mapConfig, scannerConfig, geoJsonFeatures, mapStyle, createMarkers]);

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

  // Update markers when toggle changes
  useEffect(() => {
    if (mapRef.current) {
      createMarkers(mapRef.current);
    }
  }, [showMarkers, createMarkers]);

  return (
    <>
      {/* Control Panel */}
      <div className="fixed top-[100px] right-4 z-50 flex flex-col gap-2">
        {/* Maximize/Minimize */}
        <button
          onClick={() => setIsMaximized((prev) => !prev)}
          className="map-control-btn"
          aria-label={isMaximized ? "Minimer kart" : "Maximer kart"}
          title={isMaximized ? "Minimize map" : "Maximize map"}
        >
          {isMaximized ? <EyeOff size={20} /> : <ScanEye size={20} />}
        </button>

        {/* Layer Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowLegend(!showLegend)}
            className="map-control-btn"
            aria-label="Toggle layers"
            title="Map layers"
          >
            <Layers size={20} />
          </button>
          
          {showLegend && (
            <div className="absolute right-full mr-2 top-0 bg-[var(--obsidian)]/95 backdrop-blur-md rounded-lg p-3 min-w-[180px] border border-[var(--secondary)]/30">
              <h4 className="text-xs font-semibold text-[var(--secondary)] uppercase tracking-wider mb-3">Map Style</h4>
              <div className="space-y-2">
                <button
                  onClick={() => setMapStyle("satellite")}
                  className={`flex items-center gap-2 w-full px-2 py-1.5 rounded text-sm transition-colors ${
                    mapStyle === "satellite" 
                      ? "bg-[var(--secondary)]/20 text-[var(--secondary)]" 
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  <Satellite size={16} />
                  Satellite
                </button>
                <button
                  onClick={() => setMapStyle("terrain")}
                  className={`flex items-center gap-2 w-full px-2 py-1.5 rounded text-sm transition-colors ${
                    mapStyle === "terrain" 
                      ? "bg-[var(--secondary)]/20 text-[var(--secondary)]" 
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  <Mountain size={16} />
                  Terrain
                </button>
              </div>
              
              <h4 className="text-xs font-semibold text-[var(--secondary)] uppercase tracking-wider mt-4 mb-3">Overlays</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer hover:text-white">
                  <input
                    type="checkbox"
                    checked={showMarkers}
                    onChange={(e) => setShowMarkers(e.target.checked)}
                    className="accent-[var(--secondary)]"
                  />
                  <MapPin size={16} />
                  Points of Interest
                </label>
              </div>

              <h4 className="text-xs font-semibold text-[var(--secondary)] uppercase tracking-wider mt-4 mb-3">License Areas</h4>
              <div className="space-y-1.5">
                {geoJsonFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-white/70">
                    <div className="w-3 h-3 rounded-sm bg-[var(--secondary)]/50 border border-[var(--secondary)]" />
                    {(feature.properties as { navn?: string })?.navn || `Area ${i + 1}`}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Info Panel Toggle */}
        {projectInfo && (
          <button
            onClick={() => setShowInfoPanel(!showInfoPanel)}
            className="map-control-btn"
            aria-label="Project info"
            title="Project information"
          >
            <Info size={20} />
          </button>
        )}
      </div>

      {/* Project Info Panel */}
      {showInfoPanel && projectInfo && (
        <div className="fixed top-[100px] left-4 z-50 bg-[var(--obsidian)]/95 backdrop-blur-md rounded-xl p-4 w-72 border border-[var(--secondary)]/30 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg text-white">{projectInfo.name}</h3>
            <button 
              onClick={() => setShowInfoPanel(false)}
              className="text-white/50 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-lg bg-[var(--secondary)]/20 flex items-center justify-center">
                <FileText size={16} className="text-[var(--secondary)]" />
              </div>
              <div>
                <div className="text-white/50 text-xs">Licenses</div>
                <div className="text-white font-semibold">{projectInfo.licenses}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/20 flex items-center justify-center">
                <Ruler size={16} className="text-[var(--accent)]" />
              </div>
              <div>
                <div className="text-white/50 text-xs">Total Area</div>
                <div className="text-white font-semibold">{projectInfo.area}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-lg bg-[var(--earth-brown)]/20 flex items-center justify-center">
                <Gem size={16} className="text-[var(--earth-brown)]" />
              </div>
              <div>
                <div className="text-white/50 text-xs">Minerals</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {projectInfo.minerals.map((mineral, i) => (
                    <span 
                      key={i}
                      className="px-1.5 py-0.5 text-xs rounded bg-[var(--secondary)]/20 text-[var(--secondary)]"
                    >
                      {mineral}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {projectInfo.status && (
              <div className="pt-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    projectInfo.status === "Active" ? "bg-green-500" : "bg-yellow-500"
                  } animate-pulse`} />
                  <span className="text-sm text-white/70">{projectInfo.status}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Marker Detail Popup */}
      {selectedMarker && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-[var(--obsidian)]/95 backdrop-blur-md rounded-xl p-4 max-w-md w-[calc(100%-2rem)] border border-[var(--secondary)]/30 shadow-2xl">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${
                  selectedMarker.type === "mine" ? "bg-[var(--secondary)]" :
                  selectedMarker.type === "sample" ? "bg-[var(--accent)]" : "bg-white"
                }`} />
                <span className="text-xs uppercase tracking-wider text-white/50">
                  {selectedMarker.type}
                </span>
              </div>
              <h4 className="font-serif text-lg text-white mb-1">{selectedMarker.name}</h4>
              {selectedMarker.description && (
                <p className="text-sm text-white/70">{selectedMarker.description}</p>
              )}
              {selectedMarker.minerals && selectedMarker.minerals.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedMarker.minerals.map((mineral, i) => (
                    <span 
                      key={i}
                      className="px-2 py-0.5 text-xs rounded-full bg-[var(--secondary)]/20 text-[var(--secondary)]"
                    >
                      {mineral}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <button 
              onClick={() => setSelectedMarker(null)}
              className="text-white/50 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div
        className={`map-container transition-all duration-500 ${
          isMaximized ? "fixed inset-0 maximized z-20" : "relative w-full h-[65vh] min-h-[450px]"
        }`}
      >
        <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
      </div>

      {/* Content */}
      {!isMaximized && (
        <div className="relative z-10" style={{ marginTop: "-120px" }}>
          {/* Project Timeline - Main Content */}
          {config.timeline && config.timeline.length > 0 && (
            <section className="bg-[var(--color-neutral-100)]">
              <ScrollTimeline
                badge={projectInfo?.status || "Active Exploration"}
                title={projectInfo?.name || "Project Journey"}
                description={id === "skrattaasen" 
                  ? "Exceptional zinc, lead, silver and gold deposits with proven high-grade mineralization dating back to 1886."
                  : "Historic copper mining district with over 50 documented mines dating back to 1760."
                }
                entries={config.timeline}
              />
            </section>
          )}

          <GoldDivider />

          {/* Key Highlights Section */}
          <section className="py-12 md:py-16 bg-white">
            <div className="site-container">
              <div className="text-center mb-8">
                <span className="section-badge section-badge--filled mb-3">
                  Key Highlights
                </span>
                <h2 className="display-3 text-[var(--color-brand-primary)]">
                  Project at a Glance
                </h2>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                <div className="bg-[var(--color-neutral-50)] rounded-2xl p-6 text-center border border-[var(--color-neutral-200)]">
                  <div className="text-3xl md:text-4xl font-display font-bold text-[var(--color-earth-copper)] mb-2">
                    {projectInfo?.licenses || 0}
                  </div>
                  <div className="text-sm text-[var(--color-neutral-600)]">Mining Licenses</div>
                </div>
                <div className="bg-[var(--color-neutral-50)] rounded-2xl p-6 text-center border border-[var(--color-neutral-200)]">
                  <div className="text-3xl md:text-4xl font-display font-bold text-[var(--color-earth-copper)] mb-2">
                    {projectInfo?.area || "0 km²"}
                  </div>
                  <div className="text-sm text-[var(--color-neutral-600)]">Total Area</div>
                </div>
                <div className="bg-[var(--color-neutral-50)] rounded-2xl p-6 text-center border border-[var(--color-neutral-200)]">
                  <div className="text-3xl md:text-4xl font-display font-bold text-[var(--color-earth-copper)] mb-2">
                    {projectInfo?.established || "2021"}
                  </div>
                  <div className="text-sm text-[var(--color-neutral-600)]">Established</div>
                </div>
                <div className="bg-[var(--color-neutral-50)] rounded-2xl p-6 text-center border border-[var(--color-neutral-200)]">
                  <div className="text-3xl md:text-4xl font-display font-bold text-[var(--color-earth-copper)] mb-2">
                    {projectInfo?.minerals.length || 0}
                  </div>
                  <div className="text-sm text-[var(--color-neutral-600)]">Key Minerals</div>
                </div>
              </div>

              {/* Minerals */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-[var(--color-brand-primary)] mb-4">
                  Target Minerals
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {projectInfo?.minerals.map((mineral, i) => (
                    <span 
                      key={i}
                      className="px-5 py-2.5 text-sm font-medium rounded-full bg-[var(--color-brand-primary)] text-white"
                    >
                      {mineral}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <GoldDivider />

          {/* Investor CTA */}
          <section className="py-12 md:py-16 bg-[var(--color-brand-primary)]">
            <div className="site-container text-center">
              <h2 className="display-3 text-white mb-3">
                Interested in This Project?
              </h2>
              <p className="lead text-white/80 max-w-2xl mx-auto mb-8">
                Learn more about investment opportunities in {projectInfo?.name || "this project"} 
                and how you can participate in Norway&apos;s mineral future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight size={18} />}
                  className="bg-[var(--color-earth-gold-bright)] hover:bg-[var(--color-earth-gold-warm)] text-[var(--color-brand-primary)]"
                >
                  Schedule a Meeting
                </Button>
                <Button
                  href="/projects"
                  variant="outline"
                  size="lg"
                  icon={<ChevronRight size={18} />}
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                >
                  View All Projects
                </Button>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Custom Marker Styles */}
      <style jsx global>{`
        .map-control-btn {
          background: rgba(15, 20, 25, 0.9);
          backdrop-filter: blur(8px);
          color: rgba(255, 255, 255, 0.7);
          padding: 10px;
          border-radius: 10px;
          border: 1px solid rgba(184, 115, 51, 0.3);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .map-control-btn:hover {
          color: #b87333;
          border-color: #b87333;
          background: rgba(15, 20, 25, 0.95);
        }

        .map-marker {
          cursor: pointer;
        }

        .marker-pin {
          width: 24px;
          height: 24px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          position: relative;
          animation: marker-bounce 0.5s ease-out;
        }

        .marker-pin.mine {
          background: linear-gradient(135deg, #b87333, #d4a574);
          box-shadow: 0 4px 12px rgba(184, 115, 51, 0.4);
        }

        .marker-pin.sample {
          background: linear-gradient(135deg, #4a7c6f, #6fa393);
          box-shadow: 0 4px 12px rgba(74, 124, 111, 0.4);
        }

        .marker-pin.poi {
          background: linear-gradient(135deg, #6b7280, #9ca3af);
          box-shadow: 0 4px 12px rgba(107, 114, 128, 0.4);
        }

        .marker-inner {
          width: 10px;
          height: 10px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
        }

        .marker-pin::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50% 50% 50% 0;
          border: 2px solid currentColor;
          opacity: 0;
          animation: marker-pulse 2s ease-out infinite;
        }

        .marker-pin.mine::after { border-color: #b87333; }
        .marker-pin.sample::after { border-color: #4a7c6f; }
        .marker-pin.poi::after { border-color: #6b7280; }

        @keyframes marker-bounce {
          0% { transform: rotate(-45deg) translateY(-20px); opacity: 0; }
          60% { transform: rotate(-45deg) translateY(5px); }
          100% { transform: rotate(-45deg) translateY(0); opacity: 1; }
        }

        @keyframes marker-pulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </>
  );
}
