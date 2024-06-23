import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCategoryListQuery } from '../redux/apiSlice';

const Categories = () => {
    const { data, isLoading } = useCategoryListQuery();

    if (isLoading) return <p>Loading...</p>;

    return (
        <>
            {data?.map((category, index) => (
                <NavLink
                    key={index}
                    to={`/category/${category}`}
                    className='block text-nowrap px-4 py-2 sm:p-0 text-sm capitalize hover:bg-gray-800'>
                    {category?.replace('-', ' ')}
                </NavLink>
            ))}
        </>
    );
};

export default Categories;
