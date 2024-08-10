import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setLogout } from '../redux/authSlice';
import toast from 'react-hot-toast';

const UserPage = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        dispatch(setLogout());
        toast.success('user has been logout');
    };

    const ReadInputs = ({ name = '', value = '' }) => {
        return (
            <div className='mb-4'>
                <label
                    htmlFor='name'
                    className='block capitalize text-base font-medium text-[#07074D]'>
                    {name}
                </label>
                <input
                    type='text'
                    name={name}
                    id={name}
                    value={value}
                    className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-black/90 outline-none focus:border-[#6A64F1] focus:shadow-md'
                    readOnly
                />
            </div>
        );
    };

    return (
        <div className='flex flex-col gap-8 items-center justify-center py-10 px-4 w-full'>
            <h2 className='text-4xl font-extrabold'>Profile</h2>
            <div className='max-w-[400px]'>
                <ReadInputs name='username' value={user?.username} />
                <ReadInputs name='email' value={user?.email} />
                <ReadInputs name='role' value={user?.role} />
                <ReadInputs name='created At' value={user?.createdAt} />
                <p className='text-center'>
                    <span className='block capitalize text-rose-600'>
                        Note: Demo User, not be change password, Please login another email...
                    </span>
                    <span className='block text-blue-700 hover:text-blue-500 py-2 font-extrabold text-xl'>
                        Change Password
                    </span>
                </p>
                <button
                    onClick={logoutHandler}
                    className='bg-rose-600 w-full mt-2 py-2 rounded-md text-white font-medium hover:bg-rose-700 cursor-pointer'>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserPage;
