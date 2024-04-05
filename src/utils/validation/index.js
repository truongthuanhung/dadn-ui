import { toast } from '../toastify';
export const loginValidation = (username, password) => {
    if (username === '') {
        toast.error('Username không được để trống');
        return false;
    } else if (password === '') {
        toast.error('Mật khẩu không được để trống');
        return false;
    }
    return true;
};

export const registerValidation = (name, username, password, confirmPassword) => {
    if (name === '') {
        toast.error('Tên không được để trống');
        return false;
    } else if (username === '') {
        toast.error('Username không được để trống');
        return false;
    } else if (password === '') {
        toast.error('Vui lòng nhập mật khẩu');
        return false;
    } else if (confirmPassword === '') {
        toast.error('Vui lòng xác nhận mật khẩu');
        return false;
    } else if (password !== confirmPassword) {
        toast.error('Mật khẩu không khớp');
        return false;
    }
    return true;
};
