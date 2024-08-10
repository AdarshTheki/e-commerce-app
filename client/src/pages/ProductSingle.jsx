import React from 'react';
import { useParams } from 'react-router-dom';

import { ProductDetail, ProductList, ProductEmpty, ReviewList, ReviewForm } from '../components';
import { useProductByIdQuery, useCategoryQuery } from '../redux/apiSlice';
import { Loader } from '../utils';

const ProductSingle = () => {
    const { id } = useParams();
    const { data, isLoading } = useProductByIdQuery(id);
    const { data: categories, isLoading: loading } = useCategoryQuery(data?.category);

    const [edit, setEdit] = React.useState(false);

    if (isLoading) return <Loader />;

    if (!data) return <ProductEmpty />;

    return (
        <>
            <div className='max-w-screen-lg mx-auto p-2'>
                <ProductDetail {...data} />
            </div>

            <hr className='border-b my-10' />

            {/* User Reviews */}
            <div className='max-w-screen-lg mx-auto p-2'>
                {edit && <ReviewForm id={id} onClose={() => setEdit(false)} />}
                <button
                    onClick={() => setEdit(true)}
                    className='py-2 px-4 block mx-auto rounded-lg border text-blue-600 font-medium hover:border-blue-600'>
                    ✭ write and review products
                </button>
                <ReviewList />
            </div>

            <hr className='border-b my-10' />

            {/* Product Related */}
            <div className='max-w-screen-lg mx-auto p-2'>
                <ProductList checkStatus={loading} products={categories} name='You might also like' />
            </div>
        </>
    );
};

export default ProductSingle;
