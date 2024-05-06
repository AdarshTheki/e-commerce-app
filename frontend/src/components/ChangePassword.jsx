import React from 'react';
import { useForm } from 'react-hook-form';
import { IoCloseSharp } from 'react-icons/io5';

import { Inputs, Button, instance, toasts } from '../utils';

const ChangePassword = ({ isPassword, setIsPassword }) => {
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;

    const onSubmitHandler = async (data) => {
        try {
            await instance.patch('/users/change-password', data);
            toasts({ message: 'You password change successfully' });
        } catch (error) {
            toasts({ type: false, message: error?.message || 'Password not change!' });
        }
        setIsPassword(false);
    };

    return (
        <div>
            {/* Change Password */}
            <div
                className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 ${
                    isPassword ? '' : 'hidden'
                }`}>
                <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md relative'>
                    <h2 className='text-2xl font-semibold mb-4'>Change Password</h2>
                    <p className='text-gray-600 mb-4'>
                        Enter your email address and we'll send you a link to Change your password.
                    </p>
                    <form onSubmit={handleSubmit(onSubmitHandler)} className='space-y-2'>
                        <div className='relative'>
                            <Inputs
                                label='Old Password:'
                                type='text'
                                placeholder='Enter your old password...'
                                {...register('oldPassword', {
                                    required: true,
                                    pattern:
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+{};:'",.<>?/\\|[\]~`]).{8,}$/i,
                                })}
                            />
                            {errors.oldPassword && (
                                <span className='text-red-500 text-xs'>
                                    At least one uppercase, lowercase, digit, and one special
                                    character. Keep strong password !
                                </span>
                            )}
                        </div>
                        <div className='relative'>
                            <Inputs
                                label='New Password:'
                                type='text'
                                placeholder='Enter your password...'
                                {...register('newPassword', {
                                    required: true,
                                    pattern:
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+{};:'",.<>?/\\|[\]~`]).{8,}$/i,
                                })}
                            />
                            {errors.newPassword && (
                                <span className='text-red-500 text-xs'>
                                    At least one uppercase, lowercase, digit, and one special
                                    character. Keep strong password !
                                </span>
                            )}
                        </div>
                        <Inputs
                            type='submit'
                            value='Submit Password'
                            className='bg-gray-800 my-3 text-white font-medium hover:bg-gray-700 cursor-pointer'
                        />
                    </form>
                    <Button
                        onClick={() => setIsPassword(false)}
                        Icon={<IoCloseSharp fontSize={25} />}
                        className='absolute top-2 right-2'
                    />
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
