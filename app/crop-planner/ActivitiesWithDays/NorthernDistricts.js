// Northern Districts (Mayurbhanj, Keonjhar)
// Mixed Cropping
const northernCropsTemplate = {
  "maize": {
    "activities": [
      { name: "Land preparation", daysFromStart: -10, icon: "land", importance: "high" },
      { name: "Seed treatment", daysFromStart: -2, icon: "seed", importance: "medium" },
      { name: "Sowing", daysFromStart: 0, icon: "seed-outline", importance: "critical" },
      { name: "Thinning", daysFromStart: 15, icon: "scissors", importance: "medium" },
      { name: "First weeding", daysFromStart: 20, icon: "grass", importance: "high" },
      { name: "Apply fertilizer", daysFromStart: 30, icon: "fertilizer", importance: "high" },
      { name: "Second weeding", daysFromStart: 40, icon: "grass", importance: "medium" },
      { name: "Earthing up", daysFromStart: 45, icon: "soil", importance: "medium" },
      { name: "Top dressing", daysFromStart: 50, icon: "fertilizer", importance: "medium" },
      { name: "Pest monitoring", daysFromStart: 55, icon: "bug", importance: "medium" },
      { name: "Harvesting", daysFromStart: 90, icon: "harvest", importance: "critical" },
      { name: "Drying", daysFromStart: 91, icon: "sun", importance: "high" },
    ],
    "varieties": {
      "DHM-117": { harvestDaysOffset: -5 },
      "Shakti": { harvestDaysOffset: 0 }
    }
  },
  "vegetables": {
    "activities": [
      { name: "Land preparation", daysFromStart: -7, icon: "land", importance: "high" },
      { name: "Sowing/Planting", daysFromStart: 0, icon: "seed", importance: "critical" },
      { name: "First irrigation", daysFromStart: 1, icon: "water", importance: "high" },
      { name: "First weeding", daysFromStart: 15, icon: "grass", importance: "medium" },
      { name: "Apply manure", daysFromStart: 20, icon: "compost", importance: "high" },
      { name: "Staking (if needed)", daysFromStart: 30, icon: "stake", importance: "medium" },
      { name: "Pest monitoring", daysFromStart: 35, icon: "bug", importance: "high" },
      { name: "Disease monitoring", daysFromStart: 40, icon: "leaf-disease", importance: "high" },
      { name: "Harvesting", daysFromStart: 70, icon: "harvest", importance: "critical" },
    ],
    "cropTypes": {
      "Brinjal": { harvestDaysOffset: 20, continuousHarvest: true },
      "Okra": { harvestDaysOffset: -20, continuousHarvest: true },
      "Tomato": { harvestDaysOffset: 10, staking: true, pruning: true }
    }
  }
};