/* eslint-disable react/prop-types */
import React from 'react';
import { formatPrice, status } from '../utils';
import { NavLink } from 'react-router-dom';
import Loader from './Loader';

export default function Container({ checkStatus, name = '', products = [] }) {
    return (
        <div className='min-h-screen w-full py-10 px-5 bg-gray-200'>
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
                                className='bg-white hover:shadow-xl duration-300 relative text-wrap p-2 capitalize rounded-xl flex flex-col items-center justify-center'>
                                <div className='h-[180px] overflow-hidden p-2'>
                                    <img
                                        className='h-full mx-auto'
                                        src={images[0] || images[1]}
                                        alt={_id}
                                    />
                                </div>
                                <div className='text-gray-800 text-center'>
                                    <p className='font-medium line-clamp-2'>{title}</p>
                                    <p className='py-1 text-sm'>
                                        Brand: <span className='font-medium'>{brand}</span>
                                    </p>
                                    <p className='text-white absolute text-sm top-3 right-3 font-semibold block mx-auto w-fit px-2 rounded bg-green-700/90'>
                                        {discount} off
                                    </p>
                                    <section className='space-x-2 pb-2 text-sm'>
                                        <span className='text-rose-600 line-through'>
                                            {formatPrice(price)}
                                        </span>
                                        <span className='font-medium text-base'>
                                            {formatPrice(discountPrice)}
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
