import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import { chartOptions } from './ChartConfig';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';

// Registering the required chart components
Chart.register(CandlestickController, CandlestickElement);

const ChartComponent = ({ priceData, selectedSymbol }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const currentChartRef = chartRef.current;

        if (currentChartRef && priceData.length > 0) {
            const ctx = currentChartRef.getContext('2d');

            // Creating a new chart instance
            const chartInstance = new Chart(ctx, {
                type: 'candlestick',
                data: {
                    datasets: [
                        {
                            label: `${selectedSymbol.toUpperCase()} Chart`,
                            data: priceData,
                            borderColor: '#4CAF50',
                            color: {
                                up: '#4CAF50',
                                down: '#F44336',
                                unchanged: '#999',
                            },
                            barThickness: 'flex', // Adjusting this value to change candlestick width
                            maxBarThickness: 15,
                            barPercentage: 0.5,
                        },
                    ],
                },
                options: {
                    ...chartOptions,
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            enabled: true,
                            backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark background for tooltips
                            titleColor: '#FFFFFF', // White title color for tooltips
                            bodyColor: '#FFFFFF', // White body color for tooltips
                            borderColor: '#4CAF50', // Border color for tooltips
                            borderWidth: 1,
                        },
                    },
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'minute',
                                displayFormats: {
                                    minute: 'MMM dd, HH:mm',
                                    hour: 'MMM dd, HH:mm',
                                },
                                tooltipFormat: 'MMM dd, yyyy HH:mm',
                            },
                            grid: {
                                color: '#E3E3E3', // Lighter grid color
                                lineWidth: 1,
                            },
                            ticks: {
                                color: '#000000', // Black tick labels
                                autoSkip: true,
                                maxTicksLimit: 12, // Limit number of ticks shown
                            },
                        },
                        y: {
                            grid: {
                                color: '#E3E3E3', // Lighter grid color
                                lineWidth: 1,
                            },
                            ticks: {
                                color: '#000000', // Black tick labels
                            },
                        },
                    },
                    layout: {
                        padding: {
                            top: 20,
                            bottom: 20,
                            left: 20,
                            right: 20,
                        },
                    },
                },
            });

            return () => {
                chartInstance.destroy(); // Cleanup chart instance on unmount
            };
        }
    }, [priceData, selectedSymbol]);

    return (
        <div className="h-3/4 w-full bg-white p-4 rounded-lg shadow-lg"> {/* White background for chart container */}
            <canvas ref={chartRef} className="w-full h-80"></canvas> {/* Set height here */}
        </div>
    );
};

export default ChartComponent;