import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const extractDataAndValue = (data) => {
    const dates = data?.map((item) => item[0]);
    const values = data?.map((item) => parseFloat(item[1]));

    return { dates, values };
};
const formatDates = (dateArray) => {
    const formattedDates = dateArray?.map((dateString) => {
        const date = new Date(dateString);
        const month = date.toLocaleString('en-US', { month: 'short' });
        const day = date.getDate();
        return `${month} ${day}`;
    });
    return formattedDates;
};
function ChartItem({ dataset, tab }) {
    let title = '';
    let color = '#000000';
    let text = '';
    if (tab === 0) {
        title = 'Lighting';
        color = '#BEE979';
        text = '%';
    } else if (tab === 1) {
        title = 'Humidity';
        color = '#BFE0FF';
        text = '%';
    } else {
        title = 'Temperature';
        color = '#E7C88B';
        text = '°C';
    }

    const data = {
        labels: formatDates(extractDataAndValue(dataset[tab]).dates),
        datasets: [
            {
                label: title,
                data: extractDataAndValue(dataset[tab]).values,
                fill: false,
                backgroundColor: color,
                borderColor: color,
            },
        ],
    };
    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'THỐNG KÊ CẢM BIẾN',
            },
        },
        scales: {
            y: {
                title: { display: true, text: text, offset: true },
            },
            x: {
                title: { display: true, text: 'Date' },
            },
        },
    };
    const chartMinHeight = window.innerWidth <= 600 ? 300 : undefined;
    return <Line data={data} height={chartMinHeight} options={chartOptions} />;
}

export default ChartItem;
