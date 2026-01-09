// careerwave/frontend/src/components/admin/AnalyticsChart.tsx

import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import type { ChartOptions } from "chart.js";
import { useTheme } from '../../context/ThemeContext';

// Registrierung der benötigten Chart.js-Module
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface AnalyticsChartProps {
  data: { labels: string[]; values: number[] };
  title: string;
  label: string;
}

/**
 * Eine wiederverwendbare Komponente zur Anzeige von Liniendiagrammen für Analysedaten.
 */
const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data, title, label }) => {
  const { actualTheme } = useTheme();
  const isDark = actualTheme === 'dark';
  
  // Dynamische Farben basierend auf dem Theme
  const chartColor = isDark ? 'rgba(78, 118, 255, 1)' : 'rgba(59, 130, 246, 1)';
  const fontColor = isDark ? '#f3f4f6' : '#1f2937';
  const gridColor = isDark ? 'rgba(107, 114, 128, 0.3)' : 'rgba(229, 231, 235, 1)';

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: label,
        data: data.values,
        borderColor: chartColor,
        backgroundColor: chartColor.replace('1)', '0.1)'), // Leichte Füllung
        fill: true,
        tension: 0.4,
        pointBackgroundColor: chartColor,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: chartColor,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,   
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: fontColor },
      },
      title: {
        display: true,
        text: title,
        color: fontColor,
        font: { size: 16, weight: 'bold' as 'bold' },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)',
        titleColor: fontColor,
        bodyColor: fontColor,
        borderColor: gridColor,
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        ticks: { color: fontColor },
        grid: { color: gridColor },
      },
      y: {
        ticks: { color: fontColor },
        grid: { color: gridColor },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={`p-6 rounded-xl shadow-lg transition-all duration-300 ${isDark ? 'bg-gray-800' : 'bg-white'}`} style={{ height: '400px' }}>
        <Line data={chartData} options={options} />
    </div>
  );
};

export default AnalyticsChart;