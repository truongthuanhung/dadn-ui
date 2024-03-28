import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import { SettingsIconSmall } from '../../components/Icons/Icons';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function SensorItem({ sensorType, sensorValue, sensorUnit, upperThreshold, lowerThreshold }) {
    const sensorClass = sensorType ? sensorType.toLowerCase() : '';
    return (
        <div className={cx(sensorClass, 'flex text-white py-[20px] w-[296px] h-[200px] rounded-[20px]')}>
            <div className={cx('w-1/2 border-r-[2px] border-white py-[12px] px-[24px] flex flex-col items-center justify-between')}>
                <p className={cx('text-[16px] font-bold')}>{sensorType}</p>
                <p className={cx('text-[42px] font-semibold')}>{sensorValue}</p>
                <p className={cx('text-[20px]')}>{sensorUnit}</p>
            </div>
            <div className={cx('w-1/2 px-[24px] py-[12px]')}>
                <p className={cx('text-[12px] text-center font-semibold')}>
                    Ngưỡng dưới:{' '}
                    <span className="text-[14px]">
                        {lowerThreshold} {sensorUnit}
                    </span>
                </p>
                <p className={cx('text-[12px] text-center font-semibold mt-[4px]')}>
                    Ngưỡng trên:{' '}
                    <span className="text-[14px]">
                        {upperThreshold} {sensorUnit}
                    </span>
                </p>
                <Link to="/Settings">
                    <div
                        className={cx(
                            'flex justify-between gap-[6px] items-center bg-[#c9cfda4d] rounded-[20px] text-[12px] text-center mt-[15px] px-[12px] py-[10px]',
                        )}
                    >
                        <SettingsIconSmall />
                        <p>Settings</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default SensorItem;
