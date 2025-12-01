// frontend/src/components/admin/AdminTable.tsx

import React from 'react';

// Props-Typdefinition für die generische Tabelle
type Props<T> = {
  // Spalten-Definition: key für Datenzugriff, label für Überschrift, render für benutzerdefinierte Zellen
  columns: { key: string; label: string; render?: (item: T) => React.ReactNode }[];
  data: T[];
  // Optionale Paginierungs-Metadaten
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
};

/**
 * Generische Tabelle zur Anzeige von Verwaltungsdaten im Admin-Panel.
 * @param columns Array von Spaltendefinitionen.
 * @param data Array der anzuzeigenden Datenobjekte.
 */
function AdminTable<T>({ columns, data, pagination }: Props<T>) {
    
    // Keine Daten anzeigen, falls das Array leer ist
    if (data.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                Keine Daten gefunden.
            </div>
        );
    }

    const { currentPage, totalPages, onPageChange } = pagination || {};
    const showPagination = pagination && typeof totalPages === 'number' && totalPages > 1;

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"> 
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {data.map((item, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            {columns.map((col) => (
                                <td
                                    key={col.key}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200"
                                >
                                    {/* Rendert den benutzerdefinierten Inhalt oder den direkten Wert */}
                                    {col.render ? col.render(item) : (item as any)[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Paginierung */}
            {showPagination && (
                <div className="px-6 py-3 bg-white dark:bg-gray-800 flex justify-between items-center border-t border-gray-200 dark:border-gray-700 rounded-b-lg">
                    <button
                        onClick={() => onPageChange && currentPage && onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-sm font-medium rounded-lg disabled:opacity-50 text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        Vorherige
                    </button>
                    <span className="text-sm text-gray-700 dark:text-gray-400">
                        Seite {currentPage} von {totalPages}
                    </span>
                    <button
                        onClick={() => onPageChange && currentPage && onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-sm font-medium rounded-lg disabled:opacity-50 text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        Nächste
                    </button>
                </div>
            )}
        </div>
    );
}

export default AdminTable;
