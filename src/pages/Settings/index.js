import SensorSettingsItem from './SensorSettingsItem';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import { useBound } from '../../contexts/useBound';
import { getBound, changeBound } from '../../services/boundAPI';
function Settings() {
    const navigate = useNavigate();
    const authContext = useAuth();

    const boundContext = useBound();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await Promise.all([
                    getBound({ name: 'humidity-sensor' }),
                    getBound({ name: 'temp-sensor' }),
                    getBound({ name: 'lighting-sensor' }),
                ]);
                boundContext.setBoundHumid(res[0].data);
                boundContext.setBoundTemp(res[1].data);
                boundContext.setLighting(res[2].data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
        // eslint-disable-next-line
    }, [boundContext.renderBound]);
    useEffect(() => {
        if (!authContext.auth) {
            navigate('/login');
        }
    }, [authContext.auth, navigate]);
    const handleTempSensorSave = async () => {
        await changeBound({ name: 'temp-sensor', low: boundContext.boundTemp.low, high: boundContext.boundTemp.high });
        boundContext.reRender();
    };
    const handleHumidSensorSave = async () => {
        await changeBound({
            name: 'humidity-sensor',
            low: boundContext.boundHumid.low,
            high: boundContext.boundHumid.high,
        });
        boundContext.reRender();
    };
    const handleLightSensorSave = async () => {
        await changeBound({
            name: 'lighting-sensor',
            low: boundContext.boundLighting.low,
            high: boundContext.boundLighting.high,
        });
        boundContext.reRender();
    };
    const handleCancel = () => {
        boundContext.reRender();
    };

    return (
        <div className="mt-[65px] md:ml-[70px] lg:px-[75px] lg:pr-0 md:px-[40px] px-[16px] py-[24px]">
            <p className="text-[28px] font-bold mb-[28px]">Cài đặt</p>
            <div className="flex flex-col md:flex-row flex-wrap">
                <div className="w-full md:w-1/2 lg:pb-[28px] pb-[18px] flex items-center justify-center md:justify-start">
                    <SensorSettingsItem
                        sensorType="temperature"
                        low={boundContext.boundTemp.low}
                        high={boundContext.boundTemp.high}
                        onSave={handleTempSensorSave}
                        onChange={(newData) => boundContext.setBoundTemp(newData)}
                        onCancel={handleCancel}
                    />
                </div>
                <div className="w-full md:w-1/2 lg:pb-[28px] pb-[18px] flex items-center justify-center md:justify-start">
                    <SensorSettingsItem
                        sensorType="humidity"
                        low={boundContext.boundHumid.low}
                        high={boundContext.boundHumid.high}
                        onSave={handleHumidSensorSave}
                        onChange={(newData) => boundContext.setBoundHumid(newData)}
                        onCancel={handleCancel}
                    />
                </div>
                <div className="w-full md:w-1/2 lg:pb-[28px] pb-[18px] flex items-center justify-center md:justify-start">
                    <SensorSettingsItem
                        sensorType="lighting"
                        low={boundContext.boundLighting.low}
                        high={boundContext.boundLighting.high}
                        onSave={handleLightSensorSave}
                        onChange={(newData) => boundContext.setLighting(newData)}
                        onCancel={handleCancel}
                    />
                </div>
            </div>
        </div>
    );
}

export default Settings;
