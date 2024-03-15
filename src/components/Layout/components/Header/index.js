import { MenuIcon } from '../../../Icons/Icons';
import mainIcon from '../../../../assets/main.png';
function Header({ toggleSidebar }) {
    return (
        <div className="Header z-50 h-[65px] bg-[#f2f2f2] flex items-center pl-[34px] pr-[44px]  justify-between fixed top-0 left-0 right-0">
            <div className="cursor-pointer" onClick={toggleSidebar}>
                <MenuIcon />
            </div>
            <div className="mr-auto ml-auto">
                <img src={mainIcon} alt="" />
            </div>
            <div className="hidden md:flex md:gap-[54px] gap-[8px] font-bold">
                <p>Đăng nhập</p>
                <p>Đăng ký</p>
            </div>
        </div>
    );
}

export default Header;
