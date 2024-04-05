import React, { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export const useProfile = () => {
    return useContext(ProfileContext);
};

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState({
        id: sessionStorage.getItem('id') ?? null,
        username: sessionStorage.getItem('username') ?? null,
        name: sessionStorage.getItem('name') ?? null,
    });

    const setUserInfo = (data) => {
        setProfile(data);
    };

    const value = { profile, setUserInfo };

    return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};
