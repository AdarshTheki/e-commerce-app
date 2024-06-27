/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Star } from '../../utils';
import { useSelector } from 'react-redux';
import { useHandleWishlistMutation } from '../../redux/apiSlice';
import { Heart } from 'lucide-react';

const Item = ({ _id, thumbnail, discount, rating, title, price }) => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [wishlist, setWishlist] = useState(user?.wishlist?.includes(_id));
    const [handleWishlist, { isLoading }] = useHandleWishlistMutation();

    const onWishlist = async () => {
        try {
            if (!user) return navigate('/login');

            await handleWishlist(_id);
            setWishlist(!wishlist);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className='bg-white border border-gray-200 relative capitalize rounded-lg grid items-stretch'>
            <div className='absolute z-20 top-4 right-4'>
                {isLoading ? (
                    <div role='status'>
                        <svg
                            aria-hidden='true'
                            className='w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                            viewBox='0 0 100 101'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                                fill='currentColor'
                            />
                            <path
                                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                                fill='currentFill'
                            />
                        </svg>
                        <span className='sr-only'>Loading...</span>
                    </div>
                ) : (
                    <button onClick={onWishlist} className='hover:opacity-80'>
                        {wishlist ? <Heart color='#FF0000' fill='#FF0000' /> : <Heart />}
                    </button>
                )}
            </div>

            <div className='sm:h-[180px] h-[100px] overflow-hidden bg-white'>
                <img
                    className='mx-auto rounded max-h-[200px] w-full'
                    src={
                        thumbnail
                            ? thumbnail
                            : 'https://dummyjson.com/image/400x300/aaaaaa/ffffff?text=Not+Found'
                    }
                    alt={title}
                />
            </div>
            <div className='text-gray-800 grid gap-1 p-4'>
                <NavLink
                    to={`/product/${_id}`}
                    className='sm:text-lg text-blue-700 hover:text-blue-900 font-extrabold'>
                    {title.substring(0, 20)}
                </NavLink>
                <div className='inline sm:hidden'>
                    <span className='text-[#ffa534] text-xl'>★</span> {rating?.toFixed(1)}/5
                </div>
                <div className='sm:inline hidden'>
                    <Star rating={rating} />
                </div>
                <p className='space-x-2'>
                    <span className='sm:text-xl font-extrabold'>
                        ${Math.round(price - price * (discount / 100))}
                    </span>
                    <span className='sm:text-xl hidden sm:inline font-extrabold text-gray-400'>
                        ${Math.round(price)}
                    </span>
                    <span className='text-rose-600 bg-red-100 text-xs px-3 py-1 rounded-xl'>
                        {discount}%
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Item;
