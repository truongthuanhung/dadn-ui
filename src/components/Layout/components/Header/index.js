import { Link } from 'react-router-dom';
import { MenuIcon, UserIcon, LogoutIcon, SettingsIconWhite } from '../../../Icons/Icons';
import mainIcon from '../../../../assets/main.png';
import Tippy from '@tippyjs/react';
import Landing from '../../../../assets/landing.jpg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../contexts/useAuth';
import { useProfile } from '../../../../contexts/useProfile';
function Header({ toggleSidebar }) {
    const navigate = useNavigate();
    const authContext = useAuth();
    const profileContext = useProfile();
    const handleLogout = () => {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('username');
        profileContext.setUserInfo({ id: null, username: null, name: null });
        authContext.setLoggedOut();
        navigate('/');
    };
    return (
        <div className="Header h-[65px] z-30 bg-[#f2f2f2] flex items-center pl-[34px] md:pr-[44px] pr-[24px] justify-between fixed top-0 left-0 right-0">
            <div className="cursor-pointer" onClick={toggleSidebar}>
                <MenuIcon />
            </div>
            <div className="absolute right-1/2 translate-x-1/2 top-0">
                <img src={mainIcon} alt="" />
            </div>
            <div className="flex md:gap-[54px] gap-[8px] font-semibold">
                {authContext.auth ? (
                    <Tippy
                        animation={false}
                        interactive
                        delay={[0, 700]}
                        offset={[0, 12]}
                        hideOnClick={true}
                        placement="bottom-end"
                        render={(attrs) => (
                            <div
                                className="bg-[#1e1e1e] w-[256px] py-[8px] text-white rounded-[4px] z-50"
                                tabIndex="-1"
                                {...attrs}
                            >
                                <div className="px-[10px] py-[16px] flex flex-col items-center justify-between">
                                    <img src={Landing} alt="" className="block w-[48px] h-[48px] rounded-[50%]" />
                                    <p className="text-[12px] mt-[8px]">{profileContext.profile.name}</p>
                                    <p className="text-[10px] opacity-60">{profileContext.profile.username}</p>
                                </div>
                                <div>
                                    <Link to="/profile">
                                        <div className="cursor-pointer px-[20px] h-[36px] flex items-center gap-[12px] hover:bg-[#0d9fff]">
                                            <UserIcon />
                                            <p className="text-[12px]">Quản lý tài khoản</p>
                                        </div>
                                    </Link>
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
                        <p className="ml-auto cursor-pointer">{profileContext.profile.name}</p>
                    </Tippy>
                ) : (
                    <>
                        <Link to="/login">
                            <p>Đăng nhập</p>
                        </Link>
                        <Link to="/login" state={{ tab: 'register' }} className="hidden md:block">
                            <p>Đăng ký</p>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;
