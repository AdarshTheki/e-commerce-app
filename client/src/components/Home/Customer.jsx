import React from 'react';
import { Star } from '../../utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Customer = () => {
    const containerRef = React.useRef(null);

    const sideScroll = React.useCallback((direction) => {
        const scrollAmount = direction === 'left' ? -200 : 200;
        containerRef.current.scrollBy({
            left: scrollAmount,
            behavior: 'smooth',
        });
    }, []);

    return (
        <div className='relative'>
            <div className='sm:flex mb-4 justify-between items-center'>
                <h2
                    className='uppercase sm:text-3xl text-xl font-semibold'
                    style={{ fontWeight: 900 }}>
                    OUR HAPPY CUSTOMERS
                </h2>
                <div className='flex gap-2'>
                    <button
                        onClick={() => sideScroll('left')}
                        className='bg-gray-800 hover:bg-gray-900 text-white p-1.5 flex items-center rounded-full h-8 w-8'>
                        <ChevronLeft fontSize={20} />
                    </button>
                    <button
                        onClick={() => sideScroll('right')}
                        className='bg-gray-800 hover:bg-gray-900 text-white p-1.5 flex items-center rounded-full h-8 w-8'>
                        <ChevronRight fontSize={20} />
                    </button>
                </div>
            </div>
            <div className='flex gap-5 overflow-x-auto' ref={containerRef}>
                {[...Array(3)].map((_, index) => (
                    <div key={index} className='min-w-[260px]'>
                        <Star rating={5} />
                        <p className='text-xl font-semibold'>Demo User</p>
                        <p className=''>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel ipsam
                            iusto atque commodi
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Customer;
