'use client';

import PropertyFilter from '@/app/components/properties/property-filter';
import PropertyList from '@/app/components/properties/property-list';
import { getProperties } from '@/app/grid/actions/get-properties';
import { useCallback, useState } from 'react';
import useSWR from 'swr';

const fetcher = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Failed to fetch properties');
  }
  return response.json();
};

export default function Home() {
  const [filters, setFilters] = useState({
    district: '',
    maximum_distance: 3,
    wifi_payment: '',
    maximum_electricity_rate: '',
    maximum_wifi_rate: '',
  });

  const handleFiltersChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters);
  }, []);

  const shouldFetch = Boolean(
    filters.district ||
      filters.wifi_payment ||
      filters.maximum_electricity_rate ||
      filters.maximum_wifi_rate
  );

  const {
    data: filteredProperties,
    error,
    isLoading,
  } = useSWR(
    shouldFetch
      ? [
          '/api/properties/filter',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              district: filters.district,
              maximum_distance: filters.maximum_distance,
              wifi_payment: Number(filters.wifi_payment) || undefined,
              maximum_electricity_rate:
                Number(filters.maximum_electricity_rate) || undefined,
              maximum_wifi_rate: Number(filters.maximum_wifi_rate) || undefined,
            }),
          },
        ]
      : null,
    ([url, options]) => fetcher(url, options),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 1000,
      keepPreviousData: true,
    }
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <PropertyFilter
            filters={filters}
            onFiltersChange={handleFiltersChange}
            isLoading={isLoading}
            error={error}
          />
        </div>
        <div className="md:col-span-3">
          {shouldFetch ? (
            <PropertyList properties={filteredProperties || []} />
          ) : (
            <PropertyList propertiesPromise={getProperties()} />
          )}
        </div>
      </div>
    </div>
  );
}
