// frontend/src/components/admin/AdminTable.tsx

import React from 'react';

type Props<T> = {
  columns: { key: string; label: string; render?: (item: T) => React.ReactNode }[];
  data: T[];
}
 function AdminTable<T>({ columns, data }: Props<T>) {
    return (
        <table className="min-w-full divide-y divide-gray-200"> 
            <thead className="bg-gray-50">
                <tr>
                    {columns.map((col) => (
                        <th
                            key={col.key}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            {col.label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((col) => (
                            <td
                                key={col.key}
                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                            >
                                {col.render ? col.render(item) : (item as any)[col.key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default AdminTable;
