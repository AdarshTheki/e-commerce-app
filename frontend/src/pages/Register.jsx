import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { Inputs, instance, toasts } from '../utils';

const Register = () => {
    const navigate = useNavigate();
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
                navigate('/login');
            }
        } catch (error) {
            toasts({ type: false, message: error?.message || 'Register User failed' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
                <h2 className='text-2xl font-semibold mb-4'>Sign in to your account</h2>
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
                <NavLink
                    to='/login'
                    className='text-center text-gray-600 hover:text-indigo-600 cursor-pointer capitalize'>
                    You are already sign please login here ?
                </NavLink>
            </div>
        </div>
    );
};

export default Register;
