import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Customer = () => {
    const dispatch = useDispatch();
    const process = useSelector((state) => state.ui.process);
    const user = useSelector((state) => state.auth.user);
    return (
        <>
            <div className='font-medium text-lg'>
                <span className='h-10 items-center justify-center bg-gray-800 text-white'>1</span>
                <span>Customer</span>
            </div>
            <p>
                <span>{user?.email}</span>
                <span>Log out</span>
            </p>
        </>
    );
};

export default Customer;
