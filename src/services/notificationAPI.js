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
