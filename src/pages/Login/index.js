import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import { loginAPI, registerAPI } from '../../services/loginAPI';
import { userInfoAPI } from '../../services/userInfoAPI';
import { useProfile } from '../../contexts/useProfile';
import { loginValidation, registerValidation } from '../../utils/validation';
import { toast } from 'react-toastify';
function Login() {
    const navigate = useNavigate();
    let { state } = useLocation();
    const initialTab = state && state.tab === 'register' ? 'register' : 'login';
    const [tab, setTab] = useState(initialTab);
    const authContext = useAuth();
    const profileContext = useProfile();
    useEffect(() => {
        if (authContext.auth) {
            navigate('/');
        }
    }, [authContext.auth, navigate]);

    //login value
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //register value
    const [name, setName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleLogin = async () => {
        if (!loginValidation(email, password)) return;
        const response = await loginAPI({ username: email, password });
        if (response.data) {
            sessionStorage.setItem('accessToken', response.data.token);
            sessionStorage.setItem('isLoggedIn', true);
            const info = await userInfoAPI({ id: response.data.id });
            sessionStorage.setItem('name', info.data.name);
            sessionStorage.setItem('id', info.data._id);
            sessionStorage.setItem('username', info.data.username);
            authContext.setLoggedIn();
            profileContext.setUserInfo({ id: info.data._id, username: info.data.username, name: info.data.name });
            navigate('/dashboard');
        } else {
            toast.error('Wrong login information');
        }
    };

    const handleRegister = async () => {
        if (!registerValidation(name, newEmail, newPassword, confirmPassword)) {
            return;
        } else {
            const response = await registerAPI({ username: newEmail, name, password: newPassword });
            if (response.data) {
                //toast.success('Account is successfully created');
                setEmail('');
                setPassword('');
                setTab('login');
                setName('');
                setNewEmail('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                //toast.error('Username is existed');
            }
        }
    };
    
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            if (tab === 'login') handleLogin();
            else handleRegister();
        }
    };
    return (
        <div className="mt-[65px] md:ml-[70px] md:px-[220px] px-[20px] py-[50px] min-h-[800px]">
            <div className="flex flex-row items-center justify-start gap-[24px] mb-[28px]">
                <div
                    onClick={() => setTab('login')}
                    className={`cursor-pointer px-[20px] py-[12px] font-semibold rounded-[10px] ${
                        tab === 'login' ? 'bg-[#2396EF] text-black' : 'text-[#7a7a7a]'
                    }`}
                >
                    Đăng nhập
                </div>
                <div
                    onClick={() => setTab('register')}
                    className={`cursor-pointer px-[20px] py-[12px] font-semibold rounded-[10px] ${
                        tab === 'register' ? 'bg-[#2396EF] text-black' : 'text-[#7a7a7a]'
                    }`}
                >
                    Đăng ký
                </div>
            </div>

            {tab === 'login' ? (
                <div className="w-full md:w-[300px]">
                    <p className="text-[28px] font-bold mb-[10px]">Đăng nhập</p>
                    <div>
                        <p className="text-[14px] font-semibold mb-[10px]">Username</p>
                        <input
                            type="text"
                            id="email"
                            className="mb-[10px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className="text-[14px] font-semibold mb-[10px]">Mật khẩu</p>
                        <input
                            type="password"
                            id="password"
                            className="mb-[10px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleEnter}
                        />
                    </div>
                    <button
                        onClick={handleLogin}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Đăng nhập
                    </button>
                </div>
            ) : (
                <div className="w-full md:w-[300px]">
                    <p className="text-[28px] font-bold mb-[10px]">Đăng ký</p>
                    <div>
                        <p className="text-[14px] font-semibold mb-[10px]">Tên</p>
                        <input
                            type="text"
                            id="new-name"
                            className="mb-[10px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className="text-[14px] font-semibold mb-[10px]">Username</p>
                        <input
                            type="text"
                            id="new-email"
                            className="mb-[10px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className="text-[14px] font-semibold mb-[10px]">Mật khẩu</p>
                        <input
                            type="password"
                            id="new-password"
                            className="mb-[10px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className="text-[14px] font-semibold mb-[10px]">Xác nhận mật khẩu</p>
                        <input
                            type="password"
                            id="confirm-password"
                            className="mb-[10px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onKeyDown={handleEnter}
                        />
                    </div>
                    <button
                        onClick={handleRegister}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Đăng ký
                    </button>
                </div>
            )}
        </div>
    );
}

export default Login;
