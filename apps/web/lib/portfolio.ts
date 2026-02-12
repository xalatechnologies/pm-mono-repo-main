export const PORTFOLIO = {
  totals: {
    licenses: 19,
    coverageKm2: 189,
    mineralTypesLabel: "8+",
    activeProjects: 2,
  },
  districts: {
    skrattasByafossen: {
      key: "skrattas-byafossen",
      label: "Skrattås-Byafossen",
      licenses: 7,
      coverageKm2: 51,
      minerals: ["Zinc", "Lead", "Copper", "Iron", "Silver", "Gold", "REE"],
    },
    gaulstadMokk: {
      key: "gaulstad-mokk",
      label: "Gaulstad/Mokk",
      licenses: 11,
      coverageKm2: 128,
      minerals: ["Copper", "Zinc", "Nickel", "Iron", "Silver", "Gold", "REE"],
    },
  },
  content: {
    focusMineralsSentence:
      "Key focus on copper, zinc, lead, silver, gold, iron, nickel and cobalt. Additionally, our target is traces of REE (Rare Earth Elements).",
  },
} as const;


