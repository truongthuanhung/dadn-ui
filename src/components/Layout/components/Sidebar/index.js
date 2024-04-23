import { HomeIcon, DashboardIcon, SettingsIcon, NotifyIcon, ChartIcon, HistoryIcon } from '../../../Icons/Icons';
import { Link } from 'react-router-dom';
import SidebarItem from './SidebarItem';
import './Sidebar.scss';
import { useAuth } from '../../../../contexts/useAuth';
import { useNotify } from '../../../../contexts/useNotify';
function Sidebar({ sidebarVisible, hideSidebar }) {
    const authContext = useAuth();
    const notifyContext = useNotify();
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
                <div className="relative">
                    <SidebarItem content="Thông báo" Icon={NotifyIcon} />
                    {notifyContext.countNewNotification > 0 ? (
                        <div className="absolute text-[12] lg:text-[14px] top-[-2px] right-0 rounded-[50%] w-[22px] h-[22px] text-white bg-red-600 flex items-center justify-center">
                            {notifyContext.countNewNotification}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </Link>
            <Link to={authContext.auth ? '/activity' : '/login'} onClick={() => hideSidebar()}>
                <SidebarItem content="Hoạt động" Icon={HistoryIcon} />
            </Link>
            <Link to={authContext.auth ? '/report' : '/login'} onClick={() => hideSidebar()}>
                <SidebarItem content="Báo cáo" Icon={ChartIcon} />
            </Link>
        </div>
    );
}

export default Sidebar;
