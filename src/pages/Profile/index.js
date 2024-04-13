import React, { useState } from 'react';
import { changePassword } from '../../utils/validation';
import { changePasswordAPI } from '../../services/changePassword';
import { toast } from 'react-toastify';
function Profile() {
    const [tab, setTab] = useState('view');
    const [name, setName] = useState(sessionStorage.getItem('name'));
    const [username, setUsername] = useState(sessionStorage.getItem('username'));

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const onCancelAccount = () => {
        setName(sessionStorage.getItem('name'));
        setUsername(sessionStorage.getItem('username'));
    };
    const onSaveAccount = () => {};
    const onSavePassword = async () => {
        if (!changePassword(password, newPassword, confirmPassword)) return;
        const response = await changePasswordAPI({ username, oldpassword: password, newpassword: newPassword });
        if (response.status === 200) {
            toast.success('Đổi mật khẩu thành công');
            setPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } else {
            toast.error('Đổi mật khẩu thất bại');
            setPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
    };
    const onCancelPassword = () => {};
    return (
        <div className="mt-[65px] md:ml-[70px] lg:px-[220px] md:px-[80px] px-[20px] py-[50px] min-h-[800px]">
            <p className="text-[28px] font-bold mb-[20px]">Quản lý tài khoản</p>

            <div className="flex flex-row items-center justify-start gap-[24px] mb-[28px]">
                <div
                    onClick={() => setTab('view')}
                    className={`cursor-pointer px-[20px] py-[12px] font-semibold rounded-[10px] ${
                        tab === 'view' ? 'bg-[#2396EF] text-black' : 'text-[#7a7a7a]'
                    }`}
                >
                    Chế độ xem
                </div>
                <div
                    onClick={() => setTab('edit')}
                    className={`cursor-pointer px-[20px] py-[12px] font-semibold rounded-[10px] ${
                        tab === 'edit' ? 'bg-[#2396EF] text-black' : 'text-[#7a7a7a]'
                    }`}
                >
                    Chế độ chỉnh sửa
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:gap-[50px] gap-[10px] items-start">
                <p className="text-[20px] font-bold md:w-[200px]">Thông tin tài khoản</p>
                <div className="flex-1 flex flex-col gap-[22px] w-full md:w-auto">
                    <div>
                        <p className="text-[14px] font-semibold mb-[10px] w-full">Tên</p>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            readOnly={tab === 'view'}
                            type="text"
                            id="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <p className="text-[14px] font-semibold mb-[10px] w-full">Username</p>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            readOnly={tab === 'view'}
                            type="text"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    {tab === 'edit' && (
                        <div className="lg:self-end flex flex-col-reverse lg:flex-row mt-[28px] lg:gap-[24px] gap-[14px] text-[14px]">
                            <button
                                onClick={onCancelAccount}
                                className="lg:w-[214px] h-[45px] w-full  bg-[#B4AFAF] rounded-[10px] font-semibold"
                            >
                                Hủy bỏ
                            </button>
                            <button
                                onClick={onSaveAccount}
                                className="lg:w-[214px] h-[45px] w-full bg-[#2396EF] rounded-[10px] font-semibold text-[14px]"
                            >
                                Lưu thay đổi
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:gap-[50px] gap-[10px] items-start my-[40px]">
                <p className="text-[20px] font-bold md:w-[200px]">Đổi mật khẩu</p>
                <div className="flex-1 flex flex-col gap-[22px] w-full md:w-auto">
                    <div>
                        <p className="text-[14px] font-semibold mb-[10px] w-full">Mật khẩu hiện tại</p>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <p className="text-[14px] font-semibold mb-[10px] w-full">Mật khẩu mới</p>
                        <input
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            type="password"
                            id="new-password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <p className="text-[14px] font-semibold mb-[10px] w-full">Xác nhận mật khẩu</p>
                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            id="confirm-password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="lg:self-end flex flex-col-reverse lg:flex-row mt-[28px] lg:gap-[24px] gap-[14px] text-[14px]">
                        <button
                            onClick={onCancelPassword}
                            className="lg:w-[214px] h-[45px] w-full  bg-[#B4AFAF] rounded-[10px] font-semibold"
                        >
                            Hủy bỏ
                        </button>
                        <button
                            onClick={onSavePassword}
                            className="lg:w-[214px] h-[45px] w-full bg-[#2396EF] rounded-[10px] font-semibold text-[14px]"
                        >
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
