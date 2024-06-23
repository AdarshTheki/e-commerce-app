import React from 'react';
import { NavLink } from 'react-router-dom';
import { formatPrice } from '../utils';

const Item = ({ _id, thumbnail, images, discount, brand, title, price }) => {
    const url = thumbnail ? thumbnail : images[0];
    return (
        <>
            <NavLink
                to={`/product/${_id}`}
                key={_id}
                className='bg-white border border-gray-200 relative py-4 capitalize rounded-lg grid items-stretch'>
                <div className='sm:h-[180px] h-[100px] overflow-hidden relative bg-white'>
                    <img className='mx-auto rounded max-h-[200px]' src={url} alt={title} />
                    <p className='text-white bg-rose-600 px-2 py-1 rounded absolute text-xs bottom-0 left-4 font-semibold'>
                        -{discount}%
                    </p>
                </div>
                <div className='text-gray-800 grid gap-1 pt-5 px-4'>
                    <p className='text-amber-500'>{brand}</p>
                    <p className='line-clamp-1 font-medium'>{title}</p>
                    <section className='space-x-2 pb-2 text-sm font-medium'>
                        <strong>{formatPrice(price - price * (discount / 100))}</strong>
                        <span className='text-rose-600 line-through hidden sm:inline'>
                            {formatPrice(price)}
                        </span>
                    </section>
                </div>
            </NavLink>
        </>
    );
};

export default Item;
