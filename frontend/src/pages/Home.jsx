import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllProducts, getAllProductsStatus, fetchProducts } from '../redux/productSlice';
import { ProductList } from '../components';
import { status, Slider, bannerImgs } from '../utils';

const ProductSingle = () => {
    const dispatch = useDispatch();
    const [getLimit, setLimit] = useState(10);

    useEffect(() => {
        dispatch(fetchProducts({ limit: getLimit }));
    }, [dispatch, getLimit]);

    const { products } = useSelector(getAllProducts);
    const productStatus = useSelector(getAllProductsStatus);

    // randomizing the products in the list
    const tempProducts = [];
    if (products?.length > 0) {
        for (let i in products) {
            let randomIndex = Math.floor(Math.random() * products.length);

            while (tempProducts.includes(products[randomIndex])) {
                randomIndex = Math.floor(Math.random() * products.length);
            }
            tempProducts[i] = products[randomIndex];
        }
    }

    return (
        <div className=' bg-gray-100'>
            <section>
                <div className='px-8 py-10 text-center space-y-5'>
                    <h1 className='text-4xl text-gray-800 font-extrabold leading-none'>
                        Discover the Latest Trends
                    </h1>
                    <p>
                        Stay connected on-the-go with real-time updates and notifications, making
                        sure you never miss a beat.
                    </p>
                </div>
                <Slider images={bannerImgs} />
            </section>

            <ProductList
                products={tempProducts}
                checkStatus={productStatus}
                name='See your products'
            />

            <button
                disabled={getLimit >= 100}
                onClick={() => setLimit((prev) => prev + 20)}
                className='py-2 ml-5 my-5 px-5 rounded capitalize hover:bg-slate-700 bg-gray-800 disabled:cursor-not-allowed text-white font-semibold'>
                {productStatus === status.loading ? 'loading...' : 'load more'}
            </button>
        </div>
    );
};

export default ProductSingle;
