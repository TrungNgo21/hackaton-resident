"use server";
export interface Location {
  latitude: number;
  longitude: number;
}

async function getLocationFromDistrict(district: string): Promise<Location> {
  const query = encodeURIComponent(`${district}`);
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${query}+saigon&format=json&limit=1`,
    {
      headers: {
        "User-Agent": "Resident App (your-email@example.com)", // Replace with your contact
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to geocode district");
  }

  const data = await response.json();
  if (!data || data.length === 0) {
    throw new Error("District not found");
  }

  return {
    latitude: parseFloat(data[0].lat),
    longitude: parseFloat(data[0].lon),
  };
}
