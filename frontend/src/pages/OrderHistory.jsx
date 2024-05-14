import React, { useEffect, useState } from 'react';
import { Button, instance, Loader } from '../utils';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';

const OrderHistory = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await instance.get('/orders/user/order');
                setOrders(response.data.orders);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <Loader />;

    if (!orders || orders.length === 0) {
        return (
            <div className='flex flex-col items-center gap-5 justify-center min-h-[300px] w-[600px] mx-auto'>
                <Button
                    onClick={() => navigate(-1)}
                    Icon={<FaArrowLeftLong />}
                    className='scale-150'
                />
                <p className='text-2xl font-medium text-center'>
                    Our e-commerce app, Your Order is Empty
                </p>
                <p className='text-sm text-gray-600 text-center'>
                    With a user-friendly interface and a variety of products to choose from, Your
                    Order is Empty is the perfect destination for all your online shopping needs.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className='flex flex-col mt-8 max-w-screen-lg mx-auto'>
                <h2 className='text-2xl font-semibold mb-4'>Order History</h2>
                <div className='overflow-x-auto'>
                    <table className='min-w-full divide-y divide-gray-200'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Order ID
                                </th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Date
                                </th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Total Pay
                                </th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200 text-xs sm:text-sm lg:text-base'>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td className='px-2 py-4 whitespace-nowrap'>
                                        <NavLink
                                            to={`/order/user/${order._id}`}
                                            className=' text-indigo-600 hover:text-indigo-800'>
                                            {order._id}
                                        </NavLink>
                                    </td>
                                    <td className='px-2 py-4 whitespace-nowrap'>
                                        {new Date(order.createdAt).toDateString()}
                                    </td>
                                    <td className='px-2 py-4 whitespace-nowrap'>
                                        ${order.totals}
                                    </td>
                                    <td className='px-2 py-4 whitespace-nowrap'>
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                order.status === 'success'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <NavLink
                    to={'/'}
                    className='w-fit block mx-auto bg-gray-800 hover:bg-gray-700 text-white px-14 py-2 mt-4 rounded'>
                    Go Back Home
                </NavLink>
            </div>
        </>
    );
};

export default OrderHistory;
