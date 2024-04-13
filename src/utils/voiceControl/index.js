import { postDeviceStatus } from '../../services/deviceService';
import { toast } from 'react-toastify';
export const turnOnLight = async (setStatusLight1, setStatusLight2, setStatusLight3, setStatusLight4, handleClose) => {
    try {
        handleClose();
        // Call 4 APIs simultaneously using Axios
        await Promise.all([
            postDeviceStatus('feeds/light-1/data', { value: 1 }),
            postDeviceStatus('feeds/light-2/data', { value: 1 }),
            postDeviceStatus('feeds/light-3/data', { value: 1 }),
            postDeviceStatus('feeds/light-4/data', { value: 1 }),
        ]);
        setStatusLight1('1');
        setStatusLight2('1');
        setStatusLight3('1');
        setStatusLight4('1');
        toast.success('Bật đèn thành công');
    } catch (error) {
        handleClose();
        console.error('Error fetching data:', error);
        toast.error('Error fetching data:');
    }
};
export const turnOffLight = async (setStatusLight1, setStatusLight2, setStatusLight3, setStatusLight4, handleClose) => {
    try {
        handleClose();
        // Call 4 APIs simultaneously using Axios
        await Promise.all([
            postDeviceStatus('feeds/light-1/data', { value: 0 }),
            postDeviceStatus('feeds/light-2/data', { value: 0 }),
            postDeviceStatus('feeds/light-3/data', { value: 0 }),
            postDeviceStatus('feeds/light-4/data', { value: 0 }),
        ]);
        setStatusLight1('0');
        setStatusLight2('0');
        setStatusLight3('0');
        setStatusLight4('0');
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
};
