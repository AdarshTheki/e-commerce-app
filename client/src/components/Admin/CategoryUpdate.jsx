import React from 'react';
import Form from './Form';
import { useParams } from 'react-router-dom';
import { useGetCategoryQuery } from '../../redux/apiSlice';

const CategoryUpdate = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useGetCategoryQuery(id);

    if (isLoading) return <h2>Loading...</h2>;

    if (isError) return <h2>Something was wrong!...</h2>;

    return (
        <div>
            <Form {...data?.data} type='category' />
        </div>
    );
};

export default CategoryUpdate;
