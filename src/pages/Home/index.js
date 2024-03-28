import Landing from '../../assets/landing.jpg';
import Landing2 from '../../assets/landing2.jpg';
import Landing3 from '../../assets/landing3.jpg';
import Landing4 from '../../assets/landing4.jpg';
import SmartSensor from '../../assets/smartSensor.jpg';
import DeviceControl from '../../assets/deviceControl.jpg';
import Report from '../../assets/report.jpg';
import { LeftArrowIcon, RightArrowIcon } from '../../components/Icons/Icons';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/useAuth';
import { Link } from 'react-router-dom';
function Home() {
    const authContext = useAuth();
    const isLoggedIn = authContext.auth;
    const [showSlider, setShowSlider] = useState(1);
    const nextSlider = () => {
        setShowSlider(showSlider === 4 ? 1 : showSlider + 1);
    };
    const prevSlider = () => {
        setShowSlider(showSlider === 1 ? 4 : showSlider - 1);
    };
    useEffect(() => {
        const interval = setInterval(() => {
            setShowSlider(showSlider === 4 ? 1 : showSlider + 1);
        }, 3000);
        return () => clearInterval(interval);
    }, [showSlider]);
    return (
        <div className="Home mt-[65px] md:ml-[70px]">
            <div className="flex flex-col md:flex-row items-center h-auto md:h-[400px] lg:h-[450px]">
                <div className="w-full md:w-3/5 h-[400px] md:h-full">
                    {showSlider === 1 && <img src={Landing} alt="" className="block w-full h-full object-cover" />}
                    {showSlider === 2 && <img src={Landing2} alt="" className="block w-full h-full object-cover" />}
                    {showSlider === 3 && <img src={Landing3} alt="" className="block w-full h-full object-cover" />}
                    {showSlider === 4 && <img src={Landing4} alt="" className="block w-full h-full object-cover" />}
                </div>
                <div className="w-full md:w-2/5 h-full lg:px-[40px] lg:py-[76px] md:px-[10px] md:py-[32px] py-[22px] px-[10px] min-h-[314px] bg-[#fafafa]">
                    {showSlider === 1 && (
                        <>
                            <p className="text-[20px] font-bold">SMART HOME WEBSITE</p>
                            <p className="text-justify py-[10px] text-[14px] font-semibold">
                                Hãy mở cửa sổ cho một cuộc sống mới, nơi công nghệ gặp gỡ sự thoải mái và tiện lợi. Bước
                                vào ngôi nhà thông minh của riêng bạn, nơi mỗi góc nhìn đều là minh chứng cho sự tích
                                hợp mượt mà của những Giải pháp IoT Thông minh hàng đầu. Nói lời tạm biệt với cuộc sống
                                bình thường và mở cửa cho một thế giới nơi ngôi nhà của bạn thích ứng với nhu cầu của
                                bạn.
                            </p>
                            <Link to={isLoggedIn ? '/dashboard' : 'login'}>
                                <p className="font-bold text-[16px] underline">Bắt đầu &gt;</p>
                            </Link>
                        </>
                    )}
                    {showSlider === 2 && (
                        <>
                            <p className="text-[20px] font-bold">AN TOÀN VÀ BẢO MẬT</p>
                            <p className="text-justify py-[10px] text-[14px] font-semibold">
                                Bảo vệ ngôi nhà của bạn không chỉ là một ưu tiên mà còn là một trách nhiệm quan trọng.
                                Với hệ thống an ninh thông minh, bạn có thể yên tâm mọi lúc mọi nơi. Từ việc sử dụng các
                                camera giám sát chất lượng cao cho đến việc lắp đặt cảm biến báo động thông minh, mọi
                                góc nhìn và không gian trong ngôi nhà đều được bảo vệ một cách toàn diện.
                            </p>
                            <Link to={isLoggedIn ? '/dashboard' : 'login'}>
                                <p className="font-bold text-[16px] underline">Bắt đầu &gt;</p>
                            </Link>
                        </>
                    )}
                    {showSlider === 3 && (
                        <>
                            <p className="text-[20px] font-bold">TIẾT KIỆM NĂNG LƯỢNG</p>
                            <p className="text-justify py-[10px] text-[14px] font-semibold">
                                Hãy tận dụng sức mạnh của công nghệ thông minh để không chỉ tiết kiệm năng lượng mà còn
                                giảm thiểu hóa đơn điện của bạn. Bằng cách sử dụng các giải pháp IoT tiên tiến, bạn có
                                thể tự động điều chỉnh ánh sáng, nhiệt độ và các thiết bị điện tử trong ngôi nhà của
                                mình để tối ưu hóa việc sử dụng năng lượng.
                            </p>
                            <Link to={isLoggedIn ? '/dashboard' : 'login'}>
                                <p className="font-bold text-[16px] underline">Bắt đầu &gt;</p>
                            </Link>
                        </>
                    )}
                    {showSlider === 4 && (
                        <>
                            <p className="text-[20px] font-bold">THIẾT KẾ SANG TRỌNG</p>
                            <p className="text-justify py-[10px] text-[14px] font-semibold">
                                Khi bạn bước vào ngôi nhà của mình, bạn sẽ được chìm đắm trong không gian được chăm chút
                                từng chi tiết. Hệ thống đèn chiếu sáng thông minh không chỉ tạo ra ánh sáng hoàn hảo cho
                                mọi hoạt động mà còn tạo ra không gian ấm áp và thoải mái. Bạn có thể điều chỉnh đèn từ
                                xa để phù hợp với mọi tình huống, từ bữa tiệc sang trọng đến không gian thư giãn vào
                                buổi tối.
                            </p>
                            <Link to={isLoggedIn ? '/dashboard' : 'login'}>
                                <p className="font-bold text-[16px] underline">Bắt đầu &gt;</p>
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <div className="w-full items-center justify-center text-center py-2">
                <div className="inline-block mr-[70px] cursor-pointer" onClick={prevSlider}>
                    <LeftArrowIcon />
                </div>
                <div
                    onClick={() => setShowSlider(1)}
                    className={`rounded-[50%] inline-block w-[15px] h-[15px] border border-black mx-[5px] px-[5px] cursor-pointer${
                        showSlider === 1 ? ' bg-black' : ''
                    }`}
                ></div>
                <div
                    onClick={() => setShowSlider(2)}
                    className={`rounded-[50%] inline-block w-[15px] h-[15px] border border-black mx-[5px] px-[5px] cursor-pointer${
                        showSlider === 2 ? ' bg-black' : ''
                    }`}
                ></div>
                <div
                    onClick={() => setShowSlider(3)}
                    className={`rounded-[50%] inline-block w-[15px] h-[15px] border border-black mx-[5px] px-[5px] cursor-pointer${
                        showSlider === 3 ? ' bg-black' : ''
                    }`}
                ></div>
                <div
                    onClick={() => setShowSlider(4)}
                    className={`rounded-[50%] inline-block w-[15px] h-[15px] border border-black mx-[5px] px-[5px] cursor-pointer${
                        showSlider === 4 ? ' bg-black' : ''
                    }`}
                ></div>
                <div className="inline-block ml-[70px] cursor-pointer" onClick={nextSlider}>
                    <RightArrowIcon />
                </div>
            </div>
            <div className="lg:px-[80px] md:px-[64px] px-[20px] md:pt-[27px] pt-[20px] lg:pb-[106px] md:pb-[72px] pb-[20px] select-none">
                <p className="text-[24px] font-bold underline">Tính năng &gt;</p>
                <div className="flex flex-col lg:flex-row lg:gap-[84px] gap-[24px] mt-[28px]">
                    <div className="w-full lg:w-1/3">
                        <div className="h-[404px] lg:h-[288px] w-full">
                            <img src={DeviceControl} alt="" className="block h-full rounded-sm object-cover" />
                        </div>
                        <p className="text-[20px] font-bold underline mt-[4px]">Điều khiển thiết bị &gt;</p>
                        <p className="text-[14px] text-justify mt-[4px]">
                            Tính năng điều khiển thiết bị trên trang web cho phép người dùng từ xa kiểm soát các thiết
                            bị thông minh như đèn, máy lạnh, quạt hay camera an ninh một cách dễ dàng. Bằng cách sử dụng
                            giao diện trực quan trên trình duyệt web, người dùng có thể bật/tắt thiết bị, điều chỉnh cài
                            đặt và xem trạng thái hoạt động mọi lúc, mọi nơi.
                        </p>
                    </div>
                    <div className="w-full lg:w-1/3">
                        <div className="h-[404px] lg:h-[288px] w-full">
                            <img src={SmartSensor} alt="" className="block h-full rounded-sm object-cover" />
                        </div>
                        <p className="text-[20px] font-bold underline mt-[4px]">Cảm biến thông minh &gt;</p>
                        <p className="text-[14px] text-justify mt-[4px]">
                            Tính năng cảm biến thông minh cho phép người dùng theo dõi và điều chỉnh môi trường sống của
                            họ, bao gồm nhiệt độ, độ ẩm và ánh sáng. Từ xa, người dùng có thể theo dõi các thông số này
                            và điều chỉnh các thiết bị như máy điều hòa, máy sưởi, hoặc đèn để tạo ra môi trường thoải
                            mái và tiết kiệm năng lượng.
                        </p>
                    </div>
                    <div className="w-full lg:w-1/3">
                        <div className="h-[404px] lg:h-[288px] w-full">
                            <img src={Report} alt="" className="block h-full rounded-sm object-cover" />
                        </div>
                        <p className="text-[20px] font-bold underline mt-[4px]">Báo cáo thống kê &gt;</p>
                        <p className="text-[14px] text-justify mt-[4px]">
                            Tính năng báo cáo thống kê cung cấp cho người dùng cái nhìn tổng quan về việc sử dụng các
                            thiết bị thông minh và môi trường sống của họ. Từ các dữ liệu thu thập được về tiêu thụ
                            điện, nước, hoặc các thông số như nhiệt độ, độ ẩm, người dùng có thể phân tích và đánh giá
                            hiệu suất sử dụng, từ đó tối ưu hóa các thiết lập để tiết kiệm năng lượng và tạo ra môi
                            trường sống tốt hơn.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
