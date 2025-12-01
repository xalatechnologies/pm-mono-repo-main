import type { ProjectMapConfig } from "../types";

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
  geoJsonFeatures: [
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
  contentCards: [
    {
      title: "Skrattåsen Mines - A Glimpse into the Past",
      content:
        "Active from 1888 to 1927, Skrattåsen was one of several zinc mines in the area, with up to 30 people working underground. Remains such as sleepers, rails and tools are still present inside the mine corridors, which reach depths of 75 meters and lengths up to 170 meters.",
      imageUrl: "/mine1.png",
      alt: "Mine at Skrattåsen",
    },
    {
      title: "Rich Mineralization - From Azurite to Zinc",
      content:
        "The mines at Skrattåsen and Bjørnås are rich in ore minerals. Field studies have documented occurrences of sphalerite (zinc blende), chalcopyrite (copper), galena (lead), pyrite, bornite, hematite, malachite, and azurite. At Bjørnås, compass interference hinted at magnetite-rich zones. Green and rust-red colorations inside the mines testify to the ongoing oxidation of copper and iron-bearing minerals.",
      imageUrl: "/minerals1.png",
      imagePosition: "left",
      alt: "Rich Mineralization",
    },
    {
      title: "Tectonic Forces and Folded Rocks",
      content:
        "The rocks at Skrattåsen are intensely deformed. Foliation is often vertical and folded, aligning with structures of the Møre-Trøndelag Fault Zone. Observations include mylonite, isoclinal folds, and foliation-parallel quartz and limestone lenses. These features indicate multiple tectonic phases, from ductile shearing to brittle faulting.",
      imageUrl: "/folds1.png",
      imagePosition: "right",
      alt: "Folded Rocks",
    },
    {
      title: "Fieldwork 2024 - Mapping the Invisible",
      content:
        "During June and August 2024, geologists conducted extensive fieldwork across Skrattåsen and nearby areas. Over 30 km² were logged with detailed measurements, samples, and structural mapping. Findings include foliation-parallel limestone lenses, isoclinal folds, and signs of syn-sedimentary deformation. The work contributes to a broader understanding of the Møre-Trøndelag Fault Zone and its mineral potential.",
      imageUrl: "/fieldwork1.png",
      imagePosition: "left",
      alt: "Fieldwork",
    },
    {
      title: "Galena, Malachite and Metallic Colors Underground",
      content:
        "The Skrattåsen area is unusually rich in ore-bearing minerals. Galena (lead sulfide) was observed in stream samples near the Bjørnås mine, alongside shiny patches of sphalerite and mica. Inside the mine walls, striking green malachite and blue azurite coat the rocks—classic signs of copper mineralization. Together with bornite and chalcopyrite, these minerals suggest a complex and valuable metallogenic history.",
      imageUrl: "/azurite1.png",
      imagePosition: "right",
      alt: "Azurite",
    },
  ],
};

