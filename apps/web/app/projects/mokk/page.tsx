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
      center: [12.2, 63.98],
      zoom: 9.5,
      pitch: 65,
      bearing: -20,
      maxZoom: 16,
      minZoom: 6,
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
              properties: { navn: "Mokk 10B" },
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
              properties: { navn: "Mokk 11B" },
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
              properties: { navn: "Mokk 18B" },
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
              properties: { navn: "Mokk 19" },
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
              properties: { navn: "Mokk 9B" },
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
              properties: { navn: "Mokk" },
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
              properties: { navn: "Mokk 22" },
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
              properties: { navn: "Mokk 23B" },
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
              properties: { navn: "Mokk 25B" },
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
              properties: { navn: "Mokk 26" },
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
              properties: { navn: "Mokk 28B" },
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
        scanProgress += scanDirection * 0.0085;
        if (scanProgress >= 1) {
          scanProgress = 1;
          scanDirection = -1;
        }
        if (scanProgress <= 0) {
          scanProgress = 0;
          scanDirection = 1;
        }
        const lng = 12.01 + scanProgress * 0.35;

        const stripe: FeatureCollection<LineString> = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: [
                  [lng, 64.095],
                  [lng, 63.905],
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

    // const arr: [number, number][] = [];
    // mapRef.current.on("click", (e) => {
    //   arr.push([e.lngLat.lng, e.lngLat.lat]);
    //   console.log(arr.length);
    // });
    // mapRef.current.on("dblclick", () => {
    //   arr.pop();
    //   arr.push(arr[0]);
    //   console.log(arr);
    // });

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
          center: [12.2, 63.98],

          zoom: 10.5,
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
              title="Mining History in the Gaulstad-Mokk Area"
              content="Copper was first discovered at Gruvfjellet in 1760, and by 1764, the Gaulstad No. 1 mine was in full operation. Mining continued in phases until 1891, shifting focus from copper (Cu) to nickel (Ni). These early activities laid the foundation for today's exploration work."
              imageUrl="/mokk1.png"
              // imagePosition="left"
              alt="Mine at Skrattåsen"
            />

            <ImageCard
              title="Rich Base and Precious Metals"
              content="Modern surveys confirm the presence of high-grade copper, zinc and silver across the Mokk and Gaulstad license areas. Smaller but economically interesting concentrations of gold, cobalt and nickel have also been identified."
              imageUrl="/minerals2.png"
              imagePosition="left"
              alt="Rich Mineralization"
            />
            <ImageCard
              title="Untapped Potential in Historic Terrain"
              content="The Gaulstad-Mokk area covers 11 exploration licenses across 100 square kilometers. With geological conditions comparable to the world-renowned Røros mining district, the region offers significant potential for new mineral discoveries."
              imageUrl="/mokk2.png"
              imagePosition="right"
              alt="Folded Rocks"
            />

            <ImageCard
              title="Complex Geology of the Caledonides"
              content="Located within the Støren Nappe of the Scandinavian Caledonides, the area features greenschist to low-amphibolite facies rocks, with metavolcanic and metasedimentary formations. Intrusions prior to tectonic deformation add to the geological complexity and mineralization potential."
              imageUrl=""
              imagePosition="left"
              alt="Fieldwork"
            />
            <ImageCard
              title="Systematic Modern Exploration"
              content="Since 2021, detailed work has been carried out: XRF surveys, geochemical sampling, geological and geophysical mapping. Partnerships with leading Nordic geoscience firms have positioned Gaulstad-Mokk for a planned deep drilling program."
              imageUrl="/mokk.png"
              imagePosition="right"
              alt="Azurite"
            />
            {/* <div className="bg-white shadow-md overflow-hidden mb-6 p-6">

              <div className={`${isSide ? "sm:w-1/2" : "w-full"} relative flex items-center justify-center`}>
                <div className="w-full">
                  <Image
                    src={"/atwork.png"}
                    alt={"Skrattåsen"}
                    width={800}
                    height={600}
                    layout="responsive"
                    className=""
                  />
                </div>
              </div>

              <h2 className="text-xl font-bold mb-2">{title}</h2>
              {content.map((p, i) => (
                <p key={i} className="text-gray-700 mb-4 last:mb-0">
                  {p}
                </p>
              ))}
            </div> */}
          </div>
        </>
      )}
    </>
  );
}
