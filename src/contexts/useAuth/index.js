import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(sessionStorage.getItem('isLoggedIn') ? true : false);

    const setLoggedIn = () => {
        setAuth(true);
    };
    const setLoggedOut = () => {
        setAuth(false);
    };

    const value = { auth, setLoggedIn, setLoggedOut };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
