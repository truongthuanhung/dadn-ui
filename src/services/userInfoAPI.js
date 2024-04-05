import systemAPI from './systemService';

const userPath = '/users/profile';

export const userInfoAPI = async (data) => {
    const responseLogin = await systemAPI.get(userPath, {
        params: data,
      })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });

    return responseLogin;
};