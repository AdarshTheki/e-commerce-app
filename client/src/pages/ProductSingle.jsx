import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
    CardDetail,
    CardLists,
    Empty,
    AddReview,
    DetailList,
    FAQ,
    GetReview,
    Licenses,
} from '../components';
import { useProductByIdQuery, useCategoryQuery } from '../redux/apiSlice';
import { Loader } from '../utils';
import { useSelector } from 'react-redux';

const ProductSingle = () => {
    const { id } = useParams();
    const { user } = useSelector((state) => state.auth);
    const { data, isLoading } = useProductByIdQuery(id);

    const tabs = [
        { id: 1, label: 'More Detail', component: React.memo(DetailList) },
        { id: 2, label: 'Get Reviews', component: React.memo(GetReview) },
        { id: 3, label: 'FQA', component: React.memo(FAQ) },
        { id: 4, label: 'Licenses', component: React.memo(Licenses) },
        { id: 5, label: 'Add Review', component: React.memo(AddReview) },
    ];

    const [selected, setSelected] = useState(tabs[0].id);

    const SelectedComponent = tabs.find((tab) => tab.id === selected)?.component || null;

    if (isLoading) return <Loader />;

    if (!data) return <Empty message={'Your Product is Empty'} />;

    return (
        <div className='max-w-screen-lg mx-auto p-2'>
            <CardDetail {...data} />
            {/* Tab Section */}
            <section className='flex sm:gap-10 overflow-x-auto gap-5 px-4 border-b items-center'>
                {tabs.map((i) => (
                    <h1
                        key={i.id}
                        className={`font-medium capitalize text-nowrap border-b-2 cursor-pointer hover:bg-gray-100 py-4 sm:text-lg border-transparent ${
                            selected === i.id ? 'text-blue-600 border-blue-600' : ''
                        }`}
                        onClick={() => setSelected(i.id)}>
                        {i.label}
                    </h1>
                ))}
            </section>
            <div className='py-5 space-y-4'>
                {SelectedComponent && <SelectedComponent productId={id} user={user} />}
            </div>
            {/* Product Related */}
            <ProductRelated category={data?.category} />
        </div>
    );
};
export default ProductSingle;

const ProductRelated = ({ category }) => {
    const { data, isLoading } = useCategoryQuery(category);
    return <CardLists checkStatus={isLoading} products={data} name={'You might also like'} />;
};
