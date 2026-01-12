"use client";

import { useEffect, useState } from "react";

const services = [
  "https://ipapi.co/json",
  "https://ipinfo.io/json",
  "https://ip.smartproxy.com/json",
];

async function getCurrentLocation(): Promise<string> {
  for (const service of services) {
    try {
      const response = await fetch(service);
      if (response.ok) {
        const data = await response.json();
        const country = data.country || data.country_code;
        if (country) {
          return country;
        }
      }
    } catch (error) {
      console.error(`Error fetching from ${service}:`, error);
    }
  }
  return "US"; // Default to 'US' if all services fail
}

export function useCountry() {
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
    getCurrentLocation().then(setCountry);
  }, []);

  return country;
}
