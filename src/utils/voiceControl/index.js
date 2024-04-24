import { postDeviceStatus } from '../../services/deviceService';
import { toast } from 'react-toastify';
export const turnOnLight = async (setStatusLight1, setStatusLight2, handleClose) => {
    try {
        handleClose();
        await Promise.all([
            postDeviceStatus('feeds/light-1/data', { value: 1 }),
            postDeviceStatus('feeds/light-2/data', { value: 1 }),
        ]);
        setStatusLight1('1');
        setStatusLight2('1');
        toast.success('Bật đèn thành công');
    } catch (error) {
        handleClose();
        console.error('Error fetching data:', error);
        toast.error('Error fetching data:');
    }
};

export const setStatusLightID = async (id, setStatus, handleClose, value) => {
    try {
        await postDeviceStatus(`feeds/light-${id}/data`, { value: value });
        setStatus(value);
        toast.success(`${value === '1' ? 'Bật' : 'Tắt'} đèn thành công`);
        handleClose();
    } catch (error) {
        handleClose();
        console.error('Error fetching data:', error);
        toast.error('Error fetching data:');
    }
};
export const turnOffLight = async (setStatusLight1, setStatusLight2, handleClose) => {
    try {
        handleClose();
        await Promise.all([
            postDeviceStatus('feeds/light-1/data', { value: 0 }),
            postDeviceStatus('feeds/light-2/data', { value: 0 }),
        ]);
        setStatusLight1('0');
        setStatusLight2('0');
        toast.success('Tắt đèn thành công');
    } catch (error) {
        handleClose();
        console.error('Error fetching data:', error);
        toast.error('Error fetching data:');
    }
};

export const fanControl = async (fanSpeed, setFanSpeed, handleClose) => {
    handleClose();
    setFanSpeed(fanSpeed);
    try {
        const callAPI = async () => {
            await postDeviceStatus('feeds/fan/data', { value: Number(fanSpeed) });
            toast.success('Thay đổi tốc độ quạt thành công');
        };
        callAPI();
    } catch (err) {
        console.log(err);
        toast.error('Thay đổi tốc độ quạt thất bại');
    }
};

export const doorControl = async (value, setStatus, handleClose) => {
    try {
        await postDeviceStatus(`feeds/door/data`, { value: value });
        setStatus(value);
        toast.success(`${value === '1' ? 'Mở' : 'Đóng'} cửa thành công`);
        handleClose();
    } catch (error) {
        handleClose();
        console.error('Error fetching data:', error);
        toast.error('Error fetching data:');
    }
};
