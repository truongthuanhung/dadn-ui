import systemAPI from './systemService';

const path = '/users/changepassword';

export const changePasswordAPI = async (data) => {
    const res = await systemAPI
        .put(path, data)
        .then((response) => {
            //localStorage.setItem('accessToken', response?.data?.data?.accessToken);
            return response;
        })
        .catch((error) => {
            // console.log("Fail Login", error);
            return error;
        });

    return res;
};
