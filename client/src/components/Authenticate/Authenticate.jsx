import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';

import { setMode } from '../../redux/uiSlice';
import { Button } from '../../utils';
import ChangePassword from './ChangePassword';
import Login from './Login';
import Register from './Register';
import User from './User';

const Authenticate = () => {
    const mode = useSelector((state) => state.ui.mode);
    const dispatch = useDispatch();

    if (!mode) return null;

    return (
        <div className='fixed inset-0 p-2 z-30 bg-slate-800 bg-opacity-50 flex items-center justify-center w-full h-screen'>
            <div className='bg-white sm:p-12 p-6 relative rounded-xl shadow-xl w-full max-w-md'>
                <Button
                    leftIcon={<X />}
                    className='absolute top-2 right-2'
                    onClick={() => dispatch(setMode(''))}
                />

                {/* User Register */}
                {mode === 'register' && <Register />}

                {/* User Login */}
                {mode === 'login' && <Login />}

                {/* User Detail */}
                {mode === 'user-detail' && <User />}
                {/* User Detail */}

                {mode === 'change-password' && <ChangePassword />}
            </div>
        </div>
    );
};

export default Authenticate;
