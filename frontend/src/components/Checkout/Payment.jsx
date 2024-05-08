import React from 'react';
import { instance, logo } from '../../utils';
import { useSelector } from 'react-redux';

const Payment = () => {
    const carts = useSelector((state) => state.cart.carts);
    const { email, shipping } = useSelector((state) => state.ui.process);
    let totals = carts.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const orderPlace = async () => {
        const getKey = await instance.get('/orders/get-key');
        const order = await instance.post('/orders/checkout', { amount: totals });
        console.log(order.data)
        let options = {
            key: getKey.data?.key, // Enter the Key ID generated from the Dashboard
            amount: order?.data?.order?.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: 'INR',
            name: shipping.fullName,
            description: 'Test Transaction',
            image: logo[1],
            order_id: order?.data?.order?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: 'http://localhost:8000/api/v1/orders/payment-verification',
            prefill: {
                name: shipping.fullName,
                email: email,
                contact: '7719971779',
            },
            notes: {
                address: `${shipping.address}, ${shipping.city}, ${shipping.state}, ${shipping.postcode}`,
            },
            theme: {
                color: '#121212',
            },
        };
        console.log(options)
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    return (
        <div>
            <h2 className='font-semibold mb-4'>Payment Method</h2>
            <p>You will be redirect to razorpay after you click</p>
            <button onClick={orderPlace} className='bg-gray-800 hover:bg-gray-700 text-white px-14 py-2 mt-4 rounded'>
                Continue to Pay
            </button>
        </div>
    );
};

export default Payment;
