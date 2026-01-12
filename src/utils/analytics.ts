interface GeolocationData {
    country: string;
    city: string;
  }

  interface GeolocationAPIResponse {
    ip: string;
    network: string;
    version: string;
    city: string;
    region: string;
    region_code: string;
    country: string;
    country_name: string;
    country_code: string;
    country_code_iso3: string;
    country_capital: string;
    country_tld: string;
    continent_code: string;
    in_eu: boolean;
    postal: string;
    latitude: number;
    longitude: number;
    timezone: string;
    utc_offset: string;
    country_calling_code: string;
    currency: string;
    currency_name: string;
    languages: string;
    country_area: number;
    country_population: number;
    asn: string;
    org: string;
  }

  // get geolocation data from this api - https://ipapi.co/json/ on if geo data is not available

  export async function getGeolocation(ip: string): Promise<GeolocationData> {

    const response: GeolocationAPIResponse = await fetch(`https://ipapi.co/json`).then(res => res.json());
    // You can integrate with a geolocation service here
    // For now, returning dummy data
    return {
      country: response.country,
      city: response.city
    };
  }