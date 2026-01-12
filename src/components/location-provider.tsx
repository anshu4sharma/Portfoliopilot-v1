"use client";

import { useEffect, useState } from "react";

interface LocationInfo {
  country: string;
  ip: string | null;
  city: string | null;
  region: string | null;
  timezone: string | null;
}

interface LocationProviderProps {
  children: (locationInfo: LocationInfo) => React.ReactElement;
  fallbackCountry?: string;
}

export function LocationProvider({
  children,
  fallbackCountry = "US",
}: LocationProviderProps) {
  const [locationInfo, setLocationInfo] = useState<LocationInfo>({
    country: fallbackCountry,
    ip: null,
    city: null,
    region: null,
    timezone: null,
  });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const services = [
          "https://ipapi.co/json",
          "https://ipinfo.io/json",
          "https://ip.smartproxy.com/json",
        ];

        for (const service of services) {
          try {
            const response = await fetch(service, {
              headers: {
                Accept: "application/json",
                "User-Agent": "portfoliopilot.in Location Service",
              },
            });

            if (!response.ok) continue;

            const data = await response.json();
            setLocationInfo({
              country: data.country || data.country_code || fallbackCountry,
              ip: data.ip,
              city: data.city,
              region: data.region,
              timezone: data.timezone,
            });
            break;
          } catch (error) {
            console.error(`Error with service ${service}:`, error);
            continue;
          }
        }
      } catch (error) {
        console.error("Location detection failed:", error);
      }
    };

    fetchLocation();
  }, [fallbackCountry]);

  return children(locationInfo);
}
