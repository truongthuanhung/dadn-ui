import React, { useEffect } from 'react';
import { BingMicIcon, CloseIcon } from '../../Icons/Icons';
import { toast } from '../../../utils/toastify';
import { useDebounce } from '../../../hooks/useDebounce';
import { turnOffLight, turnOnLight, fanControl } from '../../../utils/voiceControl';
function SpeechModal({
    content,
    handleClose,
    listening,
    stopListening,
    setStatusLight1,
    setStatusLight2,
    setStatusLight3,
    setStatusLight4,
    fanSpeed,
    setFanSpeed,
}) {
    const handleStopListening = () => {
        stopListening();
        if (content.includes('on') && content.includes('light')) {
            turnOnLight(setStatusLight1, setStatusLight2, setStatusLight3, setStatusLight4, handleClose);
        } else if (content.includes('off') && content.includes('light')) {
            turnOffLight(setStatusLight1, setStatusLight2, setStatusLight3, setStatusLight4, handleClose);
        } else if (content.includes('maximum') && content.includes('fan')) {
            fanControl(100, setFanSpeed, handleClose);
        } else if (content.includes('medium') && content.includes('fan')) {
            fanControl(50, setFanSpeed, handleClose);
        } else if (content.includes('off') && content.includes('fan')) {
            fanControl(0, setFanSpeed, handleClose);
        } else if (content.includes('on') && content.includes('fan')) {
            fanControl(100, setFanSpeed, handleClose);
        } else {
            handleClose();
            toast.error('Yêu cầu không hợp lệ');
        }
    };
    const debounced = useDebounce(content, 1500);
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
                <p className="text-[18px] w-[80%]">{content}</p>
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
