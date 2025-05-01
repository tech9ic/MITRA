// Coastal Districts (Puri, Cuttack, Khordha, Balasore)
//Rice (Main Crop)
const coastalRiceTemplate = {
  "activities": [
    { name: "Nursery preparation", daysFromStart: -14, icon: "land-plots", importance: "high" },
    { name: "Seed treatment", daysFromStart: -7, icon: "seed", importance: "medium" },
    { name: "Sowing in nursery", daysFromStart: 0, icon: "seed-outline", importance: "critical" },
    { name: "Land preparation", daysFromStart: 15, icon: "tractor", importance: "high" },
    { name: "Transplanting", daysFromStart: 21, icon: "sprout", importance: "critical" },
    { name: "Apply base fertilizer", daysFromStart: 22, icon: "fertilizer", importance: "high" },
    { name: "First weeding", daysFromStart: 35, icon: "grass", importance: "medium" },
    { name: "Top dressing (urea)", daysFromStart: 42, icon: "fertilizer", importance: "high" },
    { name: "Pest monitoring", daysFromStart: 50, icon: "bug", importance: "medium" },
    { name: "Second weeding", daysFromStart: 60, icon: "grass", importance: "medium" },
    { name: "Disease monitoring", daysFromStart: 70, icon: "leaf-disease", importance: "high" },
    { name: "Irrigation check", daysFromStart: 80, icon: "water", importance: "medium" },
    { name: "Harvest preparation", daysFromStart: 110, icon: "scissors", importance: "medium" },
    { name: "Harvesting", daysFromStart: 120, icon: "harvest", importance: "critical" },
    { name: "Post-harvest drying", daysFromStart: 121, icon: "sun", importance: "high" },
  ],
  "varieties": {
    "Pooja": { harvestDaysOffset: 15, floodResistant: true },
    "Swarna": { harvestDaysOffset: 5, specialActivities: [{ name: "Extra fertilizer", daysFromStart: 55 }] },
    "Lalat": { harvestDaysOffset: -15, shortDuration: true },
  },
  "seasons": {
    "Kharif": { sowingMonth: 6, // June
               monitorCyclones: true,
               extraDrainage: true },
    "Rabi": { sowingMonth: 11, // November
             irrigationFrequency: "high",
             reducedPesticide: true }
  }
};