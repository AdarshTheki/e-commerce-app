/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import { FAQ } from '../components';
import { useCategoryListQuery, useBrandListQuery } from '../redux/apiSlice';

const HomePage = () => {
    return (
        <div className='w-full'>
            <img src='/banner-2.jpg' alt='banner_image' className='w-full object-contain' />
            <CategoryLists />
            <BrandLists />
            <FAQ />
        </div>
    );
};

export default HomePage;

const Loading = () => {
    const Box = () => {
        return (
            <div className='flex w-full flex-col gap-2'>
                <p className='skeleton h-32 w-full'></p>
                <p className='skeleton h-3 w-28'></p>
                <p className='skeleton h-4 w-full'></p>
                <p className='skeleton h-3 w-full'></p>
            </div>
        );
    };
    return Array.from({ length: 10 }, (i, index) => (
        <div key={index} className='carousel-item md:w-1/5 sm:w-1/3 w-1/2 sm:ml-4 ml-2'>
            <Box />
        </div>
    ));
};

const CategoryLists = () => {
    const { data, isLoading } = useCategoryListQuery();

    return (
        <div className='p-1 max-w-screen-lg mx-auto'>
            <p className='text-2xl font-semibold text-base-content py-5 text-center'>Categories</p>
            <div className='carousel w-full'>
                {data?.data.length && !isLoading ? (
                    data?.data?.map((item) => (
                        <NavLink
                            to={`/products?category=${item?._id}`}
                            key={item?._id}
                            className='carousel-item hover:border-white rounded-2xl border border-transparent duration-300 md:w-1/5 sm:w-1/3 w-1/2 sm:ml-4 ml-2'>
                            <div className='card glass w-full'>
                                <figure>
                                    <img src={item?.thumbnail} alt={item?._id} />
                                </figure>
                                <p className='py-1 font-semibold text-center'>
                                    {item?.title || '#NA'}
                                </p>
                            </div>
                        </NavLink>
                    ))
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    );
};

const BrandLists = () => {
    const { data, isLoading } = useBrandListQuery();

    return (
        <div className='p-1 max-w-screen-lg mx-auto'>
            <p className='text-2xl font-semibold text-base-content py-5 text-center'>Brands</p>
            <div className='carousel w-full'>
                {data?.data.length && !isLoading ? (
                    data?.data?.map((item) => (
                        <NavLink
                            to={`/products?brand=${item?._id}`}
                            key={item?._id}
                            className='carousel-item hover:border-white rounded-2xl border border-transparent duration-300 md:w-1/5 sm:w-1/3 w-1/2 sm:ml-4 ml-2'>
                            <div className='card glass w-full'>
                                <figure>
                                    <img src={item?.thumbnail} alt={item?._id} />
                                </figure>
                                <p className='py-1 font-semibold text-center'>
                                    {item?.title || '#NA'}
                                </p>
                            </div>
                        </NavLink>
                    ))
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    );
};
