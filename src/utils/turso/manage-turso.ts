"use server";

import { turso } from "./turso-client";
import { fetchAllLocations, fetchStoppedLocations } from "./tursoService";

type Location = string;
type LocationStatus = { name: string; status: string };

const getRandomLocation = (
  availableLocations: string[],
  usedLocations: string[]
): string | null => {
  const filteredLocations = availableLocations.filter(
    (location) => !usedLocations.includes(location)
  );
  if (filteredLocations.length === 0) {
    console.log("No available locations left to assign.");
    return null;
  }
  return filteredLocations[Math.floor(Math.random() * filteredLocations.length)];
};

// Static location data
const staticLocations = {
    "locations": {
      "ams": "Amsterdam, Netherlands",
      "arn": "Stockholm, Sweden",
      "atl": "Atlanta, Georgia (US)",
      "bog": "Bogotá, Colombia",
      "bom": "Mumbai, India",
      "bos": "Boston, Massachusetts (US)",
      "cdg": "Paris, France",
      "den": "Denver, Colorado (US)",
      "dfw": "Dallas, Texas (US)",
      "ewr": "Secaucus, NJ (US)",
      "eze": "Ezeiza, Argentina",
      "fra": "Frankfurt, Germany",
      "gdl": "Guadalajara, Mexico",
      "gig": "Rio de Janeiro, Brazil",
      "gru": "São Paulo, Brazil",
      "hkg": "Hong Kong, Hong Kong",
      "iad": "Ashburn, Virginia (US)",
      "jnb": "Johannesburg, South Africa",
      "lax": "Los Angeles, California (US)",
      "lhr": "London, United Kingdom",
      "mad": "Madrid, Spain",
      "mia": "Miami, Florida (US)",
      "nrt": "Tokyo, Japan",
      "ord": "Chicago, Illinois (US)",
      "otp": "Bucharest, Romania",
      "phx": "Phoenix, Arizona (US)",
      "qro": "Querétaro, Mexico",
      "scl": "Santiago, Chile",
      "sea": "Seattle, Washington (US)",
      "sin": "Singapore, Singapore",
      "sjc": "San Jose, California (US)",
      "syd": "Sydney, Australia",
      "waw": "Warsaw, Poland",
      "yul": "Montreal, Canada",
      "yyz": "Toronto, Canada"
    }
  };
  
  export const manageTursoLocations = async () => {
    try {
      const stoppedLocations = await fetchStoppedLocations();
      let allLiveLocations = await fetchAllLocations();
  
      // Use static location data instead of fetching
      const availableLocationsObj = staticLocations;
      console.log("Available locations object:", availableLocationsObj);
  
      const availableLocations = Object.keys(availableLocationsObj.locations);
      console.log("Available locations:", availableLocations);
  
      // Remove stopped locations
      for (const location of stoppedLocations) {
        if (allLiveLocations.some(live => live.name === location.name)) {
          try {
            await turso.groups.removeLocation("default", location.name);
            allLiveLocations = allLiveLocations.filter(live => live.name !== location.name);
            console.log(`Removed stopped location: ${location.name}`);
          } catch (error) {
            console.error(`Failed to remove location ${location.name}:`, error);
          }
        }
      }
  
      // Ensure we have at least 3 locations
      let attempts = 0;
      const maxAttempts = 20;
      while (allLiveLocations.length < 3 && attempts < maxAttempts) {
        const newLocation = getRandomLocation(
          availableLocations,
          allLiveLocations.map((loc) => loc.name)
        );
        
        if (newLocation === null) {
          console.log("No more locations available to add.");
          break;
        }
  
        try {
          await turso.groups.addLocation("default", newLocation);
          allLiveLocations.push({ name: newLocation, status: "up" });
          console.log(`Added new location: ${newLocation}`);
        } catch (error) {
          console.error(`Failed to add location ${newLocation}:`, error);
          availableLocations.splice(availableLocations.indexOf(newLocation), 1);
        }
        attempts++;
      }
  
      console.log(`Attempts made: ${attempts}`);
      console.log(`Final number of live locations: ${allLiveLocations.length}`);
  
      // Fetch the updated group info
      const updatedGroup = await turso.groups.get("default");
  
      return {
        ...updatedGroup,
        status: {
          locations: allLiveLocations
        }
      };
    } catch (error) {
      console.error("Error managing Turso locations:", error);
      throw error; // Re-throw the original error for better debugging
    }
  };