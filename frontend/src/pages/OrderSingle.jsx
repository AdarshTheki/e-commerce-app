import React, { useEffect, useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, instance, Loader, formatPrice } from '../utils';

const OrderSingle = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [order, setOrder] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                const response = await instance.get(`/orders/user/${id}`);
                setOrder(response.data.order);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    if (loading) return <Loader />;

    if (!order) {
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
        <div className='flex items-center justify-center my-20'>
            <div className='max-w-screen-sm mx-auto shadow p-8 bg-gray-100 capitalize space-y-2'>
                <p>
                    <span className='font-medium'>orderId:</span> {order._id}
                </p>
                <p>
                    <span className='font-medium'>Total Pay:</span> {formatPrice(order.totals)}
                </p>
                <p>
                    <span className='font-medium'>status:</span> {order.status}
                </p>
                <p>
                    <span className='font-medium'>updatedAt:</span> {order.updatedAt}
                </p>
                <section>
                    {order?.products?.map((item) => (
                        <div key={item?._id} className='shadow-lg mt-4 p-4 bg-white'>
                            <p>productId: {item?.productId}</p>
                            <p>Quantity: {item?.quantity}</p>
                        </div>
                    ))}
                </section>
                <button
                    onClick={() => navigate('/')}
                    className='w-fit block mx-auto bg-gray-800 hover:bg-gray-700 text-white px-14 py-2 mt-4 rounded'>
                    Go Back Home
                </button>
            </div>
        </div>
    );
};

export default OrderSingle;
