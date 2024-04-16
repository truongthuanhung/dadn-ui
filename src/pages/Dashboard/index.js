import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import SensorItem from './SensorItem';
import DeviceItem from './DeviceItem';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import { getDeviceStatus, postDeviceStatus } from '../../services/deviceService';
import { MicIcon } from '../../components/Icons/Icons';
import SpeechModal from '../../components/Modals/SpeechModal';
import { useDebounce } from '../../hooks/useDebounce';
import { useBound } from '../../contexts/useBound';
import { getBound } from '../../services/boundAPI';
import useSpeechRecognition from '../../hooks/useSpeechRecognition.ts';
import { handleChangeMode } from '../../utils/handleChangeMode.js';
const cx = classNames.bind(styles);
function Dashboard() {
    const { text, isListening, startListening, stopListening } = useSpeechRecognition();

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

    //SENSOR
    const [temp, setTemp] = useState(0);
    const [light, setLight] = useState(0);
    const [humid, setHumid] = useState(0);

    //MODE
    const changeMode = (light, fan, door) => {
        const sendData = handleChangeMode(light, fan, door);
        try {
            const callAPI = async () => {
                await postDeviceStatus('feeds/mode/data', { value: sendData });
                setLoading(false);
            };
            callAPI();
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [light1, light2, light3, light4, door] = await Promise.all([
                    getDeviceStatus('feeds/light-1/data/last'),
                    getDeviceStatus('feeds/light-2/data/last'),
                    getDeviceStatus('feeds/light-3/data/last'),
                    getDeviceStatus('feeds/light-4/data/last'),
                    getDeviceStatus('feeds/door/data/last'),
                ]);
                setStatusLight1(light1.data.value);
                setStatusLight2(light2.data.value);
                setStatusLight3(light3.data.value);
                setStatusLight4(light4.data.value);
                setStatusDoor(door.data.value);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const mode = await getDeviceStatus('feeds/mode/data/last');
                console.log(mode.data.value);
                if (Number(mode.data.value) === 0) {
                    setModeLight('manual');
                    setModeFan('manual');
                    setModeDoor('manual');
                } else if (Number(mode.data.value) === 1) {
                    setModeLight('automatic');
                    setModeFan('manual');
                    setModeDoor('manual');
                } else if (Number(mode.data.value) === 2) {
                    setModeLight('manual');
                    setModeFan('automatic');
                    setModeDoor('manual');
                } else if (Number(mode.data.value) === 3) {
                    setModeLight('manual');
                    setModeFan('manual');
                    setModeDoor('automatic');
                } else if (Number(mode.data.value) === 4) {
                    setModeLight('automatic');
                    setModeFan('automatic');
                    setModeDoor('manual');
                } else if (Number(mode.data.value) === 5) {
                    setModeLight('automatic');
                    setModeFan('manual');
                    setModeDoor('automatic');
                } else if (Number(mode.data.value) === 6) {
                    setModeLight('manual');
                    setModeFan('automatic');
                    setModeDoor('automatic');
                } else if (Number(mode.data.value) === 7) {
                    setModeLight('automatic');
                    setModeFan('automatic');
                    setModeDoor('automatic');
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [temperatureResponse, humidityResponse, lightResponse] = await Promise.all([
                    getDeviceStatus('feeds/temp-sensor/data/last'),
                    getDeviceStatus('feeds/humidity-sensor/data/last'),
                    getDeviceStatus('feeds/lighting-sensor/data/last'),
                ]);
                setTemp(Number(temperatureResponse.data.value));
                setHumid(Number(humidityResponse.data.value));
                setLight(Number(lightResponse.data.value));
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };
        fetchData();
        const intervalId = setInterval(fetchData, 5000);
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
    const [statusLight1, setStatusLight1] = useState('0');
    const [modeLight, setModeLight] = useState('manual');
    const [loading, setLoading] = useState(false);

    const handleChangeStatusLight1 = (data) => {
        if (loading) return;
        setLoading(true);
        try {
            const callAPI = async () => {
                await postDeviceStatus('feeds/light-1/data', { value: data });
                setLoading(false);
                setStatusLight1(statusLight1 === '1' ? '0' : '1');
            };
            callAPI();
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    //LIGHT 2
    const [statusLight2, setStatusLight2] = useState('0');

    const handleChangeStatusLight2 = (data) => {
        if (loading) return;
        setLoading(true);
        try {
            const callAPI = async () => {
                await postDeviceStatus('feeds/light-2/data', { value: data });
                setLoading(false);
                setStatusLight2(statusLight2 === '1' ? '0' : '1');
            };
            callAPI();
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };
    //LIGHT 3
    const [statusLight3, setStatusLight3] = useState('0');

    const handleChangeStatusLight3 = (data) => {
        if (loading) return;
        setLoading(true);
        try {
            const callAPI = async () => {
                await postDeviceStatus('feeds/light-3/data', { value: data });
                setLoading(false);
                setStatusLight3(statusLight3 === '1' ? '0' : '1');
            };
            callAPI();
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    //LIGHT 4
    const [statusLight4, setStatusLight4] = useState('0');

    const handleChangeStatusLight4 = (data) => {
        if (loading) return;
        setLoading(true);
        try {
            const callAPI = async () => {
                await postDeviceStatus('feeds/light-4/data', { value: data });
                setLoading(false);
                setStatusLight4(statusLight4 === '1' ? '0' : '1');
            };
            callAPI();
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    //DOOR
    const [statusDoor, setStatusDoor] = useState('0');
    const [modeDoor, setModeDoor] = useState('manual');
    const handleChangeDoorStatus = (data) => {
        if (loading) return;
        setLoading(true);
        try {
            const callAPI = async () => {
                await postDeviceStatus('feeds/door/data', { value: data });
                setLoading(false);
                setStatusDoor(statusDoor === '1' ? '0' : '1');
            };
            callAPI();
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };
    //FAN
    const [fanSpeed, setFanSpeed] = useState('');
    const [renderFan, setRenderFan] = useState(true);
    const [modeFan, setModeFan] = useState('manual');
    const debounced = useDebounce(fanSpeed, 1500);
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (loading || debounced === '') {
        } else if (isFirstRender.current) {
            isFirstRender.current = false;
        } else {
            setLoading(true);
            try {
                const callAPI = async () => {
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

    const [showModal, setShowModal] = useState(false);
    const handleMicClick = () => {
        setShowModal(true);
        startListening();
    };
    return (
        <div
            className={cx(
                'Dashboard',
                'mt-[65px] md:ml-[70px] lg:px-[75px] md:px-[40px] px-[16px] py-[24px] min-h-[100vh] relative overflow-hidden',
            )}
        >
            <>
                <div className="flex items-center lg:gap-[100px] md:gap-[50px] gap-[20px] mb-[18px]">
                    <p className={cx('text-[28px] font-bold')}>Bảng điều khiển</p>
                    <div className="mic flex items-center justify-center h-[56px] w-[56px] rounded-[50%] bg-[#f1f3f4]">
                        <div className="cursor-pointer" onClick={handleMicClick}>
                            <MicIcon />
                        </div>
                        {showModal && (
                            <SpeechModal
                                content={text}
                                handleClose={() => setShowModal(false)}
                                stopListening={stopListening}
                                setStatusLight1={(data) => setStatusLight1(data)}
                                setStatusLight2={(data) => setStatusLight2(data)}
                                setStatusLight3={(data) => setStatusLight3(data)}
                                setStatusLight4={(data) => setStatusLight4(data)}
                                fanSpeed={fanSpeed}
                                setFanSpeed={(data) => setFanSpeed(data)}
                                listening={isListening}
                            />
                        )}
                    </div>
                </div>
                <div>
                    <p className={cx('text-[20px] font-bold mb-[10px]')}>Living Room</p>
                    <div className="flex flex-col md:flex-row flex-wrap">
                        <div className="w-full md:w-1/2 lg:w-1/3 lg:pb-[28px] pb-[18px] flex items-center justify-center md:justify-start">
                            <SensorItem
                                sensorType="Lighting"
                                sensorValue={light}
                                sensorUnit="%"
                                upperThreshold={boundContext.boundLighting.high}
                                lowerThreshold={boundContext.boundLighting.low}
                            />
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 lg:pb-[28px] pb-[18px] flex items-center justify-center md:justify-start">
                            <SensorItem
                                sensorType="Humidity"
                                sensorValue={humid}
                                sensorUnit="%"
                                upperThreshold={boundContext.boundHumid.high}
                                lowerThreshold={boundContext.boundHumid.low}
                            />
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 lg:pb-[28px] pb-[18px] flex items-center justify-center md:justify-start">
                            <SensorItem
                                sensorType="Temperature"
                                sensorValue={temp}
                                sensorUnit="°C"
                                upperThreshold={boundContext.boundTemp.high}
                                lowerThreshold={boundContext.boundTemp.low}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row flex-wrap mb-[28px] md:gap-[16px] gap-[10px]">
                        <DeviceItem
                            deviceType="light"
                            deviceName="Light 1"
                            deviceStatus={statusLight1}
                            deviceMode={modeLight}
                            changeDeviceMode={() => {
                                setModeLight(modeLight === 'automatic' ? 'manual' : 'automatic');
                                changeMode(modeLight === 'automatic' ? 'manual' : 'automatic', modeFan, modeDoor);
                            }}
                            toggleDeviceStatus={() => handleChangeStatusLight1(statusLight1 === '1' ? '0' : '1')}
                        />
                        <DeviceItem
                            deviceType="light"
                            deviceName="Light 2"
                            deviceStatus={statusLight2}
                            deviceMode={modeLight}
                            changeDeviceMode={() => {
                                setModeLight(modeLight === 'automatic' ? 'manual' : 'automatic');
                                changeMode(modeLight === 'automatic' ? 'manual' : 'automatic', modeFan, modeDoor);
                            }}
                            toggleDeviceStatus={() => handleChangeStatusLight2(statusLight2 === '1' ? '0' : '1')}
                        />
                        <DeviceItem
                            deviceType="light"
                            deviceName="Light 3"
                            deviceStatus={statusLight3}
                            deviceMode={modeLight}
                            changeDeviceMode={() => {
                                setModeLight(modeLight === 'automatic' ? 'manual' : 'automatic');
                                changeMode(modeLight === 'automatic' ? 'manual' : 'automatic', modeFan, modeDoor);
                            }}
                            toggleDeviceStatus={() => handleChangeStatusLight3(statusLight3 === '1' ? '0' : '1')}
                        />
                        <DeviceItem
                            deviceType="light"
                            deviceName="Light 4"
                            deviceStatus={statusLight4}
                            deviceMode={modeLight}
                            changeDeviceMode={() => {
                                setModeLight(modeLight === 'automatic' ? 'manual' : 'automatic');
                                changeMode(modeLight === 'automatic' ? 'manual' : 'automatic', modeFan, modeDoor);
                            }}
                            toggleDeviceStatus={() => handleChangeStatusLight4(statusLight4 === '1' ? '0' : '1')}
                        />
                        <DeviceItem
                            deviceType="fan"
                            deviceName="Fan"
                            fanSpeed={fanSpeed === '' ? 0 : fanSpeed}
                            deviceMode={modeFan}
                            changeDeviceMode={() => {
                                setModeFan(modeFan === 'automatic' ? 'manual' : 'automatic');
                                changeMode(modeLight, modeFan === 'automatic' ? 'manual' : 'automatic', modeDoor);
                            }}
                            setFanSpeed={(e) => {
                                if (loading) return;
                                setFanSpeed(Number(e.target.value))
                            }}
                        />
                        <DeviceItem
                            deviceType="door"
                            deviceName="Door"
                            deviceStatus={statusDoor}
                            deviceMode={modeDoor}
                            changeDeviceMode={() => {
                                setModeDoor(modeDoor === 'automatic' ? 'manual' : 'automatic');
                                changeMode(modeLight, modeFan, modeDoor === 'automatic' ? 'manual' : 'automatic');
                            }}
                            toggleDeviceStatus={() => handleChangeDoorStatus(statusDoor === '1' ? '0' : '1')}
                        />
                    </div>
                </div>
            </>
        </div>
    );
}

export default Dashboard;
