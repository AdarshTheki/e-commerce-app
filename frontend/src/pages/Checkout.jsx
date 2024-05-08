import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStatus, setEmail, setShipping, setBilling } from '../redux/uiSlice';
import { Delivery, Customer, Payment } from '../components';

const Checkout = () => {
    const dispatch = useDispatch();
    const { email, status, shipping, billing } = useSelector((state) => state.ui.process);
    const user = useSelector((state) => state.auth.user);

    return (
        <div className=' max-w-screen-lg px-5 space-y-5 mx-auto'>
            {/* customer */}
            <div className='p-4 shadow'>
                <div
                    className={`font-medium text-lg py-5 ${
                        status === 'customer' ? '' : 'opacity-50'
                    }`}>
                    <span className='px-3 mr-4 py-1.5 rounded-full bg-gray-800 text-white'>1</span>
                    <span>Customer</span>
                </div>
                {status === 'customer' ? <Customer /> : email && <strong>{email || '#NA'}</strong>}
            </div>
            {/* Delivery */}
            <div className='p-4 shadow'>
                <div
                    className={`font-medium text-lg py-5 ${
                        status === 'delivery' ? '' : 'opacity-50'
                    }`}>
                    <span className='px-3 mr-4 py-1.5 rounded-full bg-gray-800 text-white'>2</span>
                    <span>Delivery</span>
                </div>
                {status === 'delivery' ? (
                    <Delivery />
                ) : (
                    shipping.fullName && (
                        <strong>{`${shipping.fullName}, ${shipping.address}, ${shipping.company}, ${shipping.country} ${shipping.postcode},`}</strong>
                    )
                )}
            </div>
            {/* Payment */}
            <div className='p-4 shadow'>
                <div
                    className={`font-medium text-lg py-5 ${
                        status === 'payment' ? '' : 'opacity-50'
                    }`}>
                    <span className='px-3 mr-4 py-1.5 rounded-full bg-gray-800 text-white'>3</span>
                    <span>Payment</span>
                </div>
                {status === 'payment' ? <Payment /> : billing && <p>Payment</p>}
            </div>
        </div>
    );
};

export default Checkout;
