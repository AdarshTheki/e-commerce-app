import React from 'react';
import { useParams } from 'react-router-dom';

import ItemList from '../components/ItemList';
import { useCategoryQuery } from '../redux/apiSlice';

const CategoryProduct = () => {
    const { category } = useParams();
    const { data, isLoading } = useCategoryQuery(category);

    return <ItemList checkStatus={isLoading} products={data} name={category} />;
};

export default CategoryProduct;
