/* eslint-disable react/prop-types */
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useDispatch } from 'react-redux';

import { addItem } from '../../redux/cartSlice';
import { Button, toasts, gallery, Star } from '../../utils';

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
        <div className='sm:grid grid-cols-2 gap-10 items-start'>
            {/* Product Image */}
            <div className='flex sm:flex-row flex-col-reverse items-start gap-2'>
                <div className='flex sm:flex-col gap-2'>
                    {images?.map((pic, index) => (
                        <img
                            key={index}
                            onMouseOver={() => setImage(pic)}
                            src={gallery.notFound}
                            className='border h-12 overflow-hidden cursor-pointer rounded-lg bg-center'
                        />
                    ))}
                </div>
                <div className='overflow-hidden max-w-[400px]'>
                    <img
                        src={gallery.notFound}
                        alt={title}
                        className='object-contain mx-auto w-full'
                    />
                </div>
            </div>
            {/* Product Detail */}
            <div className='capitalize space-y-2'>
                <p>{category}</p>
                <h2 className='text-xl md:text-3xl font-extrabold'>{title}</h2>
                <Star rating={rating} size={20} />
                <h2 className='space-x-4 font-bold text-3xl text-gray-700'>
                    <span>${Math.round((100 * price) / discount)}</span>
                    <span className='text-gray-400'>${price}</span>
                    <span className='text-sm font-light bg-rose-200 text-rose-600 px-3 py-2 rounded-xl'>
                        {discount}%
                    </span>
                </h2>
                <p className='text-gray-400 font-medium'>{description}</p>
                <div className='border-y my-6 py-4'>
                    <p className='text-xl'>Choose Color:</p>
                    {colors.map((c) => (
                        <button
                            key={c}
                            style={{ background: `${c}` }}
                            onClick={() => setColor(c)}
                            className={`rounded-full mr-4 outline ring-offset-3 w-10 h-10 ${
                                color === c ? ' outline-blue-600' : ' outline-transparent'
                            }`}></button>
                    ))}
                </div>
                <Button
                    className='text-white bg-gray-900 hover:bg-gray-700 px-10'
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
