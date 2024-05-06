import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';

import { Button } from '../utils';

const CartEmpty = () => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col items-center gap-5 justify-center min-h-[300px] w-[600px] mx-auto'>
            <Button onClick={() => navigate(-1)} Icon={<FaArrowLeftLong />} className='scale-150' />
            <p className='text-2xl font-medium text-center'>
                Our e-commerce app, Your Cart is Empty
            </p>
            <p className='text-sm text-gray-600 text-center'>
                With a user-friendly interface and a variety of products to choose from, Your Cart
                is Empty is the perfect destination for all your online shopping needs.
            </p>
        </div>
    );
};
export default CartEmpty;
