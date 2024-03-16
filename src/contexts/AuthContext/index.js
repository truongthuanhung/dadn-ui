import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const setLogin = () => {
        setIsLogin(true);
    };
    const setLogout = () => {
        setIsLogin(false);
    };
    const value = { isLogin, setLogin, setLogout };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
