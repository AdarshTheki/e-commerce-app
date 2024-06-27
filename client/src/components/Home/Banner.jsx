import React from 'react';
import { gallery } from '../../utils';

const Banner = () => {
    return (
        <div
            className='text-black'
            style={{
                background: `url(${gallery.banner})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            <div className='lg:p-24 sm:p-12 p-6'>
                <div className='sm:w-[600px] space-y-6'>
                    <h1 className='uppercase sm:text-6xl text-4xl' style={{ fontWeight: 900 }}>
                        FIND CLOTHES THAT MATCHES YOUR STYLE
                    </h1>
                    <p className='text-gray-600'>
                        Browse through our diverse range of meticulously crafted garments, designed
                        to bring out your individuality and cater to your sense of style.
                    </p>
                    <button className='px-6 py-2 rounded-lg bg-black hover:bg-gray-700 text-white'>
                        Shop Now
                    </button>
                    <div className='flex flex-wrap sm:gap-5 gap-3'>
                        <p>
                            <span className='text-xl block font-semibold'>200+</span> International
                            Brands
                        </p>
                        <p>
                            <span className='text-xl block font-semibold'>2,000+</span> High-Quality
                            Products
                        </p>
                        <p>
                            <span className='text-xl block font-semibold'>30,000+</span> Happy
                            Customers
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
