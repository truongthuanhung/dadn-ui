import React from 'react';
import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import { LampIcon, FanIcon, DoorIcon } from '../../components/Icons/Icons';
import Switch from 'react-switch';
const cx = classNames.bind(styles);

const DeviceItem = React.memo(
    ({
        deviceType,
        deviceName,
        deviceStatus,
        toggleDeviceStatus,
        deviceMode,
        changeDeviceMode,
        fanSpeed,
        setFanSpeed,
    }) => {
        console.log('re-render');
        let Icon = LampIcon;
        if (deviceType === 'fan') Icon = FanIcon;
        if (deviceType === 'door') Icon = DoorIcon;
        return (
            <div
                className={`flex flex-row items-center justify-between rounded-[20px] w-full lg:px-[32px] md:px-[12px] px-[24px] md:py-[6px] py-[10px] ${
                    deviceStatus === '1' ? 'bg-[#C3DBFF]' : ' bg-[#f2f2f2]'
                }`}
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between lg:gap-[48px] gap-[18px]">
                    <div className="w-[44px] h-[44px] rounded-[10px] bg-[#2892F0] flex justify-center items-center">
                        <Icon />
                    </div>
                    <p className="font-bold text-[#1a1a1a] text-[16px] min-w-[76px]">{deviceName}</p>
                </div>
                <div className="flex-1 flex flex-col md:flex-row justify-end lg:gap-[328px] gap-[48px]">
                    {deviceType === 'fan' ? (
                        <div className="flex flex-row items-center justify-between lg:gap-[34px] gap-[12px]">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="10"
                                value={fanSpeed}
                                onChange={setFanSpeed}
                                className="flex-1 w-[100px] lg:w-[250px] block h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                            />
                            <p className="font-bold text-[#1a1a1a] text-[16px] md:min-w-[122px]">Speed: {fanSpeed}%</p>
                        </div>
                    ) : (
                        <div className="flex flex-row items-center justify-end gap-[18px]">
                            <p className="font-bold text-[#1a1a1a] text-[16px] min-w-[58px]">
                                {deviceType !== 'door' && (deviceStatus === '1' ? 'On' : 'Off')}
                                {deviceType === 'door' && (deviceStatus === '1' ? 'Opened' : 'Closed')}
                            </p>

                            <Switch onChange={toggleDeviceStatus} checked={deviceStatus === '1'} />
                        </div>
                    )}

                    <div className={cx('flex items-center justify-end flex-row')}>
                        <p className="font-bold text-[#1a1a1a] text-[16px] mr-[8px]">Mode:</p>
                        <select
                            value={deviceMode}
                            onChange={changeDeviceMode}
                            className={`font-bold text-[#1a1a1a] text-[16px]  ${
                                deviceStatus === '1' ? 'bg-[#C3DBFF]' : ' bg-[#f2f2f2]'
                            }`}
                        >
                            <option value="automatic">Automatic</option>
                            <option value="manual">Manual</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    },
);

export default DeviceItem;
