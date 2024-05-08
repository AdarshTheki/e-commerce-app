import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setSidebar,
    setMode,
    setStatus,
    setDefaultEmail,
    setEmail,
    setBilling,
    setShipping,
} from '../redux/uiSlice';

const Checkout = () => {
    const dispatch = useDispatch();
    const { email, status } = useSelector((state) => state.ui.process);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (user.email) {
            dispatch(setEmail(user?.email));
        }
    }, [dispatch, user.email]);

    return (
        <div>
            {/* customer */}
            <div
                className={`font-medium text-lg py-5 ${status === 'customer' ? '' : 'opacity-50'}`}>
                <span className='px-3 mr-4 py-1.5 rounded-full bg-gray-800 text-white'>1</span>
                <span>Customer</span>
            </div>
            {status === 'customer' ? (
                <div className='pl-12'>
                    <section className='space-x-4'>
                        <span>{email}</span>
                        <span
                            className='font-medium cursor-pointer'
                            onClick={() => dispatch(setEmail(''))}>
                            Log Out
                        </span>
                    </section>
                    <button
                        onClick={() => dispatch(setStatus('delivery'))}
                        className='bg-gray-800 hover:bg-gray-700 text-white px-14 py-2 mt-4 rounded'>
                        Continue to delivery
                    </button>
                </div>
            ) : (
                email && (
                    <section>
                        <span>{email}</span>
                        <span className='font-semibold cursor-pointer ml-3' onClick={() => dispatch(setEmail(''))}>
                            Edit
                        </span>
                    </section>
                )
            )}
            {/* Delivery */}
            <div
                className={`font-medium text-lg py-5 ${status === 'delivery' ? '' : 'opacity-50'}`}>
                <span className='px-3 mr-4 py-1.5 rounded-full bg-gray-800 text-white'>2</span>
                <span>Delivery</span>
            </div>
            {/* Payment */}
            <div className={`font-medium text-lg py-5 ${status === 'payment' ? '' : 'opacity-50'}`}>
                <span className='px-3 mr-4 py-1.5 rounded-full bg-gray-800 text-white'>3</span>
                <span>Payment</span>
            </div>
        </div>
    );
};

export default Checkout;
