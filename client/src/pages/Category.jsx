import React from 'react';
import { useParams } from 'react-router-dom';

import { ProductList } from '../components';
import { useCategoryQuery } from '../redux/apiSlice';

const CategoryProduct = () => {
    const { category } = useParams();
    const { data, isLoading } = useCategoryQuery(category);

    return (
        <div className='py-10 max-w-screen-lg mx-auto'>
            <ProductList checkStatus={isLoading} products={data} name={category} />
        </div>
    );
};

export default CategoryProduct;
