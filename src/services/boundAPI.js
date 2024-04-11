import systemAPI from './systemService';
const path = '/sensors/bound';

export const getBound = async (data) => {
    const response = await systemAPI
        .post(path, data)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
    return response;
};

const path1 = '/sensors/set';
export const changeBound = async (data) => {
    const res = await systemAPI
        .patch(path1, data)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });

    return res;
};
