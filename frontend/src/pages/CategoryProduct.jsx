import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    getCategoryProductsStatus,
    getAllProductsByCategory,
    fetchProductsOfCategory,
} from '../redux/categorySlice';
import { ProductList } from '../components';

const CategoryProduct = () => {
    const dispatch = useDispatch();
    const { category } = useParams();

    const productsCategory = useSelector(getAllProductsByCategory);
    const productsCategoryStatus = useSelector(getCategoryProductsStatus);

    useEffect(() => {
        dispatch(fetchProductsOfCategory(category));
    }, [dispatch, category]);

    console.log(productsCategory);

    return (
        <div>
            <ProductList
                checkStatus={productsCategoryStatus}
                products={productsCategory}
                name={category}
            />
        </div>
    );
};

export default CategoryProduct;
