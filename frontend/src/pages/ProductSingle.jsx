import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ProductDetail } from '../components';
import {
    fetchProductSingle,
    getProductSingle,
    getSingleProductStatus,
} from '../redux/productSlice';
import { status, Loader } from '../utils';

const ProductSingle = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const productSingle = useSelector(getProductSingle);
    const productStatus = useSelector(getSingleProductStatus);

    useEffect(() => {
        dispatch(fetchProductSingle(id));
    }, [dispatch, id]);

    return (
        <div className='max-w-screen-lg mx-auto p-4 h-full'>
            {productStatus === status.loading ? <Loader /> : <ProductDetail {...productSingle} />}
            <p className='py-5'>
                Our app offers secure payment options, fast delivery, and excellent customer service
                to ensure a smooth shopping experience for all users. From fashion and electronics
                to home decor and beauty products, our app has everything you need in one place.
                Download our ecommerce app now and start shopping with ease!
            </p>
        </div>
    );
};

export default ProductSingle;
