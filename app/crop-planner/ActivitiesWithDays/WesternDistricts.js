// Western Districts (Sambalpur, Bargarh, Sonepur)
// Rice (Main Crop)
const westernRiceTemplate = {
  "activities": [
    { name: "Nursery preparation", daysFromStart: -14, icon: "land-plots", importance: "high" },
    { name: "Seed treatment", daysFromStart: -7, icon: "seed", importance: "medium" },
    { name: "Sowing in nursery", daysFromStart: 0, icon: "seed-outline", importance: "critical" },
    { name: "Land preparation", daysFromStart: 15, icon: "tractor", importance: "high" },
    { name: "Transplanting", daysFromStart: 25, icon: "sprout", importance: "critical" },
    { name: "Apply base fertilizer", daysFromStart: 26, icon: "fertilizer", importance: "high" },
    { name: "First weeding", daysFromStart: 40, icon: "grass", importance: "medium" },
    { name: "Top dressing (urea)", daysFromStart: 45, icon: "fertilizer", importance: "high" },
    { name: "Pest monitoring", daysFromStart: 55, icon: "bug", importance: "medium" },
    { name: "Second fertilizer", daysFromStart: 65, icon: "fertilizer", importance: "high" },
    { name: "Disease monitoring", daysFromStart: 75, icon: "leaf-disease", importance: "high" },
    { name: "Irrigation check", daysFromStart: 90, icon: "water", importance: "medium" },
    { name: "Harvest preparation", daysFromStart: 115, icon: "scissors", importance: "medium" },
    { name: "Harvesting", daysFromStart: 125, icon: "harvest", importance: "critical" },
    { name: "Post-harvest drying", daysFromStart: 126, icon: "sun", importance: "high" },
  ],
  "varieties": {
    "MTU 1010": { harvestDaysOffset: -10, droughtResistant: true },
    "Sahbhagi": { harvestDaysOffset: -15, droughtResistant: true },
    "Swarna Sub-1": { harvestDaysOffset: 5, floodResistant: true }
  },
  "irrigationSource": {
    "Canal": { adjustedActivities: [{ name: "Canal water release check", daysFromStart: 30 }] },
    "Bore well": { adjustedActivities: [{ name: "Groundwater level check", daysFromStart: 40 }] },
    "Rain-fed": { droughtContingency: true }
  }
};