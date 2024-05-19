import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { Loader, formatPrice, instance, toasts, Button } from '../utils';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { RiDeleteBinLine } from 'react-icons/ri';

const Cart = () => {
    const navigate = useNavigate();
    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchCarts() {
            try {
                setLoading(true);
                const { data } = await instance.get('/carts/user');
                setCarts(data.products);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchCarts();
    }, []);

    let totalPrice = carts?.reduce((prev, curr) => prev + curr.totalPrice, 0);
    let totalQty = carts?.reduce((prev, curr) => prev + curr.quantity, 0);
    let discountedPrice = carts?.reduce((prev, curr) => prev + curr.discountedPrice, 0);

    const removeAllItems = async () => {
        try {
            setCarts([]);
            await instance.delete('/carts/remove');
            toasts({ message: 'All items removed' });
        } catch (error) {
            toasts({ type: false, message: 'Failed to remove items' });
        }
    };

    const removeCart = async (id) => {
        try {
            setCarts((prev) => prev.filter((i) => i._id !== id));
            await instance.delete(`/carts/user/${id}`);
            toasts({ message: 'Item removed from cart' });
        } catch (error) {
            toasts({ type: false, message: 'Failed to remove item' });
        }
    };

    if (loading) return <Loader />;

    if (!carts || carts?.length === 0) {
        return (
            <div className='flex flex-col items-center gap-5 justify-center min-h-[300px] max-w-[600px] mx-auto'>
                <Button
                    onClick={() => navigate(-1)}
                    Icon={<FaArrowLeftLong />}
                    className='scale-150'
                />
                <p className='text-2xl font-medium text-center'>
                    Our e-commerce app, Your Cart is Empty
                </p>
                <p className='text-sm text-gray-600 text-center'>
                    With a user-friendly interface and a variety of products to choose from, Your
                    Cart is Empty is the perfect destination for all your online shopping needs.
                </p>
            </div>
        );
    }

    return (
        <div className='bg-gray-100 py-5'>
            <div className='sm:gap-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4'>
                {carts?.map((item) => {
                    const {
                        _id,
                        title,
                        price,
                        quantity,
                        totalPrice,
                        discountPercentage,
                        discountedPrice,
                        thumbnail,
                    } = item;
                    return (
                        <div
                            key={_id}
                            className='relative grid content-between p-4 shadow-2xl rounded-xl'>
                            <div className='relative max-h-[170px]'>
                                <img src={thumbnail} alt={title} className='h-full rounded-xl' />
                                <p className=' absolute top-0 bg-green-600 text-sm text-white font-medium py-1 px-3'>
                                    {discountPercentage}% off
                                </p>
                            </div>
                            <div className='mt-2'>
                                <p className='font-medium text-wrap'>{title} </p>
                                <p>
                                    {quantity} x {formatPrice(price)}
                                </p>
                                <p className='sm:text-2xl text-base text-wrap font-medium'>
                                    {formatPrice(discountedPrice)}
                                    <span className='pl-2 text-rose-600 line-through text-sm'>
                                        {formatPrice(totalPrice)}
                                    </span>
                                </p>
                            </div>
                            <Button
                                onClick={() => removeCart(_id)}
                                Icon={<RiDeleteBinLine className='text-xl text-red-600' />}
                                className=' absolute right-4 p-0 top-4'
                            />
                        </div>
                    );
                })}
            </div>
            {/* Products Counts */}
            <div className='sm:flex justify-between items-center px-5 py-4'>
                <div>
                    <p>
                        Total Products: <strong>{carts.length}</strong>
                    </p>
                    <p>
                        Total Quantity: <strong>{totalQty}</strong>
                    </p>
                    <p>
                        Total Price: <strong>{formatPrice(totalPrice)}</strong>
                    </p>
                    <p>
                        Discounted Price: <strong>{formatPrice(discountedPrice)}</strong>
                    </p>
                </div>
                <button
                    onClick={removeAllItems}
                    className='py-2 px-5 rounded capitalize hover:bg-rose-700 bg-rose-600 text-white font-semibold'>
                    Clear All
                </button>
            </div>
            <div className='py-5 mx-auto w-fit'>
                <NavLink
                    to='/checkout'
                    className='py-2 px-5 rounded capitalize hover:bg-slate-700 bg-gray-800 text-white font-semibold'>
                    Checkout process
                </NavLink>
            </div>
        </div>
    );
};

export default Cart;
