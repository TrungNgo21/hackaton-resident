'use server';

import { db } from '@/lib/db/queries';
import { properties } from '@/lib/db/schema';
import { getLocationFromDistrict } from '@/utils/get-district-coordinates';
import { and, eq, lte } from 'drizzle-orm';

interface GetPropertiesOptions {
  district?: string;
  maximum_distance?: number;
  wifi_payment?: number;
  maximum_electricity_rate?: number;
  maximum_wifi_rate?: number;
}

export async function getProperties(options?: GetPropertiesOptions) {
  console.log('options', options);
  try {
    if (!options) {
      // Return all properties if no filters are provided
      return await db.select().from(properties);
    }

    const {
      district,
      maximum_distance = 3,
      wifi_payment,
      maximum_electricity_rate,
      maximum_wifi_rate,
    } = options;

    // Build conditions array
    const conditions = [];

    if (wifi_payment !== undefined) {
      conditions.push(eq(properties.wifi, wifi_payment));
    }

    if (maximum_electricity_rate !== undefined) {
      conditions.push(lte(properties.electricity, maximum_electricity_rate));
    }

    if (maximum_wifi_rate !== undefined) {
      conditions.push(lte(properties.wifi, maximum_wifi_rate));
    }

    // Execute the query with all conditions
    const filteredProperties = await db
      .select()
      .from(properties)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    // If distance filter is provided, we need to calculate distances
    if (maximum_distance !== undefined && district) {
      // Get the target location coordinates
      const targetLocation = await getLocationFromDistrict(district);
      console.log('targetLocation', targetLocation);

      if (targetLocation) {
        // Calculate distances and filter
        const propertiesWithDistance = filteredProperties.map((property) => {
          if (!property.lattitude || !property.longitude)
            return { ...property, distance: Number.POSITIVE_INFINITY };

          const distance = calculateDistance(
            targetLocation.latitude,
            targetLocation.longitude,
            property.lattitude,
            property.longitude
          );

          return { ...property, distance };
        });

        // Filter by distance and sort
        return propertiesWithDistance
          .filter((property) => property.distance <= maximum_distance)
          .sort((a, b) => a.distance - b.distance);
      }
    }

    return filteredProperties;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

// Helper function to calculate distance using Haversine formula
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}
