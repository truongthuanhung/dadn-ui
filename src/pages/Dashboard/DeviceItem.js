import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import { LampIcon, FanIcon, DoorIcon } from '../../components/Icons/Icons';
import Switch from 'react-switch';
const cx = classNames.bind(styles);
function DeviceItem({
    deviceType,
    deviceName,
    deviceStatus,
    toggleDeviceStatus,
    deviceMode,
    changeDeviceMode,
    fanSpeed,
    setFanSpeed,
}) {
    let Icon = LampIcon;
    if (deviceType === 'fan') Icon = FanIcon;
    if (deviceType === 'door') Icon = DoorIcon;
    return (
        <div
            className={`flex flex-col justify-between py-[28px] px-[24px] w-[296px] h-[208px] rounded-[20px] ${
                deviceStatus ? 'bg-[#C3DBFF]' : ' bg-[#f2f2f2]'
            }`}
        >
            <div className={cx('flex items-center justify-between')}>
                <div className={cx('w-[44px] h-[44px] bg-[#2892F0] rounded-[10px] flex items-center justify-center')}>
                    <Icon />
                </div>
                <div className={cx('flex items-center gap-[34px]')}>
                    {deviceType === 'door' ? (
                        <p className={cx('text-[18px] font-semibold text-[#5C5C5C]')}>
                            {deviceStatus ? 'Open' : 'Closed'}
                        </p>
                    ) : (
                        <p className={cx('text-[18px] font-semibold text-[#5C5C5C]')}>{deviceStatus ? 'On' : 'Off'}</p>
                    )}
                    <Switch onChange={() => toggleDeviceStatus(!deviceStatus)} checked={deviceStatus} />
                </div>
            </div>
            {deviceType === 'fan' && (
                <div className={cx('flex items-center justify-end gap-[34px]')}>
                    <select
                        value={fanSpeed}
                        onChange={setFanSpeed}
                        className={`text-[18px] font-semibold text-[#5C5C5C] ${
                            deviceStatus ? 'bg-[#C3DBFF]' : ' bg-[#f2f2f2]'
                        }`}
                    >
                        <option value="100%">Speed 100%</option>
                        <option value="50%">Speed 50%</option>
                        <option value="25%">Speed 25%</option>
                    </select>
                </div>
            )}
            <div className={cx('flex items-center justify-between')}>
                <p className={cx('text-[18px] font-semibold text-[#5C5C5C]')}>{deviceName}</p>
                <select
                    value={deviceMode}
                    onChange={changeDeviceMode}
                    className={`text-[18px] font-semibold text-[#5C5C5C] ${
                        deviceStatus ? 'bg-[#C3DBFF]' : ' bg-[#f2f2f2]'
                    }`}
                >
                    <option value="automatic">Automatic</option>
                    <option value="manual">Manual</option>
                </select>
            </div>
        </div>
    );
}

export default DeviceItem;
