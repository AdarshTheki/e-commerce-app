import { ProductEmpty } from '../components';
import { Loader, formatPrice } from '../utils';
import { useOrderQuery } from '../redux/apiSlice';

const OrderHistory = () => {
    const { data, isLoading } = useOrderQuery();

    if (isLoading) return <Loader />;

    if (!data.length) return <ProductEmpty />;

    return (
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg px-4'>
            <h2 className='py-10 text-center sm:text-3xl text-xl font-semibold'>
                Order History Count : {data.length}
            </h2>
            <table className='w-full text-left text-gray-500 dark:text-gray-400'>
                <thead className='text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        <th scope='col' className='p-2'>
                            user
                        </th>
                        <th scope='col' className='p-2'>
                            name
                        </th>
                        <th scope='col' className='p-2'>
                            total
                        </th>
                        <th scope='col' className='p-2'>
                            QTY
                        </th>
                        <th scope='col' className='p-2'>
                            shipping
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => {
                        return (
                            <tr
                                key={item._id}
                                className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                                <th className='py-4 font-medium text-gray-900'>{item.username}</th>
                                <td className='p-2'>
                                    {item.items.map((i) => (
                                        <p key={i._id}>{i?.name}</p>
                                    ))}
                                </td>
                                <td className='p-2'>
                                    {item.items.map((i) => (
                                        <p key={i._id}>{formatPrice(i?.price / 80)}</p>
                                    ))}
                                </td>
                                <td className='p-2'>
                                    {item.items.map((i) => (
                                        <p key={i._id}>{i?.quantity}</p>
                                    ))}
                                </td>
                                <td className='p-2 text-wrap'>{item.address}</td>
                            </tr>
                        );
                    })}
                    {/* more add */}
                </tbody>
            </table>
        </div>
    );
};

export default OrderHistory;
