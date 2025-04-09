'use client';

import PropertyCard from '@/app/components/properties/property-card';
import type { getProperties } from '@/app/grid/actions/get-properties';
import type { Property } from '@/lib/db/schema';
import { Suspense, use } from 'react';

interface PropertyListProps {
  propertiesPromise?: ReturnType<typeof getProperties>;
  properties?: Property[];
}

// This component handles the async data
function AsyncPropertyList({
  propertiesPromise,
}: {
  propertiesPromise: ReturnType<typeof getProperties>;
}) {
  const properties = use(propertiesPromise);
  return <PropertyGrid properties={properties} />;
}

// This component renders the actual grid
function PropertyGrid({ properties }: { properties: Property[] }) {
  if (!properties?.length) {
    return <div>No properties available</div>;
  }

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

// The main component that handles both sync and async cases
export default function PropertyList({
  propertiesPromise,
  properties,
}: PropertyListProps) {
  // Handle the case where we have direct properties
  if (properties) {
    return <PropertyGrid properties={properties} />;
  }

  // Handle the case where we have a promise
  if (propertiesPromise) {
    return (
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-gray-500">Loading properties...</div>
          </div>
        }
      >
        <AsyncPropertyList propertiesPromise={propertiesPromise} />
      </Suspense>
    );
  }

  // Handle the case where we have neither
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="text-gray-500">No properties available</div>
    </div>
  );
}
