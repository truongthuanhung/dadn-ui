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

export const changePassword = (password, newPassword, confirmPassword) => {
    if (password === '') {
        toast.error('Vui lòng nhập mật khẩu');
        return false;
    } else if (newPassword === '') {
        toast.error('Vui lòng nhập mật khẩu mới');
        return false;
    } else if (confirmPassword === '') {
        toast.error('Vui lòng xác nhận mật khẩu mới');
        return false;
    } else if (newPassword !== confirmPassword) {
        toast.error('Mật khẩu mới không khớp');
        return false;
    } else if (newPassword === password) {
        toast.error('Mật khẩu mới trùng mật khẩu cũ');
        return false;
    }
    return true;
};

export const sensorValidation = (low, high) => {
    if (low < 0 || high < 0 || low > 100 || high > 100) {
        toast.error('Vui lòng nhập giá trị từ 0 đến 100');
        return false;
    }
    else if (low >= high) {
        toast.error('Vui lòng nhập ngưỡng trên cao hơn ngưỡng dưới');
        return false;
    }
    return true;
}