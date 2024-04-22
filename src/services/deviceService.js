import axios from 'axios';

const deviceAPI = axios.create({
    baseURL: 'https://io.adafruit.com/api/v2/hungtruongthuan/',
    headers: {
        'Content-Type': 'application/json',
        'X-AIO-Key': 'aio_pSAg87LfzOUHZm9Iek4xzxAxOLTw',
    },
});

export const getDeviceStatus = async (path) => {
    const response = await deviceAPI
        .get(path)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
    return response;
};

export const postDeviceStatus = async (path, data) => {
    const response = await deviceAPI
        .post(path, data)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
    return response;
};

export const getChartData = async (path, params) => {
    const response = await deviceAPI
        .get(path, { params: params })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
    return response;
};
