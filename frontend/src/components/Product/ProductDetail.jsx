import React, { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa6';

import { formatPrice, instance, toasts } from '../../utils';

const Container = ({
    title,
    category,
    brand,
    discount,
    price,
    description,
    rating,
    stock,
    thumbnail,
    images,
    _id,
}) => {
    const [image, setImage] = useState(thumbnail);
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState('#000');

    stock = stock - quantity;

    const addCart = async () => {
        try {
            await instance.post('/carts/user/add', {
                productId: _id,
                quantity: quantity,
            });
            toasts({ message: 'Product added to cart' });
        } catch (error) {
            toasts({ type: false, message: error?.message });
        }
    };

    return (
        <div className='sm:grid grid-cols-2 gap-10 items-center'>
            <div>
                <div className='overflow-hidden max-w-[400px]'>
                    <img src={image} alt={title} className='object-contain mx-auto w-full' />
                </div>
                <div className='flex gap-2 items-end mt-3'>
                    {images?.map((pic, index) => (
                        <div key={index} className='border p-1 border-gray-600 rounded-lg'>
                            <img
                                onMouseOver={() => setImage(pic)}
                                src={pic}
                                className='w-full h-12 cursor-pointer hover:shadow-xl rounded-lg object-contain'
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className='capitalize'>
                <p>{category}</p>
                <h2 className='text-xl md:text-3xl font-medium'>{title}</h2>
                <p className='text-rose-600 font-medium py-4'>{description}</p>
                <section className='flex items-center'>
                    <FaStar className='text-xl text-yellow-500' />
                    <strong>{rating}</strong>
                    <span className=' text-green-600 font-semibold ml-4'>Stock: </span>
                    <strong>{stock}</strong>
                    <span className='ml-4'>Brand: {brand}</span>
                </section>
                <section className='py-4 border-y my-4'>
                    <p className='capitalize pb-4'>
                        <span>Color: {" "}</span>
                        <span className={` text-white px-2 py-0`} style={{ background: color }}>
                            {color}
                        </span>
                    </p>
                    <div className=' flex gap-4 flex-wrap'>
                        <button
                            onClick={() => setColor('#000')}
                            className={`border rounded py-2 px-4 text-sm ${
                                color == '#000' ? ' text-indigo-600 border-indigo-600' : ''
                            }`}>
                            Black
                        </button>
                        <button
                            onClick={() => setColor('#ffd966')}
                            className={`border rounded py-2 px-4 text-sm ${
                                color == '#ffd966' ? ' text-indigo-600 border-indigo-600' : ''
                            }`}>
                            Yellow
                        </button>
                        <button
                            onClick={() => setColor('#800080')}
                            className={`border rounded py-2 px-4 text-sm ${
                                color == '#800080' ? ' text-indigo-600 border-indigo-600' : ''
                            }`}>
                            Purple
                        </button>
                        <button
                            onClick={() => setColor('#13dac6')}
                            className={`border rounded py-2 px-4 text-sm ${
                                color == '#13dac6' ? ' text-indigo-600 border-indigo-600' : ''
                            }`}>
                            Turquoise
                        </button>
                    </div>
                </section>
                <section className='bg-gray-200 p-4'>
                    <p>
                        <span className='line-through text-rose-600'>{formatPrice(price)}</span>{' '}
                        (inclusive of all texes)
                    </p>
                    <p className='space-x-4'>
                        <span className='text-2xl font-semibold'>
                            {formatPrice(price - price * (discount / 100))}
                        </span>
                        <span className='bg-green-600 text-white font-medium text-xs py-1 px-2 rounded-lg'>
                            {discount} off
                        </span>
                    </p>
                    <section className='space-x-4 mt-4'>
                        <span>Quantity:</span>
                        <button
                            disabled={quantity >= 5}
                            onClick={() => setQuantity((prev) => prev + 1)}
                            className='disabled:opacity-30 px-1 py-0 text-sm border-2 border-gray-800 bg-gray-800 hover:bg-gray-700 duration-200 rounded text-white font-medium'>
                            +
                        </button>
                        <button className='px-2 py-0 text-sm border-2 border-gray-800  rounded text-gray-800 font-medium'>
                            {quantity}
                        </button>
                        <button
                            disabled={quantity <= 1}
                            onClick={() => setQuantity((prev) => prev - 1)}
                            className='disabled:opacity-30 px-1 py-0 text-sm border-2 border-gray-800 bg-gray-800 hover:bg-gray-700 duration-200 rounded text-white font-medium'>
                            -
                        </button>
                    </section>
                </section>
                <button
                    onClick={() => addCart()}
                    className='border-2 mt-5 duration-200 ease-out hover:bg-gray-800 hover:text-white border-gray-800 px-5 py-2 rounded font-medium'>
                    Add To Cart
                </button>
            </div>
        </div>
    );
};
export default Container;
