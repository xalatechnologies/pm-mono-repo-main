import ImageCard from "../components/cards/ImageCard";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <ImageCard
        halfWidth
        // imagePosition="left"
        imageUrl="/mokk2.png"
        title="Our Story"
        content="Pure Minerals AS is a Norwegian exploration and mining company focused on the sustainable development of metal resources. The company was founded to explore and develop valuable mineral deposits in the Steinkjer region of Trøndelag. Exploration began in 2021 and includes extensive surveys in the Skrattåsen, Gaulstad and Mokk areas."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ImageCard
          halfWidth
          title="Strategic License Areas"
          content="We hold 11 licenses in the Gaulstad-Mokk area and 5 licenses near Skrattås - a region with mining history dating back to 1760. Together, these licenses cover approximately 250 km² with strong potential for commercial mineralization, including copper, zinc, gold, and silver."
          imageUrl="/map1.png"
          alt="Geologist in the field"
        />

        <ImageCard
          halfWidth
          title="Geology and Mineral Wealth"
          content="Our license areas are rich in valuable minerals. The Skrattås region shows exceptionally high concentrations of zinc, lead, and silver, while the Mokk region contains strong copper deposits. Both areas also feature gold and other rare metals such as cobalt and nickel."
          imageUrl="/core1.png"
          alt="Geologist in the field"
        />
        <ImageCard
          halfWidth
          title="From Prospect to Production"
          content="Since our inception, we've followed a structured development plan - from initial prospecting and license acquisition to resource confirmation and dialogue with drilling companies. The next step is test drilling and pilot production, with the long-term goal of full-scale mining operations."
          imageUrl="/production1.png"
          alt="Geologist in the field"
        />
      </div>
    </div>
  );
}
