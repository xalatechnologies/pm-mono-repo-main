// app/page.tsx
import Slogan from "./components/Slogan";
import StandardCard from "./components/cards/StandardCard";
import ImageCard from "./components/cards/ImageCard";

export default async function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Slogan />
      <div className="max-w-4xl mx-auto p-4">
        <ImageCard
          title="Early-Stage Exploration in Trøndelag: From Mine Surveys to Drilling Strategy"
          content="Early exploration in Gaulstad and Mokk laid the foundation - now Skrattåsen is at the center of our next
  steps."
          // imageUrl="/Norway_Counties_Trøndelag_Position.svg"
          imageUrl="/trondelag_puls1.svg"
          imagePosition="left"
          alt="Trøndelag County in Norway"
          readMoreLink="/projects"
          scale={60}
        />

        <StandardCard
          title="Skrattåsen - A Key Locality in Central Norwegian Geology"
          content="Detailed fieldwork in 2024 has revealed complex tectonic structures, rich mineralization, and a unique window into the Møre-Trøndelag Fault Zone."
          readMoreLink="/projects/skrattaasen"
          halfWidth
        />
        <StandardCard
          title="Gaulstad/Mokk - A Historic Mining District with New Potential"
          content="Covering 100 km² and 11 licenses, the Gaulstad/Mokk area hosts confirmed base and precious metal mineralization, including copper, zinc, silver, and gold. Ongoing work aims to define economically viable resources through systematic drilling and analysis."
          readMoreLink="/projects/mokk"
          halfWidth
        />
      </div>
    </main>
  );
}
