import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setLogout } from '../../redux/authSlice';
import { setMode } from '../../redux/uiSlice';
import { instance, toasts } from '../../utils';

const User = () => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            await instance.get('/auth/logout');
            toasts({ message: 'user logout successfully' });
            dispatch(setLogout());
            dispatch(setMode(''));
            document.cookie = 'accessToken='
        } catch (error) {
            toasts({ type: false, message: 'User logout something wrong' });
        }
    };

    return (
        <>
            <h2 className='text-2xl font-semibold mb-4'>Profile</h2>
            <div className='mb-4'>
                <label htmlFor='username' className='block text-gray-600'>
                    Username
                </label>
                <input
                    type='text'
                    id='username'
                    name='username'
                    value={user?.username}
                    className='w-full px-4 py-2 rounded-md border-gray-300 bg-gray-100 cursor-not-allowed'
                    readOnly
                />
            </div>
            <div className='mb-4'>
                <label htmlFor='email' className='block text-gray-600'>
                    Email
                </label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    value={user?.email}
                    className='w-full px-4 py-2 rounded-md border-gray-300 bg-gray-100 cursor-not-allowed'
                    readOnly
                />
            </div>
            <div className='mb-4'>
                <label htmlFor='role' className='block text-gray-600'>
                    Role
                </label>
                <input
                    type='text'
                    id='role'
                    name='role'
                    value={user?.role}
                    className='w-full px-4 py-2 rounded-md border-gray-300 bg-gray-100 cursor-not-allowed'
                    readOnly
                />
            </div>
            <div className='mb-4'>
                <label htmlFor='createdAt' className='block text-gray-600'>
                    Created At
                </label>
                <input
                    type='text'
                    id='createdAt'
                    name={user?.createdAt}
                    value='2024-05-02T09:40:10.307Z'
                    className='w-full px-4 py-2 rounded-md border-gray-300 bg-gray-100 cursor-not-allowed'
                    readOnly
                />
            </div>
            <button
                onClick={() => dispatch(setMode('change-password'))}
                className='bg-gray-800 w-full py-2 rounded-md text-white font-medium hover:bg-gray-700 cursor-pointer'>
                Change Password
            </button>
            <button
                onClick={logoutHandler}
                className='bg-rose-600 w-full mt-2 py-2 rounded-md text-white font-medium hover:bg-rose-700 cursor-pointer'>
                Logout
            </button>
        </>
    );
};

export default User;
