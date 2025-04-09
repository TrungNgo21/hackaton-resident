'use client';

interface FilterState {
  district: string;
  maximum_distance: number;
  wifi_payment: string;
  maximum_electricity_rate: string;
  maximum_wifi_rate: string;
}

interface PropertyFilterProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  isLoading?: boolean;
  error?: Error;
}

export default function PropertyFilter({
  filters,
  onFiltersChange,
  isLoading,
  error,
}: PropertyFilterProps) {
  return (
    <form className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div>
        <label
          htmlFor="district"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          District
        </label>
        <input
          type="text"
          id="district"
          value={filters.district}
          onChange={(e) =>
            onFiltersChange({ ...filters, district: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="maximum_distance"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Maximum Distance (km)
        </label>
        <input
          type="number"
          id="maximum_distance"
          value={filters.maximum_distance}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              maximum_distance: Number(e.target.value),
            })
          }
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          min="0"
          step="0.1"
        />
      </div>

      <div>
        <label
          htmlFor="wifi_payment"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          WiFi Payment (VND)
        </label>
        <input
          type="number"
          id="wifi_payment"
          value={filters.wifi_payment}
          onChange={(e) =>
            onFiltersChange({ ...filters, wifi_payment: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          min="0"
        />
      </div>

      <div>
        <label
          htmlFor="maximum_electricity_rate"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Maximum Electricity Rate (VND/kWh)
        </label>
        <input
          type="number"
          id="maximum_electricity_rate"
          value={filters.maximum_electricity_rate}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              maximum_electricity_rate: e.target.value,
            })
          }
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          min="0"
        />
      </div>

      <div>
        <label
          htmlFor="maximum_wifi_rate"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Maximum WiFi Rate (VND)
        </label>
        <input
          type="number"
          id="maximum_wifi_rate"
          value={filters.maximum_wifi_rate}
          onChange={(e) =>
            onFiltersChange({ ...filters, maximum_wifi_rate: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          min="0"
        />
      </div>

      {isLoading && (
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Loading...
        </div>
      )}

      {error && (
        <div className="text-center text-sm text-red-500 dark:text-red-400">
          Error: {error.message}
        </div>
      )}
    </form>
  );
}
