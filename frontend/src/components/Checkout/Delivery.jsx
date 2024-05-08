import React, { forwardRef, useId } from 'react';
import { useForm } from 'react-hook-form';
import { setShipping, setStatus } from '../../redux/uiSlice';
import { useDispatch } from 'react-redux';

const Inputs = forwardRef(function Inputs(
    { label, type = 'text', error, message, className = '', ...props },
    ref
) {
    const id = useId();
    return (
        <div className='relative mb-4'>
            <label
                htmlFor={id}
                className='block text-gray-800 hover:text-gray-700 cursor-pointer font-medium text-sm'>
                {label}
            </label>
            <input
                id={id}
                {...props}
                type={type}
                ref={ref}
                className={`w-full px-5 py-2 rounded-md border border-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${className}`}
                autoComplete='off'
            />
            {error && <span className='text-rose-600 capitalize text-xs'>{message}</span>}
        </div>
    );
});

const Delivery = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;

    const submitHandler = async (data) => {
        console.log(data);
        dispatch(setShipping(data));
        dispatch(setStatus('payment'));
    };

    return (
        <div className='sm:pl-12 sm:px-10 px-5'>
            <h2 className='font-semibold mb-4'>Shipping Address</h2>
            <form onSubmit={handleSubmit(submitHandler)} className='max-w-screen-sm'>
                <Inputs
                    defaultValue='Adarsh Verma'
                    label='Full Name'
                    error={errors.fullName}
                    message='please enter a valid inputs !'
                    {...register('fullName', {
                        required: true,
                    })}
                />
                <Inputs
                    defaultValue='Plot No. 706 Ramdespeth Near Dekshboomi'
                    label='Address'
                    error={errors.address}
                    message='please enter a valid inputs !'
                    {...register('address', {
                        required: true,
                    })}
                />
                <Inputs
                    defaultValue='google job posts'
                    label='Additional Information(e.g. Company)'
                    error={errors.company}
                    message='please enter a valid inputs !'
                    {...register('company', {
                        required: true,
                    })}
                />
                <div className='sm:flex gap-5'>
                    <Inputs
                        defaultValue='Nagpur'
                        label='City'
                        error={errors.city}
                        message='please enter a valid inputs !'
                        {...register('city', {
                            required: true,
                        })}
                    />
                    <Inputs
                        defaultValue='Maharashtra'
                        label='State'
                        error={errors.city}
                        message='please enter a valid inputs !'
                        {...register('state', {
                            required: true,
                        })}
                    />
                </div>
                <div className='sm:flex gap-5'>
                    <Inputs
                        defaultValue='440010'
                        label='Postcode'
                        error={errors.postcode}
                        message='please enter a valid inputs !'
                        {...register('postcode', {
                            required: true,
                        })}
                    />
                    <Inputs
                        defaultValue='India'
                        label='Country'
                        error={errors.country}
                        message='please enter a valid inputs !'
                        {...register('country', {
                            required: true,
                        })}
                    />
                </div>
                <Inputs
                    type='submit'
                    value='Submit & Continue to Payment'
                    className='bg-gray-800 my-3 text-white font-medium hover:bg-gray-700 cursor-pointer'
                />
            </form>
        </div>
    );
};

export default Delivery;
