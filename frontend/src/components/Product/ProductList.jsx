/* eslint-disable react/prop-types */
import React from 'react';
import { NavLink } from 'react-router-dom';

import { formatPrice, status, Loader } from '../../utils';

export default function Container({ checkStatus, name = '', products = [] }) {
    return (
        <div className='min-h-screen w-full'>
            <h2 className='capitalize text-2xl font-semibold mb-4'>
                Our {name?.replace('-', ' ')}
            </h2>
            {checkStatus === status?.loading ? (
                <Loader />
            ) : (
                <div className='w-full max-w-screen-xl mx-auto relative grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4'>
                    {products?.map((product) => {
                        const { price, discount, title, _id, images, brand } = product;
                        let discountPrice = price - price * (discount / 100);
                        return (
                            <NavLink
                                to={`/product/${_id}`}
                                key={_id}
                                className=' bg-white shadow-xl duration-300 relative text-wrap p-4 capitalize rounded-xl flex flex-col'>
                                <div className='h-[180px] overflow-hidden relative'>
                                    <img
                                        className='mx-auto rounded'
                                        src={images[0] || images[1]}
                                        alt={_id}
                                    />
                                    <p className='text-white absolute text-xs bottom-4 left-3 font-semibold mx-auto w-fit px-2 py-1 bg-rose-700'>
                                        -{discount}%
                                    </p>
                                </div>
                                <div className='text-gray-800 pl-2 pt-2'>
                                    <p className='text-amber-500 font-semibold text-sm'>{brand}</p>
                                    <p className='line-clamp-2'>{title}</p>
                                    <section className='space-x-2 pb-2 text-sm font-medium'>
                                        <span>{formatPrice(discountPrice)}</span>
                                        <span className='text-rose-600 line-through'>
                                            {formatPrice(price)}
                                        </span>
                                    </section>
                                </div>
                            </NavLink>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
