'use client';

import { useState } from 'react';
import { importDataFromCSV } from '@/app/grid/actions/import-data';

export default function ImportDataButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });

  const handleImport = async () => {
    setIsLoading(true);
    setStatus({ type: null, message: '' });
    
    try {
      await importDataFromCSV();
      setStatus({
        type: 'success',
        message: 'Data imported successfully!',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to import data',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleImport}
        disabled={isLoading}
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Importing...' : 'Import Data from CSV'}
      </button>
      
      {status.type && (
        <div
          className={`p-3 rounded-md ${
            status.type === 'success'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
          }`}
        >
          {status.message}
        </div>
      )}
    </div>
  );
} 