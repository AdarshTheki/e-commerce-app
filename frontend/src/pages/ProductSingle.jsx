import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';

import { ProductDetail, ProductList } from '../components';
import { Loader, Button, instance } from '../utils';

const ProductSingle = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchSingleProduct() {
            setLoading(true);
            try {
                const res = await instance.post(`/products/${id}`);
                const { data } = await instance.get(`/products/category/${res?.data?.category}`);
                setProduct(res?.data);
                setRelated(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchSingleProduct();
    }, [id]);

    if (loading) return <Loader />;

    if (!product) return <NotFound />;

    return (
        <div className='max-w-screen-lg mx-auto p-4 h-full'>
            <ProductDetail {...product} />
            <p className='py-5'>
                Our app offers secure payment options, fast delivery, and excellent customer service
                to ensure a smooth shopping experience for all users. From fashion and electronics
                to home decor and beauty products, our app has everything you need in one place.
                Download our ecommerce app now and start shopping with ease!
            </p>
            <ProductList checkStatus={loading} name={product?.category} products={related} />
        </div>
    );
};

export default ProductSingle;

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col items-center gap-5 justify-center min-h-[300px] max-w-[600px] mx-auto'>
            <Button onClick={() => navigate(-1)} Icon={<FaArrowLeftLong />} className='scale-150' />
            <p className='text-2xl font-medium text-center'>
                Our e-commerce app, Your Product is Empty
            </p>
            <p className='text-sm text-gray-600 text-center'>
                With a user-friendly interface and a variety of products to choose from, Your
                Product is Empty is the perfect destination for all your online shopping needs.
            </p>
        </div>
    );
};
