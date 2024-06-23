import React from 'react';
import { useDispatch } from 'react-redux';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { Inputs, toasts } from '../../utils';
import { setMode } from '../../redux/uiSlice';
import { useLoginMutation } from '../../redux/apiSlice';

const Login = () => {
    const dispatch = useDispatch();
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
        <>
            <h2 className='text-2xl font-semibold mb-4'>Sign In</h2>
            <form onSubmit={handleSubmit(submitForm)} className='space-y-4'>
                <div>
                    <Inputs
                        defaultValue='demouser@gmail.com'
                        label='Email:'
                        type='email'
                        placeholder='Enter your email...'
                        {...register('email', {
                            required: true,
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
                        defaultValue='demouser@12'
                        label='Password:'
                        type={passwordShow ? 'text' : 'password'}
                        placeholder='Enter your password...'
                        {...register('password', {
                            required: true,
                        })}
                    />
                    <span
                        onClick={() => setPasswordShow(!passwordShow)}
                        className='absolute right-5 top-9 text-xl rounded cursor-pointer hover:opacity-90'>
                        {passwordShow ? <FaEyeSlash /> : <FaEye />}
                    </span>
                    {errors.password && (
                        <span className='text-red-500 text-xs'>Keep strong password !</span>
                    )}
                </div>
                <p
                    className='cursor-pointer hover:text-indigo-600'
                    onClick={() => dispatch(setMode('change-password'))}>
                    Change password?
                </p>
                <Inputs
                    type='submit'
                    value={isLoading ? 'Loading...' : 'Login'}
                    className='bg-gray-800  text-white font-medium hover:bg-gray-700 cursor-pointer'
                />
                <div className='mx-auto space-x-2'>
                    <span>Do not have a account?</span>
                    <span
                        onClick={() => dispatch(setMode('register'))}
                        className='text-center text-gray-800 hover:text-indigo-600 font-semibold cursor-pointer capitalize'>
                        Sign Up
                    </span>
                </div>
            </form>
        </>
    );
};

export default Login;
