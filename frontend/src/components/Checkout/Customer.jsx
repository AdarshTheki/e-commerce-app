import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCheckout } from '../../redux/uiSlice';

const Customer = () => {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.ui.checkout);
    const user = useSelector((state) => state.auth.user);

    return (
        <div className='p-4 shadow-lg flex flex-col sm:flex-row gap-5 items-start'>
            <span
                className={`w-[40px] h-[40px] flex items-center justify-center text-lg font-medium rounded-full text-white bg-gray-800
                `}>
                1
            </span>
            <div className='space-y-4'>
                <h2 className='text-xl font-medium'>Customer</h2>
                {status === 'customer' && (
                    <>
                        <p>{user?.email || '#NA'}</p>
                        <button
                            onClick={() => dispatch(setCheckout('delivery'))}
                            className='bg-gray-800 hover:bg-gray-700 text-white px-5 py-2 rounded'>
                            Continue to delivery
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Customer;
