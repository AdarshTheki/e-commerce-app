import React, { useState } from 'react';
import { Button, formatPrice } from '../utils/helpers';
import { IoIosClose } from 'react-icons/io';
import { instance } from '../axios/config';
import toast from 'react-hot-toast';
import { removeFromCart } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';

const CartItem = ({
    productId,
    quantity,
    _id,
    title,
    category,
    brand,
    price,
    stock,
    thumbnail,
}) => {
    const dispatch = useDispatch();
    const [qty, setQty] = useState(quantity);
    stock = stock - qty;

    const removeCart = async () => {
        try {
            await instance.delete(`/carts/user/${productId}`);
            toast.success('Item removed from cart successfully');
            dispatch(removeFromCart({ productId }));
        } catch (error) {
            console.log(error);
            toast.error('Failed to remove item from cart');
        }
    };

    return (
        <div className='bg-white relative sm:grid grid-cols-2 items-center justify-between border shadow-xl mb-5 p-2'>
            <div>
                <img src={thumbnail} alt={title} width={200} />
            </div>
            <div className=''>
                <p className='text-xl font-medium'>
                    {title}, ({category})
                </p>
                <p>
                    Brand: {brand} | Stock: {stock}
                </p>
                <section className='space-x-5'>
                    <span>Quantity: </span>
                    <button
                        disabled={qty >= 5}
                        onClick={() => setQty((prev) => prev + 1)}
                        className='disabled:cursor-not-allowed px-2 py-0 text-sm border-2 border-gray-800 bg-gray-800 hover:bg-gray-700 duration-200 rounded text-white font-medium'>
                        +
                    </button>
                    <button className='px-2 py-0 text-sm border-2 border-gray-800  rounded text-gray-800 font-medium'>
                        {qty}
                    </button>
                    <button
                        disabled={qty <= 1}
                        onClick={() => setQty((prev) => prev - 1)}
                        className='disabled:cursor-not-allowed px-2 py-0 text-sm border-2 border-gray-800 bg-gray-800 hover:bg-gray-700 duration-200 rounded text-white font-medium'>
                        -
                    </button>
                </section>
                <p className='text-xl'>
                    {formatPrice(price)} x {qty} = {formatPrice(price * qty)}
                </p>
            </div>
            <Button
                onClick={() => removeCart()}
                Icon={<IoIosClose className='text-3xl' />}
                className=' absolute right-4 top-2'
            />
        </div>
    );
};

export default CartItem;
