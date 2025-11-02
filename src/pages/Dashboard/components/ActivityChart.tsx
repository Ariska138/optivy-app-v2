import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

// Mock data for the chart
const weeklyRawData = [65, 59, 80, 81, 56, 55, 40];
const weeklyLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const monthlyRawData = [45, 62, 75, 58];
const monthlyLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

export const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            backgroundColor: 'rgba(31, 41, 55, 0.8)',
            titleFont: { weight: 'bold' },
            bodyFont: { size: 14 },
            displayColors: false,
            callbacks: {
                title: () => '', // Hide title
                label: (context) => `Activity: ${context.parsed.y}`,
            },
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
            ticks: {
                color: '#6b7280', // text-gray-500
            }
        },
        y: {
            display: false, // Hide Y axis labels and line
            beginAtZero: true,
            grid: {
                display: false,
            },
        },
    },
    elements: {
        line: {
            tension: 0.4, // For smooth curves
        },
        point: {
            radius: 0,
            hoverRadius: 6,
            hoverBackgroundColor: '#8b5cf6', // violet-500
            hoverBorderColor: 'white',
            hoverBorderWidth: 2,
        },
    },
    interaction: {
        intersect: false,
        mode: 'index',
    },
};

const createChartData = (labels: string[], data: number[]): ChartData<'line'> => ({
    labels,
    datasets: [
        {
            label: 'Activity',
            data: data,
            fill: true,
            borderColor: '#8b5cf6', // violet-500
            backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                if (!ctx) return 'rgba(167, 139, 250, 0)';
                const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                gradient.addColorStop(0, 'rgba(167, 139, 250, 0.4)'); // violet-400 with opacity
                gradient.addColorStop(1, 'rgba(167, 139, 250, 0)');
                return gradient;
            },
            pointRadius: 0,
        },
    ],
});


export const ActivityChart: React.FC = () => {
    const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('weekly');

    const chartData = timeframe === 'weekly' 
        ? createChartData(weeklyLabels, weeklyRawData)
        : createChartData(monthlyLabels, monthlyRawData);

    return (
        <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Activity</h3>
                <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value as 'weekly' | 'monthly')}
                    className="border border-gray-200 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                    aria-label="Select time frame for activity chart"
                >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </div>
            <div className="h-48 relative">
                <Line options={chartOptions} data={chartData} />
            </div>
        </div>
    );
};