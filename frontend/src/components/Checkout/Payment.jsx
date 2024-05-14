import React, { useState } from 'react';
import { instance, toasts, Inputs } from '../../utils';
import { clearCart } from '../../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const [loading, setLoading] = useState(false);
    const carts = useSelector((state) => state.cart.carts);
    const status = useSelector((state) => state.ui.checkout);
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orderPlace = async () => {
        try {
            setLoading(true);
            const totals = carts.reduce((acc, item) => acc + item.price * item.quantity, 0);
            const { data } = await instance.post('/orders/checkout', { totals });
            dispatch(clearCart());
            toasts({ message: 'Your Order Successful' });
            navigate(`/order/success?refrence=${data.newOrder._id}`);
        } catch (error) {
            toasts({ type: false, message: 'Your Order Failed' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-4 shadow-lg flex flex-col sm:flex-row gap-5 items-start'>
            <span className='w-[40px] h-[40px] flex items-center justify-center text-lg font-medium rounded-full text-white bg-gray-800'>
                3
            </span>
            <div className='space-y-4'>
                <h2 className='text-xl font-medium'>Payment Method</h2>
                {status === 'payment' && (
                    <form onSubmit={handleSubmit(orderPlace)}>
                        <Inputs
                            defaultValue='5105 1051 0510 5100'
                            label='Cart Number'
                            {...register('cartNumber', { required: true })}
                        />
                        <div className='sm:flex gap-5'>
                            <Inputs
                                defaultValue='11/28'
                                label='Expire Date'
                                error={errors.date}
                                message='Please enter a valid inputs date'
                                {...register('date', { required: true })}
                            />
                            <Inputs
                                defaultValue='123'
                                label='CVV'
                                type='password'
                                error={errors.date}
                                message='Please enter a valid inputs CVV'
                                {...register('cvv', { required: true })}
                            />
                        </div>
                        <Inputs
                            type='submit'
                            value={loading ? 'Loading...' : 'Pay Order'}
                            className='bg-gray-800 text-white cursor-pointer hover:bg-gray-600'
                        />
                    </form>
                )}
            </div>
        </div>
    );
};

export default Payment;
