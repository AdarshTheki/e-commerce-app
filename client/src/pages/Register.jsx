import React from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

import { Inputs } from '../utils';
import { useSignInMutation } from '../redux/apiSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm();
    const [passwordShow, setPasswordShow] = React.useState(false);
    const { errors } = formState;

    const [signIn, { isLoading }] = useSignInMutation();

    const submitForm = async (userData) => {
        const res = await signIn(userData);
        if (res.data) {
            toast.success('user successfully register');
            navigate('/login');
        } else if (res.error) {
            toast.error('user not register, Please check input Fields');
        }
    };

    return (
        <div className='flex flex-col gap-8 items-center justify-center py-20 w-full'>
            <h2 className='text-4xl font-extrabold'>Sign Up</h2>
            <form onSubmit={handleSubmit(submitForm)} className='space-y-4 w-[400px]'>
                <Inputs
                    message='This field is required on your username'
                    isError={errors.username}
                    label='Username'
                    placeholder='Enter your email...'
                    {...register('username', {
                        required: true,
                    })}
                />
                <Inputs
                    label='Email:'
                    type='email'
                    isError={errors.email}
                    message='This field is required on your email'
                    placeholder='Enter your email...'
                    {...register('email', {
                        required: true,
                        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                    })}
                />
                <div className='relative'>
                    <Inputs
                        isError={errors.password}
                        message='At least one uppercase, lowercase, digit, and one special character.
                            Keep strong password !'
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
                        {passwordShow ? <EyeOff /> : <Eye />}
                    </span>
                </div>
                <Inputs
                    type='submit'
                    value={isLoading ? 'Loading...' : 'Register'}
                    className='!bg-gray-800 my-3 !text-white font-medium cursor-pointer'
                />
            </form>
            <div className='mx-auto'>
                <span>You have already account?</span>
                <NavLink
                    to={'/login'}
                    className='text-center ml-2 text-gray-800 hover:text-indigo-600 font-semibold cursor-pointer capitalize'>
                    Sign In
                </NavLink>
            </div>
        </div>
    );
};

export default Register;
