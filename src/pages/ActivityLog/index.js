import React, { useState, useEffect } from 'react';
import { getDeviceStatus } from '../../services/deviceService';
import { convertTime } from '../../utils/time';
function ActivityLog() {
    const [tab, setTab] = useState('all');
    const [dataAll, setDataAll] = useState([]);
    const [light1, setLight1] = useState([]);
    const [light2, setLight2] = useState([]);
    const [fan, setFan] = useState([]);
    const [door, setDoor] = useState([]);
    const [temp, setTemp] = useState([]);
    const [humid, setHumid] = useState([]);
    const [lighting, setLighting] = useState([]);

    const renderItem = (data) => {
        return data?.map((item, index) => {
            let deviceName = '';
            let value = 0;
            let color = 'text-gray-500';
            if (item.feed_key === 'light-1') {
                deviceName = 'Light 1';
                value = item.value === '0' ? 'Tắt' : 'Bật';
                color = item.value === '0' ? 'text-[#e74c3c]' : 'text-[#07bc0c]';
            } else if (item.feed_key === 'light-2') {
                deviceName = 'Light 2';
                value = item.value === '0' ? 'Tắt' : 'Bật';
                color = item.value === '0' ? 'text-[#e74c3c]' : 'text-[#07bc0c]';
            } else if (item.feed_key === 'fan') {
                deviceName = 'Fan';
                value = item.value + ' %';
            } else if (item.feed_key === 'door') {
                deviceName = 'Door';
                value = item.value === '0' ? 'Đóng' : 'Mở';
                color = item.value === '0' ? 'text-[#e74c3c]' : 'text-[#07bc0c]';
            } else if (item.feed_key === 'temp-sensor') {
                deviceName = 'Temperature Sensor';
                value = item.value + ' °C';
            } else if (item.feed_key === 'humidity-sensor') {
                deviceName = 'Humidity Sensor';
                value = item.value + ' %';
            } else if (item.feed_key === 'lighting-sensor') {
                deviceName = 'Lighting Sensor';
                value = item.value + ' %';
            }
            return (
                <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 font-medium"
                >
                    <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        {deviceName}
                    </th>
                    <td className="px-6 py-4">{item.feed_key}</td>
                    <td className="px-6 py-4">
                        {convertTime(item.created_at).slice(0, 10) + ' ' + convertTime(item.created_at).slice(11, 19)}
                    </td>
                    <td className={`px-6 py-4 ${color}`}>{value}</td>
                </tr>
            );
        });
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [light1, light2, fan, door, tempSensor, humiditySensor, lightSensor] = await Promise.all([
                    getDeviceStatus('feeds/light-1/data'),
                    getDeviceStatus('feeds/light-2/data'),
                    getDeviceStatus('feeds/fan/data'),
                    getDeviceStatus('feeds/door/data'),
                    getDeviceStatus('feeds/temp-sensor/data'),
                    getDeviceStatus('feeds/humidity-sensor/data'),
                    getDeviceStatus('feeds/lighting-sensor/data'),
                ]);
                setLight1(light1.data);
                setLight2(light2.data);
                setFan(fan.data);
                setDoor(door.data);
                setTemp(tempSensor.data);
                setHumid(humiditySensor.data);
                setLighting(lightSensor.data);
                setDataAll(
                    [
                        ...light1.data,
                        ...light2.data,
                        ...fan.data,
                        ...door.data,
                        ...tempSensor.data,
                        ...humiditySensor.data,
                        ...lightSensor.data,
                    ].sort(function (a, b) {
                        return new Date(b.created_at) - new Date(a.created_at);
                    }),
                );
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
        const intervalId = setInterval(fetchData, 3000);
        return () => clearInterval(intervalId);
    }, []);
    return (
        <div className="mt-[65px] md:ml-[70px] lg:px-[75px] md:px-[40px] px-[16px] py-[24px] min-h-[100vh] relative overflow-hidden">
            <h2 className="text-[28px] font-bold mb-[28px]">Hoạt động thiết bị</h2>
            <div className="overflow-x-auto">
                <div className="flex flex-row items-center justify-start gap-[24px] min-w-[1000px]">
                    <div
                        onClick={() => setTab('all')}
                        className={`cursor-pointer px-[20px] py-[12px] font-semibold rounded-[10px] ${
                            tab === 'all' ? 'bg-[#2396EF] text-black' : 'text-[#7a7a7a]'
                        }`}
                    >
                        Tất cả
                    </div>
                    <div
                        onClick={() => setTab('light-1')}
                        className={`cursor-pointer px-[20px] py-[12px] font-semibold rounded-[10px] ${
                            tab === 'light-1' ? 'bg-[#2396EF] text-black' : 'text-[#7a7a7a]'
                        }`}
                    >
                        Đèn 1
                    </div>
                    <div
                        onClick={() => setTab('light-2')}
                        className={`cursor-pointer px-[20px] py-[12px] font-semibold rounded-[10px] ${
                            tab === 'light-2' ? 'bg-[#2396EF] text-black' : 'text-[#7a7a7a]'
                        }`}
                    >
                        Đèn 2
                    </div>
                    <div
                        onClick={() => setTab('fan')}
                        className={`cursor-pointer px-[20px] py-[12px] font-semibold rounded-[10px] ${
                            tab === 'fan' ? 'bg-[#2396EF] text-black' : 'text-[#7a7a7a]'
                        }`}
                    >
                        Quạt
                    </div>
                    <div
                        onClick={() => setTab('door')}
                        className={`cursor-pointer px-[20px] py-[12px] font-semibold rounded-[10px] ${
                            tab === 'door' ? 'bg-[#2396EF] text-black' : 'text-[#7a7a7a]'
                        }`}
                    >
                        Cửa
                    </div>
                    <div
                        onClick={() => setTab('lighting-sensor')}
                        className={`cursor-pointer px-[20px] py-[12px] font-semibold rounded-[10px] ${
                            tab === 'lighting-sensor' ? 'bg-[#2396EF] text-black' : 'text-[#7a7a7a]'
                        }`}
                    >
                        Ánh sáng
                    </div>
                    <div
                        onClick={() => setTab('temp-sensor')}
                        className={`cursor-pointer px-[20px] py-[12px] font-semibold rounded-[10px] ${
                            tab === 'temp-sensor' ? 'bg-[#2396EF] text-black' : 'text-[#7a7a7a]'
                        }`}
                    >
                        Nhiệt độ
                    </div>
                    <div
                        onClick={() => setTab('humidity-sensor')}
                        className={`cursor-pointer px-[20px] py-[12px] font-semibold rounded-[10px] ${
                            tab === 'humidity-sensor' ? 'bg-[#2396EF] text-black' : 'text-[#7a7a7a]'
                        }`}
                    >
                        Độ ẩm
                    </div>
                </div>
            </div>

            <div className="relative overflow-x-auto mt-[28px]">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 min-w-[650px]">
                    <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-[16px]">
                                Tên thiết bị
                            </th>
                            <th scope="col" className="px-6 py-3 text-[16px]">
                                Tên feed
                            </th>
                            <th scope="col" className="px-6 py-3 text-[16px]">
                                Thời gian
                            </th>
                            <th scope="col" className="px-6 py-3 text-[16px]">
                                Giá trị
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tab === 'all' && renderItem(dataAll)}
                        {tab === 'light-1' && renderItem(light1)}
                        {tab === 'light-2' && renderItem(light2)}
                        {tab === 'fan' && renderItem(fan)}
                        {tab === 'door' && renderItem(door)}
                        {tab === 'temp-sensor' && renderItem(temp)}
                        {tab === 'humidity-sensor' && renderItem(humid)}
                        {tab === 'lighting-sensor' && renderItem(lighting)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ActivityLog;
