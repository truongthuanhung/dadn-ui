import { TempIcon, HumidIcon, LightIcon } from '../../components/Icons/Icons';
function SensorSettingsItem({ sensorType, low, high, onChange, onCancel, onSave }) {
    let SensorIcon = TempIcon;
    let sensorName = 'Cảm biến nhiệt độ';
    if (sensorType === 'lighting') {
        SensorIcon = LightIcon;
        sensorName = 'Cảm biến ánh sáng';
    }
    if (sensorType === 'humidity') {
        SensorIcon = HumidIcon;
        sensorName = 'Cảm biến độ ẩm';
    }
    const handleChangeLow = (e) => {
        onChange({ low: e.target.value, high: high });
    };
    const handleChangeHigh = (e) => {
        onChange({ low: low, high: e.target.value });
    };
    return (
        <div className="w-[295px] lg:w-[500px] bg-[#f2f2f2] px-[24px] py-[28px] rounded-[20px]">
            <div className="flex items-center lg:gap-[90px] gap-[16px]">
                <div className="w-[44px] h-[44px] bg-[#2892F0] rounded-[10px] flex items-center justify-center">
                    <SensorIcon />
                </div>
                <p className="font-semibold text-[18px]">{sensorName}</p>
            </div>
            <div className="mt-[20px]">
                <div className="flex justify-between items-center gap-[24px] mt-[14px]">
                    <div className="flex flex-col gap-[8px]">
                        <p className="font-semibold">Ngưỡng dưới</p>
                        <input
                            type="number"
                            value={low}
                            onChange={handleChangeLow}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <p className="font-semibold">Ngưỡng trên</p>
                        <input
                            type="number"
                            value={high}
                            onChange={handleChangeHigh}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col-reverse lg:flex-row mt-[28px] lg:gap-[24px] gap-[14px]">
                <button
                    onClick={onCancel}
                    className="lg:w-[214px] h-[45px] w-full  bg-[#B4AFAF] rounded-[10px] font-semibold"
                >
                    Hủy bỏ
                </button>
                <button
                    onClick={onSave}
                    className="lg:w-[214px] h-[45px] w-full bg-[#2396EF] rounded-[10px] font-semibold"
                >
                    Lưu thay đổi
                </button>
            </div>
        </div>
    );
}

export default SensorSettingsItem;
