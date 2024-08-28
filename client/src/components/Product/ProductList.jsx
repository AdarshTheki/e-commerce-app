/* eslint-disable react/prop-types */
import { Loader } from '../../utils';
import ProductItem from './ProductItem';
import ProductEmpty from './ProductEmpty';
import { useEffect } from 'react';

export default function ProductList({ checkStatus = false, name = 'Products', products = [] }) {
    if (checkStatus) return <Loader />;

    if (!products.length) return <ProductEmpty />;

    return (
        <div className='max-w-screen-xl mx-auto'>
            <h2 className='capitalize text-2xl font-semibold mb-4'>
                Our {name?.replace('-', ' ')}
            </h2>
            <div className='w-full relative grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-4 gap-2'>
                {products?.map((product) => (
                    <ProductItem {...product} key={product._id} />
                ))}
            </div>
        </div>
    );
}
