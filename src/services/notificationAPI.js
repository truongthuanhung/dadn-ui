import systemAPI from './systemService';
const getAllPath = '/notifications/all';

export const getAllNotifications = async () => {
    const response = await systemAPI
        .get(getAllPath)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
    return response;
};

const readPath = '/notifications/markbyid';

export const readNotify = async (data) => {
    const res = await systemAPI.patch(readPath, data)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });

    return res;
};

const readAllPath = '/notifications/markall';

export const readAllNotify = async () => {
    const res = await systemAPI.patch(readAllPath)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });

    return res;
};