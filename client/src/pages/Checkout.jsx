import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCheckoutMutation } from '../redux/apiSlice';

const Checkout = () => {
    const { items } = useSelector((state) => state.cart);

    const cart = items?.filter((item) => item?.flag);
    const totals = cart?.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);

    const [checkout, { isLoading }] = useCheckoutMutation();

    const checkoutHandler = async () => {
        const res = await checkout({ cartItems: cart });
        window.location.href = res.data;
    };

    return (
        <>
            <div className='flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32'>
                <NavLink to='/' className='text-2xl font-bold text-gray-800'>
                    ShopUp
                </NavLink>
            </div>
            <div className='grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32'>
                <div className='px-4 pt-8'>
                    <p className='text-xl font-medium'>Order Summary</p>
                    <p className='text-gray-400'>
                        Check your items. And select a suitable shipping method.
                    </p>
                    <div className='mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6'>
                        {cart?.map((item) => (
                            <div
                                key={item._id}
                                className='flex flex-col rounded-lg bg-white sm:flex-row'>
                                <img
                                    className='m-2 h-24 w-28 rounded-md border object-cover object-center'
                                    src={item?.thumbnail}
                                    alt={item.title}
                                />
                                <div className='flex w-full flex-col px-4 py-4'>
                                    <span className='font-semibold'>{item.title}</span>
                                    <span className='float-right text-gray-400'>
                                        {item.discount}% Discount
                                    </span>
                                    <span className='float-right text-gray-400'>
                                        Brand: {item.brand}
                                    </span>
                                    <p className='text-lg font-bold text-gray-800'>
                                        {item.price} X {item.quantity} = $
                                        {item.price * item.quantity}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='relative'>
                        {/* <!-- Total --> */}
                        <div className='mt-6 border-t border-b py-2'>
                            <div className='flex items-center justify-between'>
                                <p className='font-medium text-gray-900'>Subtotal</p>
                                <p className='font-semibold text-gray-900'>${totals}</p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p className='font-medium text-gray-900'>Shipping</p>
                                <p className='font-semibold text-gray-900'>- $20.00</p>
                            </div>
                        </div>
                        <div className='mt-6 flex items-center justify-between'>
                            <p className='font-medium text-gray-900'>Total</p>
                            <p className='text-2xl font-semibold text-gray-900'>${totals + 20}</p>
                        </div>
                    </div>
                    <button
                        onClick={checkoutHandler}
                        className='mt-4 mb-8 w-full rounded-md bg-gray-900 hover:bg-gray-800 px-6 py-3 font-medium text-white'>
                        {isLoading ? 'Loading...' : 'Place Order'}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Checkout;
