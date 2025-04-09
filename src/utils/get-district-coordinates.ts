'use server';
export interface Location {
  latitude: number;
  longitude: number;
}

export async function getLocationFromDistrict(
  district: string
): Promise<Location> {
  const query = encodeURIComponent(`${district}`);
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${query}+saigon&format=json&limit=1`,
    {
      headers: {
        'User-Agent': 'Resident App (your-email@example.com)', // Replace with your contact
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to geocode district');
  }

  const data = await response.json();
  console.log('data');
  if (!data || data.length === 0) {
    throw new Error('District not found');
  }

  return {
    latitude: Number.parseFloat(data[0].lat),
    longitude: Number.parseFloat(data[0].lon),
  };
}
