import Image404 from '../../assets/404.png';
import { LeftArrowIcon } from '../../components/Icons/Icons';
import { Link } from 'react-router-dom';
function Page404() {
    return (
        <div className="mt-[65px] md:ml-[70px] min-h-[600px]">
            <div className="flex flex-col md:flex-row lg:gap-[50px] gap-[24px] py-[50px]">
                <div className="w-full md:w-2/5 lg:pl-[60px] pl-[20px] md:pr-0 pr-[20px]">
                    <p className="font-bold md:text-[36px] text-[28px]">Ooops...</p>
                    <p className="font-semibold md:text-[36px] text-[28px]">404 Page Not Found</p>
                    <p className="md:mt-[28px] mt-[10px] text-justify">
                        We're sorry, the page use requested could not be found. Please go back to the homepage.
                    </p>
                    <Link to="/">
                        <button className="px-[20px] py-[12px] flex items-center gap-[20px] mt-[28px] lg:w-[214px] h-[45px] w-3/5 md:w-full bg-[#2396EF] rounded-[10px] font-semibold text-[14px]">
                            <LeftArrowIcon />
                            <span>Trở về trang chủ</span>
                        </button>
                    </Link>
                </div>
                <div className="w-full md:w-3/5">
                    <img src={Image404} alt="" className="block w-full object-cover" />
                </div>
            </div>
        </div>
    );
}

export default Page404;
