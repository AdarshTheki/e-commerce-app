import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Delivery, Customer, Payment } from '../components';
import { setCheckout } from '../redux/uiSlice';

const Checkout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCheckout('customer'));
    }, [dispatch]);

    return (
        <div className='max-w-screen-lg px-5 space-y-5 mx-auto'>
            {/* customer */}
            <Customer />
            {/* Delivery */}
            <Delivery />
            {/* Payment */}
            <Payment />
        </div>
    );
};

export default Checkout;
