import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Loader, CartEmpty, CartItem } from '../components';
import { formatPrice, status, instance, toasts } from '../utils';
import { fetchCarts, getCarts, getCartsStatus, clearCart } from '../redux/cartSlice';

const Cart = () => {
    const dispatch = useDispatch();
    const carts = useSelector(getCarts);
    const cartsStatus = useSelector(getCartsStatus);

    useEffect(() => {
        dispatch(fetchCarts());
    }, [dispatch]);

    const removeAllItems = async () => {
        try {
            await instance.delete('/carts/remove-all');
            dispatch(clearCart());
            toasts({ message: 'All items removed successfully' });
        } catch (error) {
            toasts({ type: false, message: 'Failed to remove all items' });
        }
    };

    let totals = carts.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (carts === 0) return <CartEmpty />;

    return (
        <div>
            <div className='flex justify-between px-5 py-4'>
                <h1 className='text-center text-xl font-semibold text-gray-800'>
                    Totals: {formatPrice(totals)}
                </h1>
                <button
                    onClick={removeAllItems}
                    className='px-3 py-1 bg-rose-600 hover:bg-rose-600/80 font-medium text-white'>
                    Clear All
                </button>
            </div>
            {cartsStatus === status.loading ? (
                <Loader />
            ) : (
                <div className='mx-auto px-5'>
                    {carts?.map((item) => (
                        <CartItem key={item?._id} {...item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cart;
