import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes, unknownRoutes } from './routes';
import DefaultLayout from './components/Layout/DefaultLayout';
import { useAuth } from './contexts/useAuth';
import { getAllNotifications } from './services/notificationAPI';
import React, { useEffect } from 'react';
import { useNotify } from './contexts/useNotify';
function App() {
    const notifyContext = useNotify();
    useEffect(() => {
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
        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
        // eslint-disable-next-line
    }, [notifyContext.renderNotify]);
    const authContext = useAuth();
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
            </div>
        </Router>
    );
}

export default App;
