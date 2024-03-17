import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Login() {
    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem('isLoggedIn') !== null) {
            navigate('/');
        }
    }, []);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {
        if (email === 'admin' && password === 'admin') {
            sessionStorage.setItem('isLoggedIn', true);
            navigate('/');
        } else {
            alert('Invalid email or password!');
        }
    };
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };
    return (
        <div className="mt-[65px] md:ml-[70px] md:px-[220px] px-[20px] py-[50px] min-h-[800px]">
            <div className="w-full md:w-[300px]">
                <p className="text-[28px] font-bold mb-[10px]">Đăng nhập</p>
                <div>
                    <p className="text-[14px] font-semibold mb-[10px]">Email</p>
                    <input
                        type="text"
                        id="email"
                        className="mb-[10px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <p className="text-[14px] font-semibold mb-[10px]">Mật khẩu</p>
                    <input
                        type="password"
                        id="password"
                        className="mb-[10px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleEnter}
                        required
                    />
                </div>
                <button
                    onClick={handleLogin}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Đăng nhập
                </button>
            </div>
        </div>
    );
}

export default Login;
