import React, { useState } from 'react';
import NotifyItem from './NotifyItem';
const notifyData = [
    {
        content: 'Nhiệt độ phòng khách vượt ngưỡng bình thường, giá trị 33,5 độ C tại thời điểm 11/3/2024 15:30 ',
        isRead: true,
    },
    {
        content: 'Nhiệt độ phòng khách vượt ngưỡng bình thường, giá trị 33,5 độ C tại thời điểm 11/3/2024 15:30 ',
        isRead: true,
    },
    {
        content: 'Nhiệt độ phòng khách vượt ngưỡng bình thường, giá trị 33,5 độ C tại thời điểm 11/3/2024 15:30 ',
        isRead: true,
    },
    {
        content: 'Nhiệt độ phòng khách vượt ngưỡng bình thường, giá trị 33,5 độ C tại thời điểm 11/3/2024 15:30 ',
        isRead: true,
    },
    {
        content: 'Nhiệt độ phòng khách vượt ngưỡng bình thường, giá trị 33,5 độ C tại thời điểm 11/3/2024 15:30 ',
        isRead: true,
    },
    {
        content: 'Nhiệt độ phòng khách vượt ngưỡng bình thường, giá trị 33,5 độ C tại thời điểm 11/3/2024 15:30 ',
        isRead: false,
    },
    {
        content: 'Nhiệt độ phòng khách vượt ngưỡng bình thường, giá trị 33,5 độ C tại thời điểm 11/3/2024 15:30 ',
        isRead: false,
    },
    {
        content: 'Nhiệt độ phòng khách vượt ngưỡng bình thường, giá trị 33,5 độ C tại thời điểm 11/3/2024 15:30 ',
        isRead: false,
    },
];
function Notification() {
    const [tab, setTab] = useState(1);
    return (
        <div className="mt-[65px] md:ml-[70px] lg:px-[75px] md:px-[40px] px-[16px] py-[24px] min-h-[800px]">
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
            <div className="mt-[28px] inline-block cursor-pointer px-[20px] py-[12px] font-semibold rounded-[10px] bg-[#2396EF] text-black">
                Đánh dấu đã đọc
            </div>
            <div className="mt-[28px]">
                {notifyData.map((item, index) => (
                    <NotifyItem key={index} content={item.content} isRead={item.isRead} />
                ))}
            </div>
        </div>
    );
}

export default Notification;
