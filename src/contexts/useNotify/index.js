import React, { createContext, useContext, useState } from 'react';

const NotifyContext = createContext();

export const useNotify = () => {
    return useContext(NotifyContext);
};

export const NotifyProvider = ({ children }) => {
    const [notification, setNotification] = useState([]);
    const [countNewNotification, setCountNewNotification] = useState(0);
    const [renderNotify, setRenderNotify] = useState(false);
    const reRender = () => {
        setRenderNotify(!renderNotify);
    };
    const value = { notification, countNewNotification, setNotification, setCountNewNotification, renderNotify, reRender };

    return <NotifyContext.Provider value={value}>{children}</NotifyContext.Provider>;
};
