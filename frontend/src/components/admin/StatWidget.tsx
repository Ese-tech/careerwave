// frontend/src/components/admin/StatWidget.tsx

import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface StatWidgetProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    colorClass: string; // z.B. 'text-green-500'
}

/**
 * Eine Komponente zur Anzeige einer einzelnen, hervorgehobenen Statistikmetrik.
 * @param title Der Titel der Statistik (z.B. 'Total Users').
 * @param value Der numerische oder String-Wert.
 * @param icon Ein SVG- oder Icon-Element.
 * @param colorClass Tailwind-Klasse für die Akzentfarbe.
 */
function StatWidget ({ title, value, icon, colorClass }: StatWidgetProps) {
    const { actualTheme } = useTheme();
    const isDark = actualTheme === 'dark';

    return (
        <div className={`flex items-center p-6 rounded-xl shadow-lg transition-all duration-300 ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:shadow-xl'}`}>
            
            {/* Icon Bereich */}
            <div className={`shrink-0 p-3 rounded-full ${colorClass} ${isDark ? 'bg-opacity-20' : 'bg-opacity-10'}`}>
                {icon}
            </div>

            {/* Inhalt Bereich */}
            <div className="ml-5">
                <h2 className={`text-sm font-medium uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{title}</h2>
                <p className={`mt-1 text-4xl font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</p>
            </div>
        </div>
    );
}

export { StatWidget };