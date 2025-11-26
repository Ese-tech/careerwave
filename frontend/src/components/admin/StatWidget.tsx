// frontend/src/components/admin/StatWidget.tsx

import React from 'react';

function StatWidget ({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-700">{title}</h2>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

export { StatWidget };