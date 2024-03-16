import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Settings from '../pages/Settings';
import Notification from '../pages/Notification';
import Report from '../pages/Report';
import Login from '../pages/Login';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '', component: Home },
];

const authRoutes = [{ path: '/login', component: Login }];
const privateRoutes = [
    { path: '/dashboard', component: Dashboard },
    { path: '/settings', component: Settings },
    { path: '/notification', component: Notification },
    { path: '/report', component: Report },
];

export { publicRoutes, privateRoutes, authRoutes };
