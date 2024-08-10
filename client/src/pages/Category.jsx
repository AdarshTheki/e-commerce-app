import React from 'react';
import { useParams } from 'react-router-dom';

import { ProductList } from '../components';
import { useCategoryQuery } from '../redux/apiSlice';

const CategoryProduct = () => {
    const { category } = useParams();
    const { data, isLoading } = useCategoryQuery(category);

    return <ProductList checkStatus={isLoading} products={data} name={category} />;
};

export default CategoryProduct;
