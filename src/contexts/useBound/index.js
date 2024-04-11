import React, { createContext, useContext, useState } from 'react';

const BoundContext = createContext();

export const useBound = () => {
    return useContext(BoundContext);
};

export const BoundProvider = ({ children }) => {
    const [boundHumid, setBoundHumid] = useState({ high: 0, low: 0 });
    const [boundTemp, setBoundTemp] = useState({ high: 0, low: 0 });
    const [boundLighting, setLighting] = useState({ high: 0, low: 0 });
    const [renderBound, setRenderBound] = useState(false);
    const reRender = () => {
        setRenderBound(!renderBound);
    };
    const value = {
        boundHumid,
        boundTemp,
        boundLighting,
        setBoundHumid,
        setBoundTemp,
        setLighting,
        renderBound,
        reRender,
    };

    return <BoundContext.Provider value={value}>{children}</BoundContext.Provider>;
};
