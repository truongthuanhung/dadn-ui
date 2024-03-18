import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import SensorItem from './SensorItem';
import DeviceItem from './DeviceItem';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deviceList } from './dummyData';
import { useAuth } from '../../contexts/useAuth';
const cx = classNames.bind(styles);
function Dashboard() {
    const navigate = useNavigate();
    const authContext = useAuth();
    useEffect(() => {
        if (!authContext.auth) {
            navigate('/login');
        }
    }, [navigate, authContext.auth]);
    const [status1, setStatus1] = useState(false);
    const [mode1, setMode1] = useState('automatic');
    const [fanSpeed, setFanSpeed] = useState('100%');
    return (
        <div
            className={cx(
                'Dashboard',
                'mt-[65px] md:ml-[70px] lg:px-[75px] lg:pr-0 md:px-[40px] px-[16px] py-[24px] min-h-[800px]',
            )}
        >
            <p className={cx('text-[28px] font-bold mb-[28px]')}>Bảng điều khiển</p>
            <p className={cx('text-[20px] font-bold mb-[28px]')}>Cảm biến thông minh</p>
            <div className="flex flex-col md:flex-row flex-wrap mb-[28px]">
                <div className="w-full md:w-1/2 lg:w-1/3 lg:pb-[28px] pb-[18px] flex items-center justify-center md:justify-start">
                    <SensorItem
                        sensorType="Lighting"
                        sensorValue={171}
                        sensorUnit="W/m2"
                        upperThreshold={200}
                        lowerThreshold={100}
                    />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 lg:pb-[28px] pb-[18px] flex items-center justify-center md:justify-start">
                    <SensorItem
                        sensorType="Humidity"
                        sensorValue={37}
                        sensorUnit="ml/m3"
                        upperThreshold={100}
                        lowerThreshold={50}
                    />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 lg:pb-[28px] pb-[18px] flex items-center justify-center md:justify-start">
                    <SensorItem
                        sensorType="Temperature"
                        sensorValue={32}
                        sensorUnit="°C"
                        upperThreshold={36}
                        lowerThreshold={14}
                    />
                </div>
            </div>
            <p className={cx('text-[20px] font-bold mb-[28px]')}>Thiết bị</p>
            <div className="flex items-start flex-wrap mb-[28px]">
                {deviceList.map((item, index) => (
                    <div
                        key={index}
                        className="w-full md:w-1/2 lg:w-1/3 lg:pb-[28px] pb-[18px] flex items-center justify-center md:justify-start"
                    >
                        <DeviceItem
                            deviceType={item.deviceType}
                            deviceName={item.deviceName}
                            deviceStatus={status1}
                            toggleDeviceStatus={setStatus1}
                            deviceMode={mode1}
                            changeDeviceMode={() => setMode1(mode1 === 'automatic' ? 'manual' : 'automatic')}
                            fanSpeed={fanSpeed}
                            setFanSpeed={(e) => setFanSpeed(e.target.value)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
