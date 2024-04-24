import Landing from '../../assets/landing.jpg';
import { CheckedIcon } from '../../components/Icons/Icons';
import { convertTime, roundTime } from '../../utils/time';
import { readNotify } from '../../services/notificationAPI';
import { useNotify } from '../../contexts/useNotify';
import { toast } from 'react-toastify';
function NotifyItem({ flag, name, time, type, value, id }) {
    const notifyContext = useNotify();

    const handleRead = async () => {
        const fetchData = async () => {
            try {
                await readNotify({ _id: id });
                toast.success('Đã đọc thông báo');
                notifyContext.reRender();
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    };

    let sensorName = '';
    let unit = '';
    if (name === 'humidity-sensor') {
        sensorName = 'Độ ẩm';
        unit = '%';
    } else if (name === 'temp-sensor') {
        sensorName = 'Nhiệt độ';
        unit = '°C';
    } else if (name === 'lighting-sensor') {
        sensorName = 'Ánh sáng';
        unit = '%';
    }

    let content = '';
    if (name === 'warning') {
        content = `Phát hiện người trước cửa lúc ${convertTime(time).slice(0, 10) + ' ' + convertTime(time).slice(11, 19)}`;
    } else {
        content = `${sensorName} ${type.toLowerCase()} bình thường, giá trị ${value}${unit} lúc ${
            convertTime(time).slice(0, 10) + ' ' + convertTime(time).slice(11, 19)
        }`;
    }

    return (
        <div
            className={`cursor-pointer w-full md:px-[16px] md:py-[10px] px-[8px] py-[20px] shadow flex items-center rounded-[10px] mb-[28px] ${
                !flag ? 'bg-[#eaeaea]' : 'bg-[#f7f7f7]'
            }`}
        >
            <img src={Landing} alt="" className="block w-[56px] h-[56px] object-cover rounded-[50%]" />
            <div className="flex flex-col lg:flex-row lg:items-center flex-1">
                <p
                    className={`font-semibold text-[12px] md:text-[14px] lg:text-[16px] lg:ml-[46px] lg:w-[920px] w-full lg:px-0 px-[12px] text-justify ${
                        !flag ? 'text-black' : 'text-[#65676B]'
                    }`}
                >
                    {content}
                </p>
                <div className="flex flex-row lg:flex-col-reverse items-center justify-between lg:ml-[56px] lg:px-0 px-[12px] text-justify lg:mt-0 mt-[4px]">
                    <p
                        className={`text-[12px] min-w-[110px] md:text-[14px] lg:text-[16px] ${
                            !flag ? 'text-[#2396EF]' : 'text-[#65676B]'
                        }`}
                    >
                        {roundTime(new Date(time))}
                    </p>
                    <div className="flex flex-row items-center lg:gap-[46px] gap-[14px]">
                        <div
                            className={`bg-[#0866FF] w-[16px] h-[16px] rounded-[50%] ${
                                !flag ? 'bg-[#0866FF]' : 'bg-inherit'
                            }`}
                        ></div>
                        <div className="cursor-pointer" onClick={handleRead}>
                            <CheckedIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotifyItem;
