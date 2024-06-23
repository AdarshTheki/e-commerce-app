/* eslint-disable react/prop-types */
import React from 'react';
import { useParams } from 'react-router-dom';

import { ProductDetail, ItemList, Empty } from '../components';
import { useProductByIdQuery, useCategoryQuery } from '../redux/apiSlice';
import { Loader } from '../utils';

const ProductSingle = () => {
    const { id } = useParams();
    const { data, isLoading } = useProductByIdQuery(id);

    if (isLoading) return <Loader />;

    if (!data) return <Empty message={'Your Product is Empty'} />;

    return (
        <div className='max-w-screen-lg mx-auto p-4 h-full'>
            <ProductDetail {...data} />
            <p className='py-5'>
                Our app offers secure payment options, fast delivery, and excellent customer service
                to ensure a smooth shopping experience for all users. From fashion and electronics
                to home decor and beauty products, our app has everything you need in one place.
                Download our ecommerce app now and start shopping with ease!
            </p>
            {/* Product Related Section */}
            <ProductRelated category={data?.category} />
        </div>
    );
};

const ProductRelated = ({ category }) => {
    const { data, isLoading } = useCategoryQuery(category);

    return <ItemList checkStatus={isLoading} products={data} name={category} />;
};

export default ProductSingle;
