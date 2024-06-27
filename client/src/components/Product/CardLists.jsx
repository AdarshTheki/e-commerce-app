/* eslint-disable react/prop-types */
import { Loader } from '../../utils';
import Card from './Card';
import Empty from './Empty';

export default function Container({
    checkStatus = false,
    name = 'Products',
    products = [],
    message = 'Some thing went wrong! Your products is not found...',
}) {
    if (checkStatus) return <Loader />;

    if (!products.length) return <Empty message={message} />;

    return (
        <div className='max-w-screen-xl mx-auto'>
            <h2 className='capitalize text-2xl font-semibold mb-4'>
                Our {name?.replace('-', ' ')}
            </h2>
            <div className='w-full relative grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-4 gap-2'>
                {products?.map((product) => (
                    <Card {...product} key={product._id} />
                ))}
            </div>
        </div>
    );
}
