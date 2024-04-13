import systemAPI from './systemService';
import { toast } from 'react-toastify';
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
    if (data.low < 0 || data.low > 100 || data.high < 0 || data.high > 100) {
        toast.error('Giá trị phải từ 0 đến 100');
        return;
    } else if (data.low >= data.high) {
        toast.error('Ngưỡng trên phải cao hơn ngưỡng dưới');
        return;
    }
    const res = await systemAPI
        .patch(path1, data)
        .then((response) => {
            toast.success('Thay đổi thành công');
            return response;
        })
        .catch((error) => {
            toast.error('Thay đổi thất bại');
            return error;
        });

    return res;
};
