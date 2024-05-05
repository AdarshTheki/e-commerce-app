import React, { useState } from 'react';
import { formatPrice, instance, toasts } from '../utils';

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

    const addCart = async () => {
        try {
            await instance.post('/carts/user/add', {
                cartItems: {
                    productId: _id,
                    quantity: quantity,
                },
            });
            toasts({ message: 'Product added to cart' });
        } catch (error) {
            toasts({ type: false, message: error?.message });
        }
    };

    return (
        <div className='sm:grid grid-cols-2 gap-10 items-center'>
            <div>
                <div className=' max-h-[400px] overflow-hidden'>
                    <img src={image} alt={title} className='object-contain mx-auto' />
                </div>
                <div className='flex gap-2 items-end mt-3'>
                    {images?.map((pic, index) => (
                        <div key={index} className='border border-gray-800'>
                            <img
                                onMouseOver={() => setImage(pic)}
                                src={pic}
                                className='w-full cursor-pointer hover:shadow-xl object-contain'
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex flex-col gap-5'>
                <h2 className='text-xl md:text-3xl font-medium'>{title}</h2>
                <p className='text-rose-600 font-medium'>{description}</p>
                <p>
                    Our app offers secure payment options, fast delivery, and excellent customer
                    service to ensure a smooth shopping experience for all users. From fashion and
                    electronics to home decor and beauty products, our app has everything you need
                    in one place. Download our ecommerce app now and start shopping with ease!
                </p>
                <p className='capitalize first-line:font-medium'>{`rating: ${rating} | brand: ${brand} | category: ${category}`}</p>

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
                <section className='space-x-4'>
                    <button
                        onClick={() => addCart()}
                        className='border-2 duration-200 ease-out hover:bg-gray-800 hover:text-white border-gray-800 px-5 py-2 rounded font-medium'>
                        Add To Cart
                    </button>
                    <button className='border-2 duration-200 ease-out hover:bg-gray-800 hover:text-white border-gray-800 px-5 py-2 rounded font-medium'>
                        Buy Order
                    </button>
                </section>
            </div>
        </div>
    );
};
export default Container;
