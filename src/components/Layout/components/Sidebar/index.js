import { HomeIcon, DashboardIcon, SettingsIcon, NotifyIcon, ChartIcon } from '../../../Icons/Icons';
import { Link } from 'react-router-dom';
import SidebarItem from './SidebarItem';
import './Sidebar.scss';
import { useAuth } from '../../../../contexts/useAuth';
function Sidebar({ sidebarVisible, hideSidebar }) {
    const authContext = useAuth();
    return (
        <div
            className={`Sidebar z-40 bg-[#f2f2f2] fixed top-[65px] left-0 w-full md:w-[250px] h-[100vh] pt-[85px] px-[14px]${
                sidebarVisible ? '' : ' SidebarHide'
            }`}
        >
            <Link to="/" onClick={() => hideSidebar()}>
                <SidebarItem content="Trang chủ" Icon={HomeIcon} />
            </Link>
            <Link to={authContext.auth ? '/dashboard' : '/login'} onClick={() => hideSidebar()}>
                <SidebarItem content="Bảng điều khiển" Icon={DashboardIcon} />
            </Link>
            <Link to={authContext.auth ? '/settings' : '/login'} onClick={() => hideSidebar()}>
                <SidebarItem content="Cài đặt" Icon={SettingsIcon} />
            </Link>
            <Link to={authContext.auth ? '/notification' : '/login'} onClick={() => hideSidebar()}>
                <SidebarItem content="Thông báo" Icon={NotifyIcon} />
            </Link>
            <Link to={authContext.auth ? '/report' : '/login'} onClick={() => hideSidebar()}>
                <SidebarItem content="Báo cáo" Icon={ChartIcon} />
            </Link>
        </div>
    );
}

export default Sidebar;
