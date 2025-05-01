// Southern Districts (Ganjam, Gajapati)
// Cashew and Rice
const southernCropsTemplate = {
  "cashew": {
    "activities": [
      { name: "Land preparation", daysFromStart: -30, icon: "land", importance: "high" },
      { name: "Planting", daysFromStart: 0, icon: "tree", importance: "critical" },
      { name: "Irrigation", daysFromStart: 1, icon: "water", importance: "high" },
      { name: "Basin weeding", daysFromStart: 30, icon: "grass", importance: "medium" },
      { name: "Apply fertilizer", daysFromStart: 60, icon: "fertilizer", importance: "high" },
      { name: "Second weeding", daysFromStart: 90, icon: "grass", importance: "medium" },
      { name: "Pest monitoring", daysFromStart: 120, icon: "bug", importance: "high" },
      { name: "Irrigation in summer", daysFromStart: 150, icon: "water", importance: "high" },
      { name: "Pruning", daysFromStart: 180, icon: "scissors", importance: "medium" },
      // Long-term crop with yearly seasonal activities
    ],
    "maintenance": {
      "yearly": [
        { name: "Flowering monitoring", month: 1, icon: "flower" }, // January
        { name: "Cashew apple formation", month: 2, icon: "fruit" }, // February
        { name: "Harvest preparation", month: 3, icon: "basket" }, // March
        { name: "Harvesting", month: 4, icon: "harvest" }, // April
        { name: "Processing", month: 5, icon: "factory" }, // May
        { name: "Pruning", month: 7, icon: "scissors" }, // July
        { name: "Fertilizer application", month: 8, icon: "fertilizer" } // August
      ]
    }
  },
  "riceCoastal": {
    // Similar to coastal rice but with adjustments for southern climate
    "activities": [
      { name: "Nursery preparation", daysFromStart: -14, icon: "land-plots", importance: "high" },
      { name: "Seed treatment", daysFromStart: -7, icon: "seed", importance: "medium" },
      { name: "Sowing in nursery", daysFromStart: 0, icon: "seed-outline", importance: "critical" },
      { name: "Land preparation", daysFromStart: 15, icon: "tractor", importance: "high" },
      { name: "Transplanting", daysFromStart: 21, icon: "sprout", importance: "critical" },
      { name: "Apply base fertilizer", daysFromStart: 22, icon: "fertilizer", importance: "high" },
      { name: "First weeding", daysFromStart: 35, icon: "grass", importance: "medium" },
      { name: "Cyclone alert watch", daysFromStart: 40, icon: "storm", importance: "high" },
      { name: "Top dressing", daysFromStart: 45, icon: "fertilizer", importance: "high" },
      { name: "Harvesting", daysFromStart: 115, icon: "harvest", importance: "critical" },
    ],
    "salinityManagement": true,
    "cyclonePreparation": true
  }
};