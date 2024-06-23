/* eslint-disable react/prop-types */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CircleMinus, CirclePlus, Trash2, ShoppingBag, Heart } from 'lucide-react';

import { Empty } from '../components';
import Item from '../components/Item';
import {
    decreaseQuantity,
    increaseQuantity,
    moveToCart,
    removeItem,
    updateItemQuantity,
} from '../redux/cartSlice';
import { Button } from '../utils';

const CartPage = () => {
    const { items } = useSelector((state) => state.cart);

    const cart = items?.filter((item) => item.flag);
    const filterCart = items?.filter((item) => !item.flag);

    return (
        <div className='bg-gray-100 py-5'>
            <div className='max-w-screen-lg mx-auto px-2'>
                <h2 className='capitalize font-semibold text-xl sm:text-3xl pb-3'>
                    save Cart ( {cart.length} item )
                </h2>
                {/* Cart Item */}
                {!cart?.length && <Empty message={'Your Cart is Empty'} />}
                <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4'>
                    {cart?.map((item) => (
                        <CartItem key={item._id} item={item} />
                    ))}
                </div>
                <br />
                <NavLink
                    to='/checkout'
                    className='my-5 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white'>
                    Checkout process ({cart.length})
                </NavLink>
            </div>

            <hr className='border my-10' />

            {/* Save Latter */}
            {filterCart?.length && (
                <div className='max-w-screen-lg mx-auto px-2'>
                    <h2 className='capitalize font-semibold text-xl sm:text-3xl pb-3'>
                        save Latter ( {filterCart.length} item )
                    </h2>
                    <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4'>
                        {filterCart?.map((item) => (
                            <CartItem key={item._id} item={item} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;

const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    return (
        <div key={item._id} className='relative'>
            <button
                onClick={() => dispatch(removeItem(item._id))}
                className='absolute z-10 top-3 right-5 p-2 rounded-lg bg-red-600 font-semibold'>
                <Trash2 color='#fff' />
            </button>
            <Item {...item} />
            {item.flag && (
                <div className='sm:flex justify-between items-center px-4 py-2'>
                    <p className='font-medium'>Quantity: {item.quantity}</p>
                    <div className='flex items-center gap-1'>
                        <button onClick={() => dispatch(increaseQuantity(item._id))}>
                            <CirclePlus fill='#fff' color='#111' />
                        </button>
                        <input
                            type='text'
                            value={item.quantity}
                            onChange={(e) => {
                                let value = Number(e.target.value);
                                dispatch(
                                    updateItemQuantity({
                                        _id: item._id,
                                        quantity: isNaN(value) ? 1 : value,
                                    })
                                );
                            }}
                            className='w-10 rounded border border-gray-400 px-1 font-semibold text-center'
                        />
                        <button onClick={() => dispatch(decreaseQuantity(item._id))}>
                            <CircleMinus fill='#fff' color='#111' />
                        </button>
                    </div>
                </div>
            )}
            <Button
                leftIcon={!item.flag ? <ShoppingBag /> : <Heart />}
                className='bg-gray-200 hover:bg-gray-300 w-full justify-center mx-auto'
                onClick={() => dispatch(moveToCart(item._id))}>
                {!item.flag ? 'Move to cart' : 'Save for latter'}
            </Button>
        </div>
    );
};
