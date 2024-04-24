import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import SensorItem from './SensorItem';
import DeviceItem from './DeviceItem';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import { getDeviceStatus, postDeviceStatus } from '../../services/deviceService';
import { MicIcon } from '../../components/Icons/Icons';
import SpeechModal from '../../components/Modals/SpeechModal';
import { useBound } from '../../contexts/useBound';
import { getBound } from '../../services/boundAPI';
import useSpeechRecognition from '../../hooks/useSpeechRecognition.ts';
import { handleChangeMode } from '../../utils/handleChangeMode.js';
import { toast } from 'react-toastify';
import Switch from 'react-switch';
const cx = classNames.bind(styles);
function Dashboard() {
    const [modeLight, setModeLight] = useState('manual');
    const [modeFan, setModeFan] = useState('manual');
    const [modeDoor, setModeDoor] = useState('manual');
    const { text, isListening, startListening, stopListening } = useSpeechRecognition();
    const [personDetect, setPersonDetect] = useState(0);
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
        if (loading) return;
        setLoading(true);
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
                const [light1, light2, fan, door] = await Promise.all([
                    getDeviceStatus('feeds/light-1/data/last'),
                    getDeviceStatus('feeds/light-2/data/last'),
                    getDeviceStatus('feeds/fan/data/last'),
                    getDeviceStatus('feeds/door/data/last'),
                ]);
                setStatusLight1(light1.data.value);
                setStatusLight2(light2.data.value);
                setFanSpeed(Number(fan.data.value));
                setStatusDoor(door.data.value);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
        let intervalId = null;
        if (modeLight === 'automatic' || modeFan === 'automatic' || modeDoor === 'automatic') {
            intervalId = setInterval(fetchData, 3000);
        }
        if (intervalId != null) {
            return () => clearInterval(intervalId);
        }
    }, [modeLight, modeFan, modeDoor]);

    useEffect(() => {
        const callAPI = async (light, fan, door, person) => {
            try {
                await Promise.all([
                    postDeviceStatus('feeds/mode/data', { value: handleChangeMode(light, fan, door) }),
                    postDeviceStatus('feeds/person/data', { value: person }),
                ]);
            } catch (error) {
                console.error(error);
            }
        };
        const fetchData = async () => {
            try {
                const [mode, person] = await Promise.all([
                    getDeviceStatus('feeds/mode/data/last'),
                    getDeviceStatus('feeds/person/data/last'),
                ]);
                setPersonDetect(Number(person.data.value));
                if (Number(mode.data.value) === 0) {
                    setModeLight('manual');
                    setModeFan('manual');
                    setModeDoor('manual');
                    callAPI('manual', 'manual', 'manual', Number(person.data.value));
                } else if (Number(mode.data.value) === 1) {
                    setModeLight('automatic');
                    setModeFan('manual');
                    setModeDoor('manual');
                    callAPI('automatic', 'manual', 'manual', Number(person.data.value));
                } else if (Number(mode.data.value) === 2) {
                    setModeLight('manual');
                    setModeFan('automatic');
                    setModeDoor('manual');
                    callAPI('manual', 'automatic', 'manual', Number(person.data.value));
                } else if (Number(mode.data.value) === 3) {
                    setModeLight('manual');
                    setModeFan('manual');
                    setModeDoor('automatic');
                    callAPI('manual', 'manual', 'automatic', Number(person.data.value));
                } else if (Number(mode.data.value) === 4) {
                    setModeLight('automatic');
                    setModeFan('automatic');
                    setModeDoor('manual');
                    callAPI('automatic', 'automatic', 'manual', Number(person.data.value));
                } else if (Number(mode.data.value) === 5) {
                    setModeLight('automatic');
                    setModeFan('manual');
                    setModeDoor('automatic');
                    callAPI('automatic', 'manual', 'automatic', Number(person.data.value));
                } else if (Number(mode.data.value) === 6) {
                    setModeLight('manual');
                    setModeFan('automatic');
                    setModeDoor('automatic');
                    callAPI('manual', 'automatic', 'automatic', Number(person.data.value));
                } else if (Number(mode.data.value) === 7) {
                    setModeLight('automatic');
                    setModeFan('automatic');
                    setModeDoor('automatic');
                    callAPI('automatic', 'automatic', 'automatic', Number(person.data.value));
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    //DOOR
    const [statusDoor, setStatusDoor] = useState('0');

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
        if (modeLight === 'automatic' || modeFan === 'automatic' || modeDoor === 'automatic') {
            toast.error('Đang ở chế độ tự động');
            return;
        }
        setShowModal(true);
        startListening();
    };

    const handleChangePersonDetect = (value) => {
        if (loading) return;
        setLoading(true);
        try {
            const callAPI = async () => {
                await postDeviceStatus('feeds/person/data', { value: value });
                setLoading(false);
                setPersonDetect(personDetect === 1 ? 0 : 1);
            };
            callAPI();
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
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
                                fanSpeed={fanSpeed}
                                setFanSpeed={(data) => setFanSpeed(data)}
                                listening={isListening}
                                setStatusDoor={setStatusDoor}
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
                        <div className="flex flex-row items-center justify-end gap-[18px]">
                            <p className="font-bold text-[#1a1a1a] text-[16px] min-w-[58px]">Phát hiện người</p>

                            <Switch
                                onChange={() => handleChangePersonDetect(personDetect === 1 ? 0 : 1)}
                                checked={personDetect === 1}
                            />
                        </div>
                        <DeviceItem
                            deviceType="light"
                            deviceName="Light 1"
                            deviceStatus={statusLight1}
                            deviceMode={modeLight}
                            changeDeviceMode={() => {
                                if (modeLight === 'automatic') {
                                    try {
                                        const callAPI = async (data) => {
                                            await Promise.all([
                                                postDeviceStatus('feeds/light-1/data', { value: data }),
                                                postDeviceStatus('feeds/light-2/data', { value: data }),
                                            ]);
                                            setStatusLight1(data);
                                            setStatusLight2(data);
                                        };
                                        callAPI('0');
                                    } catch (err) {
                                        console.log(err);
                                    }
                                }
                                setModeLight(modeLight === 'automatic' ? 'manual' : 'automatic');
                                changeMode(modeLight === 'automatic' ? 'manual' : 'automatic', modeFan, modeDoor);
                            }}
                            toggleDeviceStatus={() => {
                                if (loading) return;
                                else if (modeLight === 'automatic') {
                                    toast.error('Đèn đang ở chế độ tự động');
                                    return;
                                }
                                handleChangeStatusLight1(statusLight1 === '1' ? '0' : '1');
                            }}
                        />
                        <DeviceItem
                            deviceType="light"
                            deviceName="Light 2"
                            deviceStatus={statusLight2}
                            deviceMode={modeLight}
                            changeDeviceMode={() => {
                                if (modeLight === 'automatic') {
                                    try {
                                        const callAPI = async (data) => {
                                            await Promise.all([
                                                postDeviceStatus('feeds/light-1/data', { value: data }),
                                                postDeviceStatus('feeds/light-2/data', { value: data }),
                                            ]);
                                            setStatusLight1(data);
                                            setStatusLight2(data);
                                        };
                                        callAPI('0');
                                    } catch (err) {
                                        console.log(err);
                                        setLoading(false);
                                    }
                                }
                                setModeLight(modeLight === 'automatic' ? 'manual' : 'automatic');
                                changeMode(modeLight === 'automatic' ? 'manual' : 'automatic', modeFan, modeDoor);
                            }}
                            toggleDeviceStatus={() => {
                                if (loading) return;
                                else if (modeLight === 'automatic') {
                                    toast.error('Đèn đang ở chế độ tự động');
                                    return;
                                }
                                handleChangeStatusLight2(statusLight2 === '1' ? '0' : '1');
                            }}
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
                                else if (modeFan === 'automatic') {
                                    toast.error('Quạt đang ở chế độ tự động');
                                    return;
                                } else {
                                    setFanSpeed(Number(e.target.value));
                                    try {
                                        const callAPI = async () => {
                                            await postDeviceStatus('feeds/fan/data', { value: Number(e.target.value) });
                                            toast.success('Thay đổi tốc độ quạt thành công');
                                        };
                                        callAPI();
                                    } catch (err) {
                                        console.log(err);
                                        toast.error('Thay đổi tốc độ quạt thất bại');
                                        setRenderFan(!renderFan);
                                    }
                                }
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
                            toggleDeviceStatus={() => {
                                if (loading) return;
                                else if (modeDoor === 'automatic') {
                                    toast.error('Cửa đang ở chế độ tự động');
                                    return;
                                }
                                handleChangeDoorStatus(statusDoor === '1' ? '0' : '1');
                            }}
                        />
                    </div>
                </div>
            </>
        </div>
    );
}

export default Dashboard;
