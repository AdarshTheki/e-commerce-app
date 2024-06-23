import { useCallback } from 'react';

import { Loader, Slider, bannerImgs } from '../utils';
import { useCategoryQuery } from '../redux/apiSlice';
import Item from '../components/Item';

const ProductSingle = () => {
    const { data: furniture } = useCategoryQuery('furniture');
    const { data: mensShoes } = useCategoryQuery('mens-shoes');
    const { data: laptops } = useCategoryQuery('laptops');
    const { data: mensWatches, isLoading, isError, error } = useCategoryQuery('mens-watches');

    const ProductLists = useCallback(({ items = [], name = '' }) => {
        return (
            <div className='py-4'>
                <h2 className='text-3xl font-semibold pl-5 capitalize'>{name}</h2>
                <div className='flex gap-4 w-full no-scrollbar'>
                    {items.map((item) => (
                        <div
                            key={item._id}
                            className='sm:min-w-[250px] sm:max-w-[260px] min-w-[200px]'>
                            <Item {...item} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }, []);

    if (isLoading) return <Loader />;

    return (
        <div className='w-full overflow-hidden'>
            <section>
                <Slider images={bannerImgs} />
                <div className='sm:px-8 px-2 py-10 sm:text-center space-y-5'>
                    <h1 className='text-4xl text-gray-800 font-extrabold leading-none'>
                        Discover the Latest Trends
                    </h1>
                    <p>
                        Stay connected on-the-go with real-time updates and notifications, making
                        sure you never miss a beat.
                    </p>
                </div>
            </section>

            {isError && (
                <h2 className='text-xl to-red-500 text-center font-semibold py-10'>
                    {error?.message}
                </h2>
            )}

            <ProductLists items={furniture} name='furniture' />
            <ProductLists items={mensShoes} name='mens Shoes' />
            <ProductLists items={laptops} name='laptops' />
            <ProductLists items={mensWatches} name='mens Watches' />
        </div>
    );
};

export default ProductSingle;
