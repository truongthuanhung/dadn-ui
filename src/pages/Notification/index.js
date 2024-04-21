import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NotifyItem from './NotifyItem';
import { useAuth } from '../../contexts/useAuth';
import { useNotify } from '../../contexts/useNotify';
import { readAllNotify } from '../../services/notificationAPI';
import { toast } from 'react-toastify';
function Notification() {
    const notifyContext = useNotify();
    const [tab, setTab] = useState(1);
    const navigate = useNavigate();
    const authContext = useAuth();
    useEffect(() => {
        if (!authContext.auth) {
            navigate('/login');
        }
    }, [authContext.auth, navigate]);

    const handleReadAll = () => {
        const fetchData = async () => {
            try {
                await readAllNotify();
                toast.success('Đã đọc toàn bộ thông báo');
                notifyContext.reRender();
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    };
    return (
        <div className="mt-[65px] md:ml-[70px] lg:px-[75px] md:px-[40px] px-[16px] pt-[24px] pb-[64px] min-h-[100vh]">
            <h2 className="text-[28px] font-bold mb-[28px]">Thông báo</h2>

            <div className="overflow-x-scroll md:overflow-x-hidden">
                <div className="flex flex-row items-center justify-start gap-[24px] min-w-[600px]">
                    <div
                        onClick={() => setTab(1)}
                        className={`cursor-pointer px-[20px] py-[12px] font-semibold rounded-[10px] ${
                            tab === 1 ? 'bg-[#2396EF] text-black' : 'text-[#7a7a7a]'
                        }`}
                    >
                        Tất cả
                    </div>
                    <div
                        onClick={() => setTab(2)}
                        className={`cursor-pointer px-[20px] py-[12px] font-semibold rounded-[10px] ${
                            tab === 2 ? 'bg-[#2396EF] text-black' : 'text-[#7a7a7a]'
                        }`}
                    >
                        Cảm biến vượt ngưỡng
                    </div>
                    <div
                        onClick={() => setTab(3)}
                        className={`cursor-pointer px-[20px] py-[12px] font-semibold rounded-[10px] ${
                            tab === 3 ? 'bg-[#2396EF] text-black' : 'text-[#7a7a7a]'
                        }`}
                    >
                        Phát hiện người
                    </div>
                </div>
            </div>
            <div
                onClick={handleReadAll}
                className="mt-[28px] inline-block cursor-pointer px-[20px] py-[12px] font-semibold rounded-[10px] bg-[#2396EF] text-black"
            >
                Đánh dấu đã đọc
            </div>
            <div className="overflow-y-scroll mt-[10px] lg:pr-[24px]">
                {tab === 1 ? (
                    <div className="mt-[28px] max-h-[75vh]">
                        {notifyContext.notification.map((item, index) => (
                            <NotifyItem
                                key={index}
                                id={item._id}
                                name={item.name}
                                value={item.value}
                                time={item.time}
                                type={item.type}
                                flag={item.flag}
                            />
                        ))}
                    </div>
                ) : (
                    <></>
                )}
                {tab === 2 ? (
                    <div className="mt-[28px] max-h-[75vh]">
                        {notifyContext.notification
                            .filter((obj) => obj.type === 'Vượt ngưỡng' || obj.type === 'Dưới ngưỡng')
                            .map((item, index) => (
                                <NotifyItem
                                    key={index}
                                    id={item._id}
                                    name={item.name}
                                    value={item.value}
                                    time={item.time}
                                    type={item.type}
                                    flag={item.flag}
                                />
                            ))}
                    </div>
                ) : (
                    <></>
                )}
                {tab === 3 ? (
                    <div className="mt-[28px] max-h-[75vh]">
                        {notifyContext.notification
                            .filter((obj) => obj.type === 'Phát hiện người')
                            .map((item, index) => (
                                <NotifyItem
                                    key={index}
                                    id={item._id}
                                    name={item.name}
                                    value={item.value}
                                    time={item.time}
                                    type={item.type}
                                    flag={item.flag}
                                />
                            ))}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default Notification;
