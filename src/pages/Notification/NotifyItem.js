import Landing from '../../assets/landing.jpg';
import { CheckedIcon } from '../../components/Icons/Icons';
function NotifyItem({ content, isRead }) {
    return (
        <div
            className={`cursor-pointer w-full md:px-[16px] md:py-[10px] px-[8px] py-[20px] shadow flex items-center rounded-[10px] mb-[28px] ${
                !isRead ? 'bg-[#eaeaea]' : 'bg-[#f7f7f7]'
            }`}
        >
            <img src={Landing} alt="" className="block w-[56px] h-[56px] object-cover rounded-[50%]" />
            <div className="flex flex-col lg:flex-row lg:items-center">
                <p
                    className={`font-semibold text-[12px] md:text-[14px] lg:text-[16px] lg:ml-[46px] max-w-[894px] lg:px-0 px-[12px] text-justify ${
                        !isRead ? 'text-black' : 'text-[#65676B]'
                    }`}
                >
                    {content}
                </p>
                <div className="flex flex-row lg:flex-col-reverse items-center justify-between lg:ml-[56px] lg:px-0 px-[12px] text-justify lg:mt-0 mt-[4px]">
                    <p
                        className={`text-[12px] md:text-[14px] lg:text-[16px] ${
                            !isRead ? 'text-[#2396EF]' : 'text-[#65676B]'
                        }`}
                    >
                        10 phút trước
                    </p>
                    <div className="flex flex-row items-center lg:gap-[46px] gap-[14px]">
                        <div
                            className={`bg-[#0866FF] w-[16px] h-[16px] rounded-[50%] ${
                                !isRead ? 'bg-[#0866FF]' : 'bg-inherit'
                            }`}
                        ></div>
                        <div className="cursor-pointer">
                            <CheckedIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotifyItem;
