import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { Inputs, instance, toasts } from '../../utils';
import { setMode } from '../../redux/uiSlice';

const Register = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;

    const [loading, setLoading] = useState(false);
    const [passwordShow, setPasswordShow] = useState(false);

    const submitForm = async (data) => {
        setLoading(true);
        try {
            const result = await instance.post('/users/register', data);
            if (result) {
                toasts({ message: 'Register successfully' });
            }
            dispatch(setMode('login'));
        } catch (error) {
            toasts({ type: false, message: error?.message || 'Register User failed' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h2 className='text-2xl font-semibold mb-4'>Sign Up</h2>
            <form onSubmit={handleSubmit(submitForm)} className='space-y-4'>
                <div>
                    <Inputs
                        label='Username'
                        placeholder='Enter your email...'
                        {...register('username', {
                            required: true,
                        })}
                    />
                    {errors.username && (
                        <span className='text-red-500 text-xs'>
                            This field is required on your username
                        </span>
                    )}
                </div>
                <div>
                    <Inputs
                        label='Email:'
                        type='email'
                        placeholder='Enter your email...'
                        {...register('email', {
                            required: true,
                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                        })}
                    />
                    {errors.email && (
                        <span className='text-red-500 text-xs'>
                            This field is required on your email
                        </span>
                    )}
                </div>
                <div className='relative'>
                    <Inputs
                        label='Password:'
                        type={passwordShow ? 'text' : 'password'}
                        placeholder='Enter your password...'
                        {...register('password', {
                            required: true,
                            pattern:
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+{};:'",.<>?/\\|[\]~`]).{8,}$/i,
                        })}
                    />
                    <span
                        onClick={() => setPasswordShow(!passwordShow)}
                        className='absolute right-5 top-9 text-xl rounded cursor-pointer hover:opacity-90'>
                        {passwordShow ? <FaEyeSlash /> : <FaEye />}
                    </span>
                    {errors.password && (
                        <span className='text-red-500 text-xs'>
                            At least one uppercase, lowercase, digit, and one special character.
                            Keep strong password !
                        </span>
                    )}
                </div>
                <Inputs
                    type='submit'
                    value={loading ? 'Loading...' : 'Register'}
                    className='bg-gray-800 my-3 text-white font-medium hover:bg-gray-700 cursor-pointer'
                />
            </form>
            <div className='mx-auto'>
                <span>You have already account?</span>
                <span
                    onClick={() => dispatch(setMode('login'))}
                    className='text-center ml-2 text-gray-800 hover:text-indigo-600 font-semibold cursor-pointer capitalize'>
                    Sign In
                </span>
            </div>
        </>
    );
};

export default Register;
