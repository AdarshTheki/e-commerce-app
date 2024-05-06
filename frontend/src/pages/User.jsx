import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { getUser } from '../redux/authSlice';
import { ChangePassword } from '../components';

const User = () => {
    const user = useSelector(getUser);
    const [isPassword, setIsPassword] = useState(false);

    return (
        <div className='bg-gray-100'>
            <div className='min-h-screen flex justify-center items-center'>
                <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
                    <h2 className='text-2xl font-semibold mb-4'>User Profile</h2>
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
                    <div className='mb-4'>
                        <label htmlFor='updatedAt' className='block text-gray-600'>
                            Updated At
                        </label>
                        <input
                            type='text'
                            id='updatedAt'
                            name={user?.updatedAt}
                            value='2024-05-04T10:33:25.430Z'
                            className='w-full px-4 py-2 rounded-md border-gray-300 bg-gray-100 cursor-not-allowed'
                            readOnly
                        />
                    </div>
                    <button
                        onClick={() => setIsPassword(true)}
                        className='w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50'>
                        Change Password
                    </button>
                    <ChangePassword isPassword={isPassword} setIsPassword={setIsPassword} />
                </div>
            </div>
        </div>
    );
};

export default User;
