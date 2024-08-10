/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import { ProductItem } from '../index';
import { useCategoryQuery } from '../../redux/apiSlice';

const ItemList = ({ name = '', category = '' }) => {
    const { data, isLoading } = useCategoryQuery(category);
    return (
        <div className='flex flex-col gap-4 items-center justify-center'>
            <h2 className='uppercase sm:text-3xl text-xl font-semibold' style={{ fontWeight: 900 }}>
                {name}
            </h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className='flex gap-2 justify-between w-full overflow-x-auto'>
                    {data?.slice(0, 4)?.map((item) => (
                        <div key={item._id} className='min-w-[230px] max-w-[280px]'>
                            <ProductItem {...item} />
                        </div>
                    ))}
                </div>
            )}
            <NavLink
                title={`Go to all category by ${category}`}
                to={`/category/${category}`}
                className='text-black font-extrabold hover:bg-gray-100 border border-black/70 rounded-full px-6 py-2'>
                View All
            </NavLink>
        </div>
    );
};
export default ItemList;
