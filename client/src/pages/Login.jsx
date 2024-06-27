import React from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { Inputs, toasts } from '../utils';
import { useLoginMutation } from '../redux/apiSlice';

const Login = () => {
    const { register, handleSubmit, formState } = useForm();
    const [passwordShow, setPasswordShow] = React.useState(false);
    const { errors } = formState;

    const [login, { isLoading, isError, error }] = useLoginMutation();

    const submitForm = async (userData) => {
        const user = await login(userData).unwrap();
        if (isError) {
            toasts({ type: true, message: error.message });
        } else {
            localStorage.setItem('token', user.accessToken);
            window.location.href = '/';
        }
    };

    return (
        <div className='flex flex-col gap-8 items-center justify-center py-10 px-4 w-full'>
            <h2 className='text-4xl font-extrabold'>Sign In</h2>
            <form onSubmit={handleSubmit(submitForm)} className='space-y-4 w-full max-w-[400px]'>
                <Inputs
                    defaultValue='demouser@gmail.com'
                    label='Email:'
                    type='email'
                    message='This field is required on your email'
                    isError={errors.email}
                    placeholder='Enter your email...'
                    {...register('email', {
                        required: true,
                    })}
                />
                <div className='relative'>
                    <Inputs
                        defaultValue='demouser@12'
                        label='Password:'
                        message='Keep strong password !'
                        isError={errors.password}
                        type={passwordShow ? 'text' : 'password'}
                        placeholder='Enter your password...'
                        {...register('password', {
                            required: true,
                        })}
                    />
                    <span
                        onClick={() => setPasswordShow(!passwordShow)}
                        className='absolute right-5 top-9 text-xl rounded cursor-pointer hover:opacity-90'>
                        {passwordShow ? <EyeOff /> : <Eye />}
                    </span>
                </div>
                <NavLink className='cursor-pointer hover:text-indigo-600' to={'/change-password'}>
                    Change password?
                </NavLink>
                <Inputs
                    type='submit'
                    value={isLoading ? 'Loading...' : 'Login'}
                    className='!bg-gray-800  !text-white font-medium cursor-pointer'
                />
            </form>
            <div className='space-x-2'>
                <span>Do not have a account?</span>
                <NavLink
                    to={'/register'}
                    className='text-center text-gray-800 hover:text-indigo-600 font-semibold cursor-pointer capitalize'>
                    Sign Up
                </NavLink>
            </div>
        </div>
    );
};

export default Login;
