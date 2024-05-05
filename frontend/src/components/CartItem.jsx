import React from 'react';
import { Button, formatPrice, instance, toasts } from '../utils';
import { IoIosClose } from 'react-icons/io';
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
    let qty = quantity;
    stock = stock - qty;

    const removeCart = async () => {
        try {
            await instance.delete(`/carts/user/${productId}`);
            toasts({ message: 'Item removed from cart successfully' });
            dispatch(removeFromCart({ productId }));
        } catch (error) {
            toasts({ type: false, message: 'Failed to remove item from cart' });
        }
    };

    return (
        <div className='bg-white text-gray-800 relative sm:grid grid-cols-2 items-center justify-between border shadow-xl mb-5 p-4'>
            <div>
                <img src={thumbnail} alt={title} width={200} />
            </div>
            <div className=''>
                <p className='text-xl font-medium'>
                    {title}, ({category})
                </p>
                <p>
                    Brand: {brand} | Stock: {stock} Qty: {qty}
                </p>
                <p>
                    Price: {formatPrice(price)} x {qty}
                </p>
                <p className='font-medium'>Total: {formatPrice(price * qty)}</p>
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
