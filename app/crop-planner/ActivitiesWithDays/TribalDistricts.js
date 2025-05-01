// Tribal Districts (Koraput, Malkangiri, Rayagada)
// Millets and Rice
const tribalCropsTemplate = {
  "ragi": {
    "activities": [
      { name: "Land preparation", daysFromStart: -10, icon: "land", importance: "high" },
      { name: "Sowing", daysFromStart: 0, icon: "seed", importance: "critical" },
      { name: "Thinning", daysFromStart: 20, icon: "scissors", importance: "medium" },
      { name: "First weeding", daysFromStart: 25, icon: "grass", importance: "high" },
      { name: "Apply organic manure", daysFromStart: 30, icon: "compost", importance: "medium" },
      { name: "Second weeding", daysFromStart: 50, icon: "grass", importance: "medium" },
      { name: "Bird scaring preparation", daysFromStart: 70, icon: "bird", importance: "medium" },
      { name: "Ear head formation check", daysFromStart: 75, icon: "plant-growth", importance: "medium" },
      { name: "Harvesting", daysFromStart: 95, icon: "harvest", importance: "critical" },
      { name: "Threshing", daysFromStart: 100, icon: "thresher", importance: "high" },
      { name: "Storage preparation", daysFromStart: 102, icon: "storage", importance: "medium" },
    ],
    "varieties": {
      "GPU-28": { harvestDaysOffset: -5 },
      "Bhairavi": { harvestDaysOffset: 5 }
    }
  },
  "uplandRice": {
    "activities": [
      { name: "Land preparation", daysFromStart: -7, icon: "land", importance: "high" },
      { name: "Sowing", daysFromStart: 0, icon: "seed", importance: "critical" },
      { name: "First weeding", daysFromStart: 25, icon: "grass", importance: "high" },
      { name: "Apply manure", daysFromStart: 30, icon: "compost", importance: "medium" },
      { name: "Second weeding", daysFromStart: 50, icon: "grass", importance: "medium" },
      { name: "Pest monitoring", daysFromStart: 60, icon: "bug", importance: "medium" },
      { name: "Harvesting", daysFromStart: 110, icon: "harvest", importance: "critical" },
      { name: "Drying", daysFromStart: 111, icon: "sun", importance: "high" },
    ],
    "sloping": {
      "activities": [
        { name: "Bund maintenance", daysFromStart: -10, icon: "wall", importance: "high" },
        { name: "Erosion check", daysFromStart: 30, icon: "landslide", importance: "medium" }
      ]
    }
  }
};