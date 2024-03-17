import SensorSettingsItem from './SensorSettingsItem';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const dummyData = {
    tempData: [20, 36, 14, 31],
    humidData: [100, 200, 150, 250],
    lightData: [100, 300, 0, 100],
};
function Settings() {
    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem('isLoggedIn') === null) {
            navigate('/login');
        }
    }, []);
    const [tempSensorData, setTempSensorData] = useState(dummyData.tempData);
    const [humidSensorData, setHumidSensorData] = useState(dummyData.humidData);
    const [lightSensorData, setLightSensorData] = useState(dummyData.lightData);
    const handleTempSensorChange = (newData) => {
        setTempSensorData(newData);
    };
    const handleHumidSensorChange = (newData) => {
        setHumidSensorData(newData);
    };
    const handleLightSensorChange = (newData) => {
        setLightSensorData(newData);
    };
    const handleCancelTemp = () => {
        setTempSensorData(dummyData.tempData);
        setLightSensorData(dummyData.lightData);
    };
    const handleCancelHumid = () => {
        setHumidSensorData(dummyData.humidData);
    };
    const handleCancelLight = () => {
        setLightSensorData(dummyData.lightData);
    };
    return (
        <div className="mt-[65px] md:ml-[70px] lg:px-[75px] lg:pr-0 md:px-[40px] px-[16px] py-[24px]">
            <p className="text-[28px] font-bold mb-[28px]">Cài đặt</p>
            <div className="flex flex-col md:flex-row flex-wrap">
                <div className="w-full md:w-1/2 lg:pb-[28px] pb-[18px] flex items-center justify-center md:justify-start">
                    <SensorSettingsItem
                        sensorType="temperature"
                        data={tempSensorData}
                        onChange={handleTempSensorChange}
                        onCancel={handleCancelTemp}
                    />
                </div>
                <div className="w-full md:w-1/2 lg:pb-[28px] pb-[18px] flex items-center justify-center md:justify-start">
                    <SensorSettingsItem
                        sensorType="humidity"
                        data={humidSensorData}
                        onChange={handleHumidSensorChange}
                        onCancel={handleCancelHumid}
                    />
                </div>
                <div className="w-full md:w-1/2 lg:pb-[28px] pb-[18px] flex items-center justify-center md:justify-start">
                    <SensorSettingsItem
                        sensorType="lighting"
                        data={lightSensorData}
                        onChange={handleLightSensorChange}
                        onCancel={handleCancelLight}
                    />
                </div>
            </div>
        </div>
    );
}

export default Settings;
