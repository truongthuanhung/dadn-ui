import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes, unknownRoutes } from './routes';
import DefaultLayout from './components/Layout/DefaultLayout';
import { useAuth } from './contexts/useAuth';
import { getAllNotifications } from './services/notificationAPI';
import React, { useEffect } from 'react';
import { useNotify } from './contexts/useNotify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
    const notifyContext = useNotify();
    const authContext = useAuth();
    useEffect(() => {
        let intervalId = null;
        if (authContext.auth) {
            const fetchData = async () => {
                try {
                    const response = await getAllNotifications();
                    notifyContext.setNotification(response.data.reverse());
                    notifyContext.setCountNewNotification(response.data.filter((obj) => obj.flag === false).length);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();
            intervalId = setInterval(fetchData, 3000);
            return () => clearInterval(intervalId);
        } else {
            if (intervalId != null) {
                return () => clearInterval(intervalId);
            }
        }
        // eslint-disable-next-line
    }, [notifyContext.renderNotify, authContext.auth]);
    const renderRoutes = authContext.auth
        ? [...publicRoutes, ...privateRoutes, ...unknownRoutes]
        : [...publicRoutes, ...unknownRoutes];
    return (
        <Router>
            <div className="App">
                <Routes>
                    {renderRoutes.map((route, index) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <DefaultLayout>
                                        <Page />
                                    </DefaultLayout>
                                }
                            ></Route>
                        );
                    })}
                </Routes>
                <ToastContainer autoClose={2500} />
            </div>
        </Router>
    );
}

export default App;
