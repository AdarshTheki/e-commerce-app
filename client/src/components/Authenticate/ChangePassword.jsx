import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { Inputs, toasts } from '../../utils';
import { setMode } from '../../redux/uiSlice';
import { useChangePasswordMutation } from '../../redux/apiSlice';

const ChangePassword = () => {
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    const dispatch = useDispatch();
    const [changePassword, { isError, error }] = useChangePasswordMutation();

    const onSubmitHandler = async (data) => {
        await changePassword(data).unwrap();
        if (isError) {
            toasts({ type: true, message: error.message });
        } else {
            toasts({ message: 'You password change successfully' });
            dispatch(setMode(''));
        }
    };

    return (
        <>
            <h2 className='text-2xl font-semibold mb-4'>Change Password</h2>
            <p className='text-gray-600 mb-4'>
                Enter your email address and we'll send you a link to Change your password.
            </p>
            <form onSubmit={handleSubmit(onSubmitHandler)} className='space-y-2'>
                <Inputs
                    label='Email'
                    type='email'
                    placeholder='Enter your old password...'
                    {...register('email', {
                        required: true,
                    })}
                />
                {errors.email && (
                    <span className='text-red-500 text-xs'>This filed is required!</span>
                )}
                <Inputs
                    label='Old Password'
                    type='text'
                    placeholder='Enter your old password...'
                    {...register('oldPassword', {
                        required: true,
                    })}
                />
                {errors.oldPassword && (
                    <span className='text-red-500 text-xs'>Keep strong password !</span>
                )}
                <Inputs
                    label='New Password'
                    type='text'
                    placeholder='Enter your password...'
                    {...register('newPassword', {
                        required: true,
                    })}
                />
                {errors.newPassword && (
                    <span className='text-red-500 text-xs'>Keep strong password !</span>
                )}
                <Inputs
                    type='submit'
                    value='Submit Password'
                    className='bg-gray-800 my-3 text-white font-medium hover:bg-gray-700 cursor-pointer'
                />
            </form>
        </>
    );
};

export default ChangePassword;
