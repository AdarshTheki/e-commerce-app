import React from 'react';
import { NavLink } from 'react-router-dom';
import ProductEmpty from '../Product/ProductEmpty';
import { useProductsQuery } from '../../redux/apiSlice';
import { formatPrice } from '../../utils';

const TopSearching = () => {
    const { data, isLoading } = useProductsQuery({ sortBy: 'rating' });

    if (isLoading || !data) return <ProductEmpty />;

    return (
        <div className='flex w-full flex-wrap justify-between gap-y-2'>
            {data?.products.map((item) => (
                <NavLink
                    to={`/product/${item._id}`}
                    key={item._id}
                    className='grid max-w-[130px] flex-grow text-sm p-2 border rounded'>
                    <img
                        src={item.images[0]}
                        alt={item.title}
                        width={100}
                        className='max-h-[100px] object-contain'
                    />
                    <p className='line-clamp-1'>{item.title}</p>
                    <p>{formatPrice(item.price)}</p>
                </NavLink>
            ))}
        </div>
    );
};

export default TopSearching;
