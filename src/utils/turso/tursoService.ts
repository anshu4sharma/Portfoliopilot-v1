"use server";

interface LocationStatus {
  name: string;
  status: "up" | "stopped" | "down";
}

interface GroupStatus {
  locations: LocationStatus[];
}

interface Group {
  archived: boolean;
  locations: string[];
  name: string;
  primary: string;
  status: GroupStatus;
  uuid: string;
  version: string;
}

interface TursoAPIResponse {
  group: Group;
}

const TURSO_TOKEN = process.env.TURSO_TOKEN;
const TURSO_ORG = process.env.TURSO_ORG;

const TURSO_API_URL = `https://api.turso.io/v1/organizations/${TURSO_ORG}/groups/default`;
const AUTH_TOKEN = TURSO_TOKEN; // Replace this with your actual JWT token

// Define the function with proper type-safety
export const fetchStoppedLocations = async (): Promise<LocationStatus[]> => {
  try {
    const response = await fetch(TURSO_API_URL, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: TursoAPIResponse = await response.json();

    // Example: Check if any location is stopped
    const locations = data.group.status.locations;

    const stoppedLocations = locations.filter(
      (location) => location.status === "stopped" || location.status === "down",
    );

    // Always return stopped locations only
    return stoppedLocations;
  } catch (error) {
    console.error("Error fetching data from Turso API:", error);
    throw error;
  }
};

// create a func to get   all locations

export const fetchAllLocations = async (): Promise<LocationStatus[]> => {
  const response = await fetch(TURSO_API_URL, {
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });
  const data: TursoAPIResponse = await response.json();
  return data.group.status.locations;
};
