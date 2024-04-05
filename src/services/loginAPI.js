import systemAPI from './systemService';
const loginPath = '/users/login';
const registerPath = '/users/signup'
export const loginAPI = async (data) => {
    const responseLogin = await systemAPI.post(loginPath, data)
        .then((response) => {
            //localStorage.setItem('accessToken', response?.data?.data?.accessToken);
            return response;
        })
        .catch((error) => {
            // console.log("Fail Login", error);
            return error;
        });

    return responseLogin;
};

export const registerAPI = async (data) => {
    const responseLogin = await systemAPI.post(registerPath, data)
        .then((response) => {
            //localStorage.setItem('accessToken', response?.data?.data?.accessToken);
            return response;
        })
        .catch((error) => {
            // console.log("Fail Login", error);
            return error;
        });

    return responseLogin;
};

