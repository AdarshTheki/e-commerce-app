import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllCategories } from '../redux/categorySlice';

const Categories = () => {
    const categories = useSelector(getAllCategories);

    return (
        <>
            {categories?.map((category, index) => (
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
