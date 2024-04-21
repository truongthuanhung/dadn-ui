import React, { useEffect } from 'react';
import { BingMicIcon, CloseIcon } from '../../Icons/Icons';
import { toast } from 'react-toastify';
import { useDebounce } from '../../../hooks/useDebounce';
import { turnOffLight, turnOnLight, fanControl, setStatusLightID, doorControl } from '../../../utils/voiceControl';
function SpeechModal({
    content,
    handleClose,
    listening,
    stopListening,
    setStatusLight1,
    setStatusLight2,
    fanSpeed,
    setFanSpeed,
    setStatusDoor
}) {
    const handleStopListening = () => {
        stopListening();
        if ((content.includes('bật') || content.includes('mở')) && content.includes('đèn 1')) {
            setStatusLightID(1, setStatusLight1, handleClose, '1');
        } else if ((content.includes('bật') || content.includes('mở')) && content.includes('đèn 2')) {
            setStatusLightID(1, setStatusLight2, handleClose, '1');
        } else if ((content.includes('tắt') || content.includes('mở')) && content.includes('đèn 1')) {
            setStatusLightID(1, setStatusLight1, handleClose, '0');
        } else if ((content.includes('tắt') || content.includes('mở')) && content.includes('đèn 2')) {
            setStatusLightID(1, setStatusLight2, handleClose, '0');
        } else if ((content.includes('bật') || content.includes('mở')) && content.includes('đèn')) {
            turnOnLight(setStatusLight1, setStatusLight2, handleClose);
        } else if (content.includes('tắt') && content.includes('đèn')) {
            turnOffLight(setStatusLight1, setStatusLight2, handleClose);
        } else if (content.includes('tối đa') && content.includes('quạt')) {
            fanControl(100, setFanSpeed, handleClose);
        } else if (content.includes('trung bình') && content.includes('quạt')) {
            fanControl(50, setFanSpeed, handleClose);
        } else if (content.includes('tắt') && content.includes('quạt')) {
            fanControl(0, setFanSpeed, handleClose);
        } else if ((content.includes('bật') || content.includes('mở')) && content.includes('quạt')) {
            fanControl(100, setFanSpeed, handleClose);
        }
        else if (content.includes('mở') && content.includes('cửa')) {
            doorControl('1', setStatusDoor, handleClose)
        } 
        else if (content.includes('đóng') && content.includes('cửa')) {
            doorControl('0', setStatusDoor, handleClose)
        }
        else {
            handleClose();
            toast.error('Yêu cầu không hợp lệ');
        }
    };
    const debounced = useDebounce(content, 1000);
    useEffect(() => {
        if (content !== '' && !listening) handleStopListening();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);
    return (
        <div
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    stopListening();
                    handleClose();
                }
            }}
            className="w-full h-full fixed top-0 left-0 bg-[#00000080] flex items-center justify-center z-50"
        >
            <div className="max-w-[80%] w-[596px] h-[200px] p-[32px] z-50 bg-white flex items-center justify-between rounded-md relative">
                <div
                    onClick={() => {
                        stopListening();
                        handleClose();
                    }}
                    className="cursor-pointer absolute w-[40px] h-[40px] top-0 right-0 flex items-center justify-center"
                >
                    <CloseIcon />
                </div>
                <p className="text-[18px] w-[80%]">{content === '' ? 'Listening...' : content}</p>
                <div className="w-[20%] flex items-center justify-end">
                    <div onClick={handleStopListening} className="">
                        <BingMicIcon listening={listening} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SpeechModal;
