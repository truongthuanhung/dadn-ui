import { Link } from 'react-router-dom';
import { MenuIcon } from '../../../Icons/Icons';
import mainIcon from '../../../../assets/main.png';
import { useAuth } from '../../../../contexts/AuthContext';
function Header({ toggleSidebar }) {
    const authContext = useAuth();
    const isLogin = authContext.isLogin;
    return (
        <div className="Header z-50 h-[65px] bg-[#f2f2f2] flex items-center pl-[34px] pr-[44px]  justify-between fixed top-0 left-0 right-0">
            <div className="cursor-pointer" onClick={toggleSidebar}>
                <MenuIcon />
            </div>
            <div className="mr-auto ml-auto">
                <img src={mainIcon} alt="" />
            </div>
            <div className="hidden md:flex md:gap-[54px] gap-[8px] font-bold">
                {isLogin ? (
                    <p>Admin</p>
                ) : (
                    <>
                        <Link to="/login">
                            <p>Đăng nhập</p>
                        </Link>
                        <p>Đăng ký</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;
