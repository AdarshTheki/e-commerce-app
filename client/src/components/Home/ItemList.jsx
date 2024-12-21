/* eslint-disable react/prop-types */
import { ProductItem } from '../index';
import { useProductsQuery } from '../../redux/apiSlice';

const Box = () => {
    return (
        <div className='flex w-full flex-col gap-2'>
            <div className='skeleton h-32 w-full'></div>
            <div className='skeleton h-3 w-28'></div>
            <div className='skeleton h-4 w-full'></div>
            <div className='skeleton h-3 w-full'></div>
        </div>
    );
};

const ItemList = ({ name = '', category = '' }) => {
    const { data, isLoading } = useProductsQuery({ category: category });

    if (!data || isLoading || !data?.docs.length) {
        return (
            <div className='sm:p-8 p-2'>
                <div className='carousel w-full'>
                    {Array.from({ length: 10 }, (i, index) => (
                        <p key={index} className='carousel-item md:w-1/5 sm:w-1/3 w-1/2 sm:ml-4 ml-2'>
                            <Box />
                        </p>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-4 items-center justify-center mt-10'>
            <h2 className='uppercase sm:text-3xl text-xl font-semibold'>{name}</h2>
            <div className='grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5 container mx-auto'>
                {data?.docs?.map((item) => (
                    <div key={item._id} className=''>
                        <ProductItem {...item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemList;
