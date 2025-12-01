import type { ProjectMapConfig } from "../types";

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
  geoJsonFeatures: [
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
  contentCards: [
    {
      title: "Mining History in the Gaulstad-Mokk Area",
      content:
        "Copper was first discovered at Gruvfjellet in 1760, and by 1764, the Gaulstad No. 1 mine was in full operation. Mining continued in phases until 1891, shifting focus from copper (Cu) to nickel (Ni). These early activities laid the foundation for today's exploration work.",
      imageUrl: "/mokk1.png",
      alt: "Mine at Skrattåsen",
    },
    {
      title: "Rich Base and Precious Metals",
      content:
        "Modern surveys confirm the presence of high-grade copper, zinc and silver across the Mokk and Gaulstad license areas. Smaller but economically interesting concentrations of gold, cobalt and nickel have also been identified.",
      imageUrl: "/minerals2.png",
      imagePosition: "left",
      alt: "Rich Mineralization",
    },
    {
      title: "Untapped Potential in Historic Terrain",
      content:
        "The Gaulstad-Mokk area covers 11 exploration licenses across 100 square kilometers. With geological conditions comparable to the world-renowned Røros mining district, the region offers significant potential for new mineral discoveries.",
      imageUrl: "/mokk2.png",
      imagePosition: "right",
      alt: "Folded Rocks",
    },
    {
      title: "Complex Geology of the Caledonides",
      content:
        "Located within the Støren Nappe of the Scandinavian Caledonides, the area features greenschist to low-amphibolite facies rocks, with metavolcanic and metasedimentary formations. Intrusions prior to tectonic deformation add to the geological complexity and mineralization potential.",
      imageUrl: "",
      imagePosition: "left",
      alt: "Fieldwork",
    },
    {
      title: "Systematic Modern Exploration",
      content:
        "Since 2021, detailed work has been carried out: XRF surveys, geochemical sampling, geological and geophysical mapping. Partnerships with leading Nordic geoscience firms have positioned Gaulstad-Mokk for a planned deep drilling program.",
      imageUrl: "/mokk.png",
      imagePosition: "right",
      alt: "Azurite",
    },
  ],
};

