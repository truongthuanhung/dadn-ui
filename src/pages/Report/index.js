import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import ChartItem from './ChartItem';
function Report() {
    const navigate = useNavigate();
    const authContext = useAuth();

    const [tab, setTab] = useState(1);
    useEffect(() => {
        if (!authContext.auth) {
            navigate('/login');
        }
    }, [authContext.auth, navigate]);
    return (
        <div className="Report mt-[65px] md:ml-[70px] lg:px-[75px] md:px-[40px] px-[16px] py-[24px] min-h-[100vh] relative overflow-hidden">
            <div className="overflow-x-scroll md:overflow-x-hidden mb-[28px]">
                <div className="flex flex-row items-center justify-start gap-[24px] min-w-[600px]">
                    <div
                        onClick={() => setTab(1)}
                        className={`cursor-pointer px-[20px] py-[12px] font-semibold rounded-[10px] ${
                            tab === 1 ? 'bg-[#2396EF] text-black' : 'text-[#7a7a7a]'
                        }`}
                    >
                        Living Room
                    </div>
                    <div
                        onClick={() => setTab(2)}
                        className={`cursor-pointer px-[20px] py-[12px] font-semibold rounded-[10px] ${
                            tab === 2 ? 'bg-[#2396EF] text-black' : 'text-[#7a7a7a]'
                        }`}
                    >
                        Dining Room
                    </div>
                </div>
            </div>
            <p className="text-[20px] font-bold mb-[28px]">Thống kê</p>
            <div className='max-h-[570px]'>
                <ChartItem></ChartItem>
            </div>
        </div>
    );
}

export default Report;
