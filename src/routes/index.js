import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Settings from '../pages/Settings';
import Notification from '../pages/Notification';
import Report from '../pages/Report';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Page404 from '../pages/404';
import ActivityLog from '../pages/ActivityLog';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '', component: Home },
    { path: '/dadn-ui', component: Home },
    { path: '/login', component: Login },
];
const unknownRoutes = [{ path: '*', component: Page404 }];
const privateRoutes = [
    { path: '/dashboard', component: Dashboard },
    { path: '/settings', component: Settings },
    { path: '/notification', component: Notification },
    { path: '/report', component: Report },
    { path: '/profile', component: Profile },
    { path: '/activity', component: ActivityLog },
];

export { publicRoutes, privateRoutes, unknownRoutes };
