import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { setCheckout } from '../../redux/uiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { instance, Inputs, toasts } from '../../utils';

const Delivery = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const [edit, setEdit] = useState(false);
    const status = useSelector((state) => state.ui.checkout);

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const res = await instance.get('/address');
                setData(res.data);
            } catch (error) {
                console.log(error?.message);
            }
        };
        fetchAddress();
    }, []);

    let address = Object.values({
        fullName: data.fullName,
        streetAddress: data.streetAddress,
        city: data.city,
        state: data.state,
        country: data.country,
        postalCode: data.postalCode,
        phoneNumber: data.phoneNumber,
    });

    return (
        <div className='p-4 shadow-lg flex flex-col sm:flex-row gap-5 items-start'>
            <span className='w-[40px] h-[40px] flex items-center justify-center text-lg font-medium rounded-full text-white bg-gray-800'>
                2
            </span>
            <div className='space-y-4'>
                <h2 className='text-xl font-medium'>Delivery</h2>
                {status === 'delivery' ? (
                    data.fullName && !edit ? (
                        <>
                            <div>
                                <p>{address.map((i) => i).join(', ')}</p>
                                <button
                                    onClick={() => setEdit(true)}
                                    className='text-indigo-600 font-medium cursor-pointer'>
                                    Edit
                                </button>
                            </div>
                            <button
                                onClick={() => dispatch(setCheckout('payment'))}
                                className='bg-gray-800 hover:bg-gray-700 text-white px-5 py-2 rounded'>
                                Continue to Pay
                            </button>
                        </>
                    ) : (
                        <FormData data={data} />
                    )
                ) : null}
            </div>
        </div>
    );
};

export default Delivery;

const FormData = ({ data }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            fullName: data?.fullName || '',
            streetAddress: data?.streetAddress || '',
            city: data?.city || '',
            state: data?.state || '',
            country: data?.country || '',
            postalCode: data?.postalCode || '',
            phoneNumber: data?.phoneNumber || '',
            isDefault: data?.isDefault || '',
        },
    });
    const { errors } = formState;

    const submitHandler = async (data) => {
        try {
            await instance.post('/address/create', data);
            dispatch(setCheckout('payment'));
            toasts({ message: 'Address saved successfully' });
        } catch (error) {
            toasts({ type: false, message: error.message });
        }
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <Inputs
                label='Full Name'
                error={errors.fullName}
                message='Please enter a valid inputs field on fullName'
                {...register('fullName', {
                    required: true,
                })}
            />
            <Inputs
                label='Street Address'
                error={errors.streetAddress}
                message='Please enter a valid inputs field on streetAddress'
                {...register('streetAddress', {
                    required: true,
                })}
            />
            <Inputs
                label='City'
                error={errors.city}
                message='Please enter a valid inputs field on city'
                {...register('city', {
                    required: true,
                })}
            />
            <div className='sm:flex gap-5'>
                <Inputs
                    label='State'
                    error={errors.state}
                    message='Please enter a valid inputs field on state'
                    {...register('state', {
                        required: true,
                    })}
                />
                <Inputs
                    label='Country'
                    error={errors.country}
                    message='Please enter a valid inputs field on country'
                    {...register('country', {
                        required: true,
                    })}
                />
            </div>
            <div className='sm:flex gap-5'>
                <Inputs
                    type='number'
                    label='PostalCode'
                    error={errors.postalCode}
                    message='Please enter a valid inputs field on postalCode'
                    {...register('postalCode', {
                        required: true,
                    })}
                />
                <Inputs
                    type='number'
                    label='Phone No.'
                    error={errors.phoneNumber}
                    message='Please enter a valid inputs field on phoneNumber'
                    {...register('phoneNumber', {
                        required: true,
                    })}
                />
            </div>

            <Inputs
                type='submit'
                value='Submit & Continue to Payment'
                className='bg-gray-800 text-wrap text-white font-medium hover:bg-gray-700 cursor-pointer'
            />
        </form>
    );
};
