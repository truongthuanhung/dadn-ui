import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import SensorItem from './SensorItem';
import DeviceItem from './DeviceItem';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
        // eslint-disable-next-line
    }, [value]);
    return debounceValue;
}
const cx = classNames.bind(styles);
function Dashboard() {
    const navigate = useNavigate();
    const authContext = useAuth();
    useEffect(() => {
        if (!authContext.auth) {
            navigate('/login');
        }
    }, [navigate, authContext.auth]);

    //LIGHT 1
    const [statusLight1, setStatusLight1] = useState(false);
    const [mode1, setMode1] = useState('automatic');
    const [loading, setLoading] = useState(false);
    const [renderLight1, setRenderLight1] = useState(true);

    const handleChangeStatusLight1 = (data) => {
        if (loading) return;
        setLoading(true);

        fetch('https://io.adafruit.com/api/v2/hungtruongthuan/feeds/light-1/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AIO-Key': 'aio_CCzb25m8k33R9FxcSQiieWKsEtYb',
            },
            body: JSON.stringify({ value: data }),
        })
            .then((response) => response.json())
            .then((data) => {
                //console.log(data);
                setLoading(false);
                setRenderLight1(!renderLight1);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    };
    //LIGHT 2
    const [statusLight2, setStatusLight2] = useState(false);
    const [mode2, setMode2] = useState('automatic');
    const [renderLight2, setRenderLight2] = useState(true);

    const handleChangeStatusLight2 = (data) => {
        if (loading) return;
        setLoading(true);

        fetch('https://io.adafruit.com/api/v2/hungtruongthuan/feeds/light-2/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AIO-Key': 'aio_CCzb25m8k33R9FxcSQiieWKsEtYb',
            },
            body: JSON.stringify({ value: data }),
        })
            .then((response) => response.json())
            .then((data) => {
                //console.log(data);
                setLoading(false);
                setRenderLight2(!renderLight2);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        setLoading(true);
        fetch('https://io.adafruit.com/api/v2/hungtruongthuan/feeds/light-2/data/last', {
            headers: {
                'X-AIO-Key': 'aio_CCzb25m8k33R9FxcSQiieWKsEtYb',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setStatusLight2(data.value);
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [renderLight2]);

    //LIGHT 3
    const [statusLight3, setStatusLight3] = useState(false);
    const [mode3, setMode3] = useState('automatic');
    const [renderLight3, setRenderLight3] = useState(true);

    const handleChangeStatusLight3 = (data) => {
        if (loading) return;
        setLoading(true);

        fetch('https://io.adafruit.com/api/v2/hungtruongthuan/feeds/light-3/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AIO-Key': 'aio_CCzb25m8k33R9FxcSQiieWKsEtYb',
            },
            body: JSON.stringify({ value: data }),
        })
            .then((response) => response.json())
            .then((data) => {
                //console.log(data);
                setLoading(false);
                setRenderLight3(!renderLight3);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        setLoading(true);
        fetch('https://io.adafruit.com/api/v2/hungtruongthuan/feeds/light-3/data/last', {
            headers: {
                'X-AIO-Key': 'aio_CCzb25m8k33R9FxcSQiieWKsEtYb',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setStatusLight3(data.value);
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [renderLight3]);

    //LIGHT 4
    const [statusLight4, setStatusLight4] = useState(false);
    const [mode4, setMode4] = useState('automatic');
    const [renderLight4, setRenderLight4] = useState(true);

    const handleChangeStatusLight4 = (data) => {
        if (loading) return;
        setLoading(true);

        fetch('https://io.adafruit.com/api/v2/hungtruongthuan/feeds/light-4/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AIO-Key': 'aio_CCzb25m8k33R9FxcSQiieWKsEtYb',
            },
            body: JSON.stringify({ value: data }),
        })
            .then((response) => response.json())
            .then((data) => {
                //console.log(data);
                setLoading(false);
                setRenderLight4(!renderLight4);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        setLoading(true);
        fetch('https://io.adafruit.com/api/v2/hungtruongthuan/feeds/light-4/data/last', {
            headers: {
                'X-AIO-Key': 'aio_CCzb25m8k33R9FxcSQiieWKsEtYb',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setStatusLight4(data.value);
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [renderLight4]);
    //FAN

    const [fanSpeed, setFanSpeed] = useState('');
    const [renderFan, setRenderFan] = useState(true);
    const [modeFan, setModeFan] = useState('automatic');
    const debounced = useDebounce(fanSpeed, 2000);
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (loading || debounced === '') {
            console.log('Please wait........');
        } else if (isFirstRender.current) {
            isFirstRender.current = false;
            console.log('First render not call.........')
        } else {
            setLoading(true);
            fetch('https://io.adafruit.com/api/v2/hungtruongthuan/feeds/fan/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-AIO-Key': 'aio_CCzb25m8k33R9FxcSQiieWKsEtYb',
                },
                body: JSON.stringify({ value: fanSpeed }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setLoading(false);
                    setRenderFan(!renderFan);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setLoading(false);
                });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);
    useEffect(() => {
        setLoading(true);
        fetch('https://io.adafruit.com/api/v2/hungtruongthuan/feeds/light-1/data/last', {
            headers: {
                'X-AIO-Key': 'aio_CCzb25m8k33R9FxcSQiieWKsEtYb',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setStatusLight1(data.value);
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [renderLight1]);

    useEffect(() => {
        setLoading(true);
        fetch('https://io.adafruit.com/api/v2/hungtruongthuan/feeds/fan/data/last', {
            headers: {
                'X-AIO-Key': 'aio_CCzb25m8k33R9FxcSQiieWKsEtYb',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setFanSpeed(Number(data.value));
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [renderFan]);

    return (
        <div
            className={cx(
                'Dashboard',
                'mt-[65px] md:ml-[70px] lg:px-[75px] md:px-[40px] px-[16px] py-[24px] min-h-[100vh] relative overflow-hidden',
            )}
        >
            <>
                <p className={cx('text-[28px] font-bold mb-[28px]')}>Bảng điều khiển</p>
                <div>
                    <p className={cx('text-[20px] font-bold mb-[28px]')}>Living Room</p>
                    <div className="flex flex-col md:flex-row flex-wrap mb-[28px]">
                        <div className="w-full md:w-1/2 lg:w-1/3 lg:pb-[28px] pb-[18px] flex items-center justify-center md:justify-start">
                            <SensorItem
                                sensorType="Lighting"
                                sensorValue={171.1}
                                sensorUnit="W/m2"
                                upperThreshold={200}
                                lowerThreshold={100}
                            />
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 lg:pb-[28px] pb-[18px] flex items-center justify-center md:justify-start">
                            <SensorItem
                                sensorType="Humidity"
                                sensorValue={37.32}
                                sensorUnit="%"
                                upperThreshold={100}
                                lowerThreshold={50}
                            />
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 lg:pb-[28px] pb-[18px] flex items-center justify-center md:justify-start">
                            <SensorItem
                                sensorType="Temperature"
                                sensorValue={32}
                                sensorUnit="°C"
                                upperThreshold={36}
                                lowerThreshold={14}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row flex-wrap mb-[28px] md:gap-[28px] gap-[10px]">
                        <DeviceItem
                            deviceType="light"
                            deviceName="Light 1"
                            deviceStatus={statusLight1}
                            deviceMode={mode1}
                            changeDeviceMode={() => setMode1(mode1 === 'automatic' ? 'manual' : 'automatic')}
                            toggleDeviceStatus={() => handleChangeStatusLight1(statusLight1 === '1' ? '0' : '1')}
                        />
                        <DeviceItem
                            deviceType="light"
                            deviceName="Light 2"
                            deviceStatus={statusLight2}
                            deviceMode={mode2}
                            changeDeviceMode={() => setMode2(mode2 === 'automatic' ? 'manual' : 'automatic')}
                            toggleDeviceStatus={() => handleChangeStatusLight2(statusLight2 === '1' ? '0' : '1')}
                        />
                        <DeviceItem
                            deviceType="light"
                            deviceName="Light 3"
                            deviceStatus={statusLight3}
                            deviceMode={mode3}
                            changeDeviceMode={() => setMode3(mode3 === 'automatic' ? 'manual' : 'automatic')}
                            toggleDeviceStatus={() => handleChangeStatusLight3(statusLight3 === '1' ? '0' : '1')}
                        />
                        <DeviceItem
                            deviceType="light"
                            deviceName="Light 4"
                            deviceStatus={statusLight4}
                            deviceMode={mode4}
                            changeDeviceMode={() => setMode4(mode4 === 'automatic' ? 'manual' : 'automatic')}
                            toggleDeviceStatus={() => handleChangeStatusLight4(statusLight4 === '1' ? '0' : '1')}
                        />
                        <DeviceItem
                            deviceType="fan"
                            deviceName="Fan"
                            fanSpeed={fanSpeed}
                            deviceMode={modeFan}
                            changeDeviceMode={() => setModeFan(modeFan === 'automatic' ? 'manual' : 'automatic')}
                            setFanSpeed={(e) => setFanSpeed(Number(e.target.value))}
                        />
                    </div>
                </div>
            </>
        </div>
    );
}

export default Dashboard;
