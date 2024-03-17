import { Link } from 'react-router-dom';
import { MenuIcon, UserIcon, LogoutIcon, SettingsIconWhite } from '../../../Icons/Icons';
import mainIcon from '../../../../assets/main.png';
import Tippy from '@tippyjs/react';
import Landing from '../../../../assets/landing.jpg';
import { useNavigate } from 'react-router-dom';
function Header({ toggleSidebar }) {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem('isLoggedIn');
        navigate('/');
    };
    return (
        <div className="Header h-[65px] z-30 bg-[#f2f2f2] flex items-center pl-[34px] pr-[44px]  justify-between fixed top-0 left-0 right-0">
            <div className="cursor-pointer" onClick={toggleSidebar}>
                <MenuIcon />
            </div>
            <div className="mr-auto ml-auto">
                <img src={mainIcon} alt="" />
            </div>
            <div className="flex md:gap-[54px] gap-[8px] font-semibold">
                {isLoggedIn ? (
                    <Tippy
                        animation={false}
                        interactive
                        delay={[0, 700]}
                        offset={[0, 12]}
                        hideOnClick={true}
                        placement="bottom-end"
                        render={(attrs) => (
                            <div
                                className="bg-[#1e1e1e] w-[256px] py-[8px] text-white rounded-[4px]"
                                tabIndex="-1"
                                {...attrs}
                            >
                                <div className="px-[10px] py-[16px] flex flex-col items-center justify-between">
                                    <img src={Landing} alt="" className="block w-[48px] h-[48px] rounded-[50%]" />
                                    <p className="text-[12px] mt-[8px]">Trương Thuận Hưng</p>
                                    <p className="text-[10px] opacity-60">hung.truongthuan@hcmut.edu.vn</p>
                                </div>
                                <div>
                                    <div className="cursor-pointer px-[20px] h-[36px] flex items-center gap-[12px] hover:bg-[#0d9fff]">
                                        <UserIcon />
                                        <p className="text-[12px]">Quản lý tài khoản</p>
                                    </div>
                                    <div className="cursor-pointer px-[20px] h-[36px] flex items-center gap-[12px] hover:bg-[#0d9fff]">
                                        <SettingsIconWhite />
                                        <p className="text-[12px]">Cài đặt</p>
                                    </div>
                                    <div
                                        onClick={handleLogout}
                                        className="cursor-pointer px-[20px] h-[36px] flex items-center gap-[12px] hover:bg-[#0d9fff]"
                                    >
                                        <LogoutIcon />
                                        <p className="text-[12px]">Đăng xuất</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    >
                        <p className="ml-auto cursor-pointer">Admin</p>
                    </Tippy>
                ) : (
                    <>
                        <Link to="/login">
                            <p>Đăng nhập</p>
                        </Link>
                        <Link to="/login" className="hidden md:block">
                            <p>Đăng ký</p>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;
