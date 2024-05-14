import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeftLong } from 'react-icons/fa6';

import { ProductDetail } from '../components';
import {
    fetchProductSingle,
    getProductSingle,
    getSingleProductStatus,
} from '../redux/productSlice';
import { status, Loader, Button } from '../utils';

const ProductSingle = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const productSingle = useSelector(getProductSingle);
    const productStatus = useSelector(getSingleProductStatus);

    useEffect(() => {
        dispatch(fetchProductSingle(id));
    }, [dispatch, id]);

    if (!productSingle) {
        return (
            <div className='flex flex-col items-center gap-5 justify-center min-h-[300px] w-[600px] mx-auto'>
                <Button
                    onClick={() => navigate(-1)}
                    Icon={<FaArrowLeftLong />}
                    className='scale-150'
                />
                <p className='text-2xl font-medium text-center'>
                    Our e-commerce app, Your Product is Empty
                </p>
                <p className='text-sm text-gray-600 text-center'>
                    With a user-friendly interface and a variety of products to choose from, Your
                    Product is Empty is the perfect destination for all your online shopping needs.
                </p>
            </div>
        );
    }

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
