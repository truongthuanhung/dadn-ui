import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllNotifications } from '../../services/notificationAPI';
import { useAuth } from '../useAuth';
const NotifyContext = createContext();

export const useNotify = () => {
    return useContext(NotifyContext);
};

export const NotifyProvider = ({ children }) => {
    const [notification, setNotification] = useState([]);
    const [countNewNotification, setCountNewNotification] = useState(0);
    const [renderNotify, setRenderNotify] = useState(false);
    const authContext = useAuth();
    const reRender = () => {
        setRenderNotify(!renderNotify);
    };
    const value = {
        notification,
        countNewNotification,
        setNotification,
        setCountNewNotification,
        renderNotify,
        reRender,
    };
    useEffect(() => {
        let intervalId = null;
        if (authContext.auth) {
            const fetchData = async () => {
                try {
                    const response = await getAllNotifications();
                    setNotification(response.data.reverse());
                    setCountNewNotification(response.data.filter((obj) => obj.flag === false).length);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();
            intervalId = setInterval(fetchData, 5000);
            return () => clearInterval(intervalId);
        } else {
            if (intervalId != null) {
                return () => clearInterval(intervalId);
            }
        }
        // eslint-disable-next-line
    }, [authContext.auth]);
    return <NotifyContext.Provider value={value}>{children}</NotifyContext.Provider>;
};
