import React from 'react';

const ProductEmpty = () => {
    return (
        <div className='flex flex-col items-center justify-center h-1/2 p-6 text-center'>
            <svg
                className='w-24 h-24 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 3h18M9 3v18m6-18v18m-6-6h6m-3 6v-6m0-6V3m0 0H9'
                />
            </svg>
            <h2 className='mt-4 text-lg font-medium text-gray-600'>No Products Available</h2>
            <p className='mt-2 text-sm text-gray-500'>
                Please check back later or try searching for something else.
            </p>
        </div>
    );
};

export default ProductEmpty;
