/* eslint-disable react/prop-types */
import React from 'react';
import { ShoppingBag, Star } from 'lucide-react';
import { useDispatch } from 'react-redux';

import { addItem } from '../redux/cartSlice';
import { Button, formatPrice, toasts } from '../utils';

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
    colors = ['#000', '#ffd966', '#800080', '#13dac6'],
}) => {
    const [image, setImage] = React.useState(thumbnail);
    const [color, setColor] = React.useState(colors[0]);
    const dispatch = useDispatch();

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
                <section className='flex flex-wrap gap-2 justify-between items-center'>
                    <p className='flex gap-2 items-center'>
                        <Star fill='#ffa534' stroke={0} fontSize={16} />
                        <span>{rating}</span>
                    </p>
                    <p>
                        <span className=' text-green-600 font-semibold'>Available Stock:</span>
                        <span className='pl-2'>{stock}</span>
                    </p>
                    <p>Brand: {brand}</p>
                </section>
                <section className='py-4 border-y my-4'>
                    <p className='capitalize pb-4'>
                        <span className='text-xl'>Color: </span>
                        <span className={`font-semibold p-2 rounded-lg`}>{color}</span>
                    </p>
                    <div className='flex gap-1 flex-wrap'>
                        {colors.map((c) => (
                            <Button
                                key={c}
                                onClick={() => setColor(c)}
                                className={`text-sm !py-1.5 !px-3 ${
                                    color === c
                                        ? ' text-indigo-600 border-indigo-600 border'
                                        : 'border'
                                }`}>
                                {c}
                            </Button>
                        ))}
                    </div>
                </section>
                <section className='bg-gray-200 p-4'>
                    <p>
                        <span className='line-through text-rose-600'>{formatPrice(price)}</span>{' '}
                        (inclusive of all texes)
                    </p>
                    <p className='space-x-4'>
                        <span className='text-3xl font-semibold'>
                            {formatPrice(price - price * (discount / 100))}
                        </span>
                        <span className='bg-green-600 text-white font-medium text-xs py-1 px-2 rounded-lg'>
                            {discount} off
                        </span>
                    </p>
                </section>
                <Button
                    className='text-white bg-gray-900 hover:bg-gray-700 mt-5'
                    leftIcon={<ShoppingBag />}
                    onClick={() => {
                        dispatch(addItem({ _id, thumbnail, discount, brand, title, price }));
                        toasts({ message: 'Success! The Item has been Added to Your Cart.' });
                    }}>
                    Add To Cart
                </Button>
            </div>
        </div>
    );
};
export default Container;
