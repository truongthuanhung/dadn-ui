import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Settings from "../pages/Settings";
import Notification from "../pages/Notification";
import Report from "../pages/Report";
const publicRoutes = [
    { path: '/', component: Home},
    { path: '/dashboard', component: Dashboard},
    { path: '/settings', component: Settings},
    { path: '/notification', component: Notification},
    { path: '/report', component: Report}
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
