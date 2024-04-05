import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import SensorItem from './SensorItem';
import DeviceItem from './DeviceItem';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import { getDeviceStatus, postDeviceStatus } from '../../services/deviceService';
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
    //SENSOR
    const [temp, setTemp] = useState(0);
    const [light, setLight] = useState(0);
    const [humid, setHumid] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Gọi 3 API cùng một lúc bằng Axios
                const [temperatureResponse, humidityResponse, lightResponse] = await Promise.all([
                    getDeviceStatus('feeds/temp-sensor/data/last'),
                    getDeviceStatus('feeds/humidity-sensor/data/last'),
                    getDeviceStatus('feeds/lighting-sensor/data/last'),
                ]);

                // Lấy dữ liệu từ các API
                console.log(Number(temperatureResponse.data.value));

                // Lưu trữ dữ liệu vào state
                setTemp(Number(temperatureResponse.data.value));
                setHumid(Number(humidityResponse.data.value));
                setLight(Number(lightResponse.data.value));
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        // Gọi API lần đầu tiên khi component được mount
        fetchData();

        // Thiết lập interval để gọi API sau mỗi 30 giây
        const intervalId = setInterval(fetchData, 10000);

        // Cleanup để tránh memory leaks
        return () => clearInterval(intervalId);
    }, []);
    const navigate = useNavigate();
    const authContext = useAuth();
    useEffect(() => {
        if (!authContext.auth) {
            navigate('/login');
        }
    }, [navigate, authContext.auth]);

    //LIGHT 1
    const [statusLight1, setStatusLight1] = useState(false);
    const [mode1, setMode1] = useState('manual');
    const [loading, setLoading] = useState(false);
    //const [renderLight1, setRenderLight1] = useState(true);

    const handleChangeStatusLight1 = (data) => {
        if (loading) return;
        setLoading(true);
        try {
            const callAPI = async () => {
                await postDeviceStatus('feeds/light-1/data', { value: data });
                setLoading(false);
                //setRenderLight1(!renderLight1);
                setStatusLight1(statusLight1 === '1' ? '0' : '1');
            };
            callAPI();
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    //LIGHT 2
    const [statusLight2, setStatusLight2] = useState(false);
    const [mode2, setMode2] = useState('manual');
    //const [renderLight2, setRenderLight2] = useState(true);

    const handleChangeStatusLight2 = (data) => {
        if (loading) return;
        setLoading(true);
        try {
            const callAPI = async () => {
                await postDeviceStatus('feeds/light-2/data', { value: data });
                setLoading(false);
                //setRenderLight2(!renderLight2);
                setStatusLight2(statusLight2 === '1' ? '0' : '1');
            };
            callAPI();
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        try {
            const callAPI = async () => {
                const response = await getDeviceStatus('feeds/light-2/data/last');
                //console.log(response);
                setStatusLight2(response.data.value);
                setLoading(false);
            };
            callAPI();
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //LIGHT 3
    const [statusLight3, setStatusLight3] = useState(false);
    const [mode3, setMode3] = useState('manual');
    //const [renderLight3, setRenderLight3] = useState(true);

    const handleChangeStatusLight3 = (data) => {
        if (loading) return;
        setLoading(true);
        try {
            const callAPI = async () => {
                await postDeviceStatus('feeds/light-3/data', { value: data });
                setLoading(false);
                //setRenderLight3(!renderLight3);
                setStatusLight3(statusLight3 === '1' ? '0' : '1');
            };
            callAPI();
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        try {
            const callAPI = async () => {
                const response = await getDeviceStatus('feeds/light-3/data/last');
                setStatusLight3(response.data.value);
                setLoading(false);
            };
            callAPI();
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //LIGHT 4
    const [statusLight4, setStatusLight4] = useState(false);
    const [mode4, setMode4] = useState('manual');
    //const [renderLight4, setRenderLight4] = useState(true);

    const handleChangeStatusLight4 = (data) => {
        if (loading) return;
        setLoading(true);
        try {
            const callAPI = async () => {
                await postDeviceStatus('feeds/light-4/data', { value: data });
                setLoading(false);
                //setRenderLight4(!renderLight4);
                setStatusLight4(statusLight4 === '1' ? '0' : '1');
            };
            callAPI();
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        try {
            const callAPI = async () => {
                const response = await getDeviceStatus('feeds/light-4/data/last');
                setStatusLight4(response.data.value);
                setLoading(false);
            };
            callAPI();
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //FAN
    const [fanSpeed, setFanSpeed] = useState('');
    const [renderFan, setRenderFan] = useState(true);
    const [modeFan, setModeFan] = useState('manual');
    const debounced = useDebounce(fanSpeed, 1500);
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (loading || debounced === '') {
            console.log('Please wait........');
        } else if (isFirstRender.current) {
            isFirstRender.current = false;
            console.log('First render not call.........');
        } else {
            setLoading(true);
            try {
                const callAPI = async () => {
                    console.log(fanSpeed);
                    await postDeviceStatus('feeds/fan/data', { value: fanSpeed });
                    setLoading(false);
                    setRenderFan(!renderFan);
                };
                callAPI();
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);
    useEffect(() => {
        setLoading(true);
        try {
            const callAPI = async () => {
                const response = await getDeviceStatus('feeds/light-1/data/last');
                setStatusLight1(response.data.value);
                setLoading(false);
            };
            callAPI();
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setLoading(true);
        try {
            const callAPI = async () => {
                const response = await getDeviceStatus('feeds/fan/data/last');
                // console.log(response.data.value);
                setFanSpeed(Number(response.data.value));
                setLoading(false);
            };
            callAPI();
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
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
                                sensorValue={light}
                                sensorUnit="%"
                                upperThreshold={100}
                                lowerThreshold={0}
                            />
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 lg:pb-[28px] pb-[18px] flex items-center justify-center md:justify-start">
                            <SensorItem
                                sensorType="Humidity"
                                sensorValue={humid}
                                sensorUnit="%"
                                upperThreshold={100}
                                lowerThreshold={50}
                            />
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 lg:pb-[28px] pb-[18px] flex items-center justify-center md:justify-start">
                            <SensorItem
                                sensorType="Temperature"
                                sensorValue={temp}
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
                            fanSpeed={fanSpeed === '' ? 0 : fanSpeed}
                            deviceMode={modeFan}
                            changeDeviceMode={() => {
                                if (loading) return;
                                setModeFan(modeFan === 'automatic' ? 'manual' : 'automatic');
                            }}
                            setFanSpeed={(e) => setFanSpeed(Number(e.target.value))}
                        />
                    </div>
                </div>
            </>
        </div>
    );
}

export default Dashboard;
