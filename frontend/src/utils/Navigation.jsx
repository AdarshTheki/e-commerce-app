import React from 'react';
import { NavLink } from 'react-router-dom';

import { setMode } from '../redux/uiSlice';
import { useDispatch, useSelector } from 'react-redux';

const Navigation = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    return (
        <>
            <NavLink to='/' className='block py-2 px-4 capitalize font-medium hover:bg-gray-800'>
                Home
            </NavLink>
            <NavLink
                to='/cart'
                className='block py-2 px-4 capitalize font-medium hover:bg-gray-800'>
                Cart
            </NavLink>
            {user?.email ? (
                <span
                    className='block py-2 px-4 capitalize font-medium hover:bg-gray-800 cursor-pointer'
                    onClick={() => dispatch(setMode('user-detail'))}>
                    User
                </span>
            ) : (
                <span
                    className='block py-2 px-4 capitalize font-medium hover:bg-gray-800 cursor-pointer'
                    onClick={() => dispatch(setMode('login'))}>
                    Login
                </span>
            )}
        </>
    );
};

export default Navigation;
