import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { removeItem } from '../redux/cartSlice';

let flag = true;

const SuccessOrderPage = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.cart);

    const cart = items?.filter((i) => i?.flag);

    React.useEffect(() => {
        if (flag) {
            cart?.map((i) => dispatch(removeItem(i._id)));
            flag = false;
        }
    }, [cart, dispatch]);

    return (
        <div className='flex items-center justify-center py-10 bg-gray-100'>
            <div className='max-w-md w-full bg-white shadow-md rounded-lg p-8'>
                <h2 className='text-3xl font-semibold text-green-600 text-center mb-4'>
                    Order Successful!
                </h2>
                <p className='text-lg text-gray-700 mb-4 text-center'>
                    Thank you for your purchase. Your order has been successfully processed.
                </p>
                <div className='flex flex-col items-center space-y-1'>
                    <p>
                        <span className='font-semibold'>Date:</span> {new Date().toDateString()}
                    </p>
                </div>

                <NavLink
                    to={'/'}
                    className='w-fit block mx-auto bg-gray-800 hover:bg-gray-700 text-white px-14 py-2 mt-4 rounded'>
                    Go Back Home
                </NavLink>
            </div>
        </div>
    );
};

export default SuccessOrderPage;
