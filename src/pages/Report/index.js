import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import ChartItem from './ChartItem';
import { getChartData } from '../../services/deviceService';
function Report() {
    const navigate = useNavigate();
    const authContext = useAuth();
    useEffect(() => {
        if (!authContext.auth) {
            navigate('/login');
        }
    }, [authContext.auth, navigate]);
    const calcAvg = (data) => {
        const dailySum = {};
        const dailyCount = {};

        // Lặp qua mảng dữ liệu và tính tổng và số lượng giá trị cho mỗi ngày
        data.forEach((item) => {
            const date = item[0].split('T')[0]; // Lấy phần ngày từ mảng [data, value]
            const value = parseFloat(item[1]); // Chuyển đổi giá trị từ chuỗi sang số

            if (!isNaN(value)) {
                // Kiểm tra xem giá trị có phải là số hay không
                dailySum[date] = (dailySum[date] || 0) + value;
                dailyCount[date] = (dailyCount[date] || 0) + 1;
            }
        });

        // Tính trung bình cho mỗi ngày và lưu vào một mảng mới
        const dailyAverage = Object.keys(dailySum).map((date) => {
            return [date, dailySum[date] / dailyCount[date]];
        });

        return dailyAverage;
    };
    const [dayCount, setDayCount] = useState(60);
    const [tab, setTab] = useState(0);
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async (dayCount) => {
            try {
                const today = new Date();
                const [lightData, humidData, tempData] = await Promise.all([
                    getChartData('feeds/lighting-sensor/data/chart', {
                        start_time: new Date(new Date().setDate(today.getDate() - dayCount)),
                        end_time: today.toISOString(),
                    }),
                    getChartData('feeds/humidity-sensor/data/chart', {
                        start_time: new Date(new Date().setDate(today.getDate() - dayCount)),
                        end_time: today.toISOString(),
                    }),
                    getChartData('feeds/temp-sensor/data/chart', {
                        start_time: new Date(new Date().setDate(today.getDate() - dayCount)),
                        end_time: today.toISOString(),
                    }),
                ]);
                setData([calcAvg(lightData.data.data), calcAvg(humidData.data.data), calcAvg(tempData.data.data)]);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchData(dayCount);
    }, [dayCount]);
    return (
        <div className="Report mt-[65px] md:ml-[70px] lg:px-[75px] md:px-[40px] px-[16px] py-[24px] relative overflow-hidden min-h-[700px]">
            <p className="text-[20px] font-bold mb-[10px]">Thống kê</p>
            <div className="max-h-[65vh] flex flex-col items-center justify-between">
                <ChartItem dataset={data} tab={tab}></ChartItem>
                <div className="flex items-center justify-center gap-[20px] mt-[20px]">
                    <button
                        onClick={() => setTab(0)}
                        className={`text-[16px] lg:text-[18px] py-[8px] px-[16px] rounded-full font-semibold ${
                            tab === 0 ? 'bg-[#BEE979]' : 'bg-[#e3e3e4] text-[#97979a]'
                        }`}
                    >
                        Lighting
                    </button>
                    <button
                        onClick={() => setTab(1)}
                        className={`text-[16px] lg:text-[18px] py-[8px] px-[16px] rounded-full font-semibold ${
                            tab === 1 ? 'bg-[#BFE0FF]' : 'bg-[#e3e3e4] text-[#97979a]'
                        }`}
                    >
                        Humidity
                    </button>
                    <button
                        onClick={() => {
                            setTab(2);
                        }}
                        className={`text-[16px] lg:text-[18px] py-[8px] px-[16px] rounded-full font-semibold ${
                            tab === 2 ? 'bg-[#E7C88B]' : 'bg-[#e3e3e4] text-[#97979a]'
                        }`}
                    >
                        Temperature
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Report;
