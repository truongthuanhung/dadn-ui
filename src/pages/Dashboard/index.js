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
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useDebounce } from '../../hooks/useDebounce';
import { useBound } from '../../contexts/useBound';
import { getBound } from '../../services/boundAPI';
const cx = classNames.bind(styles);
function Dashboard() {
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
    const [mode, setMode] = useState('manual');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [light1, light2, light3, light4] = await Promise.all([
                    getDeviceStatus('feeds/light-1/data/last'),
                    getDeviceStatus('feeds/light-2/data/last'),
                    getDeviceStatus('feeds/light-3/data/last'),
                    getDeviceStatus('feeds/light-4/data/last'),
                ]);
                setStatusLight1(light1.data.value);
                setStatusLight2(light2.data.value);
                setStatusLight3(light3.data.value);
                setStatusLight4(light4.data.value);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
        if (mode === 'automatic') {
            const intervalId = setInterval(fetchData, 5000);
            return () => clearInterval(intervalId);
        }
    }, [mode]);

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
    const [mode1, setMode1] = useState('manual');
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
    const [mode2, setMode2] = useState('manual');

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
    const [mode3, setMode3] = useState('manual');

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
    const [mode4, setMode4] = useState('manual');

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

    const { transcript, listening } = useSpeechRecognition();
    const [showModal, setShowModal] = useState(false);
    const handleMicClick = () => {
        setShowModal(true);
        SpeechRecognition.startListening();
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
                                content={transcript}
                                handleClose={() => setShowModal(false)}
                                stopListening={SpeechRecognition.stopListening}
                                setStatusLight1={(data) => setStatusLight1(data)}
                                setStatusLight2={(data) => setStatusLight2(data)}
                                setStatusLight3={(data) => setStatusLight3(data)}
                                setStatusLight4={(data) => setStatusLight4(data)}
                                fanSpeed={fanSpeed}
                                setFanSpeed={(data) => setFanSpeed(data)}
                                listening={listening}
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
