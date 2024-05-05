import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        <div className='mx-auto p-5 md:w-1/2'>
            <h2 className='text-center py-5 text-gray-600 text-4xl font-semibold'>
                Create an new account
            </h2>
            <form onSubmit={handleSubmit(submitForm)} className=' space-y-5'>
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
                    className='bg-gray-800 text-white cursor-pointer hover:opacity-90 text-center'
                />
            </form>
            <p
                onClick={() => navigate('/login')}
                className=' mt-5 text-center text-teal-600 font-medium hover:text-teal-800 underline cursor-pointer'>
                You are already sign please login here ?
            </p>
        </div>
    );
};

export default Register;
