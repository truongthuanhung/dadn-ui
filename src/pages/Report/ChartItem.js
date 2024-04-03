import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function ChartItem() {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'First dataset',
                data: [33, 53, 85, 41, 44, 65],
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
            },
            {
                label: 'Second dataset',
                data: [33, 25, 35, 51, 54, 76],
                fill: false,
                borderColor: '#742774',
            },
        ],
    };
    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    fontSize: 14, // Adjust the font size here
                },
            },
        },
        plugins: {
            title: {
                display: true,
                text: 'TỔNG LƯỢNG GIẤY ĐÃ IN',
                color: '#1488db',
                font: {
                    size: 18,
                },
            },
        },
    };
    const chartMinHeight = window.innerWidth <= 600 ? 300 : undefined;
    return <Line data={data} height={chartMinHeight} options={chartOptions} />;
}

export default ChartItem;
