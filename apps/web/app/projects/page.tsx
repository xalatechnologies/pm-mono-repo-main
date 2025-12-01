import React from "react";
import StandardCard from "../components/cards/StandardCard";
import ImageCard from "../components/cards/ImageCard";

export default async function ProjectPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ImageCard
        title="Laying the Groundwork for Discoveries in Steinkjer"
        content={[
          "Pure Minerals is an early-phase exploration company actively developing several of its mining licenses in the Steinkjer area, Trøndelag County, Norway.",
          "While initial exploration efforts during late 2021 and throughout 2022 focused on the historic, mostly water-filled mine entrances at Gaulstad and Mokk, recent developments have brought increased attention to the Skrattåsen site. Early work included XRF measurements and sampling of bedrock and waste material for geochemical analysis.",
          "In late 2022, geological and geophysical surveys were conducted by our associates, Sunnfjord Geo Center AS and GeoVista AB, with fieldwork including the Skrattåsen mine area. This site has since emerged as a key focus area for Pure Minerals, based on promising structural and geochemical indicators.",
          "Further high-resolution investigations were carried out in 2024 and continue into 2025, with Skrattåsen now leading our strategic development. Planned geophysical surveys, including a targeted TEM (Transient Electromagnetic) survey, will inform a coordinated deep drilling strategy across our license areas.",
        ]}
        imageUrl="/NO_5006_Steinkjer.svg"
        imagePosition="left"
        alt="Steinkjer in Trøndelag County, Norway"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StandardCard
          halfWidth
          title="Skrattåsen Exploration Area"
          content={["5 liscenses", "38 km²"]}
          readMoreLink="/projects/skrattaasen"
        />
        <StandardCard
          halfWidth
          title="Gaulstad/Mokk Exploration Area"
          content={["11 liscenses", "100 km²"]}
          readMoreLink="/projects/mokk"
        />
      </div>
    </div>
  );
}
