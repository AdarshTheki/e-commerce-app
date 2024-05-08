import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllProducts, getAllProductsStatus, fetchProducts } from '../redux/productSlice';
import { ProductList } from '../components';
import { status, Slider } from '../utils';

const ProductSingle = () => {
    const dispatch = useDispatch();
    const [getLimit, setLimit] = useState(10);

    useEffect(() => {
        dispatch(fetchProducts({ limit: getLimit }));
    }, [dispatch, getLimit]);

    const products = useSelector(getAllProducts);
    const productStatus = useSelector(getAllProductsStatus);

    // randomizing the products in the list
    const tempProducts = [];
    if (products.length > 0) {
        for (let i in products) {
            let randomIndex = Math.floor(Math.random() * products.length);

            while (tempProducts.includes(products[randomIndex])) {
                randomIndex = Math.floor(Math.random() * products.length);
            }
            tempProducts[i] = products[randomIndex];
        }
    }

    return (
        <div>
            <section className='md:flex pt-14 max-w-screen-lg mx-auto'>
                <div className='md:w-1/2'>
                    <Slider />
                </div>
                <div className='space-y-8 px-8'>
                    <h1 className='text-4xl text-gray-800 font-extrabold leading-none'>
                        Discover the Latest Mobile Trends
                    </h1>
                    <p className='font-light text-lg'>
                        With a sleek and user-friendly interface, navigating through our app is a
                        breeze. From news updates to product releases, our home page display ensures
                        that you never miss out on any important information.
                    </p>
                    <p>
                        Stay connected on-the-go with real-time updates and notifications, making
                        sure you never miss a beat.
                    </p>
                </div>
            </section>

            <main>
                <ProductList
                    products={tempProducts}
                    checkStatus={productStatus}
                    name='See your products'
                />
            </main>

            <button
                disabled={getLimit >= 100}
                onClick={() => setLimit((prev) => prev + 20)}
                className='py-2 ml-14 my-5 px-5 rounded capitalize bg-gray-800 disabled:cursor-not-allowed text-white font-semibold'>
                {productStatus === status.loading ? 'loading...' : 'load more'}
            </button>
        </div>
    );
};

export default ProductSingle;
