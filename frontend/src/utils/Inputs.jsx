import React, { forwardRef, useId } from 'react';

const Inputs = forwardRef(function Inputs(
    { label, type = 'text', error, message, className = '', ...props },
    ref
) {
    const id = useId();
    return (
        <div className='relative mb-4'>
            <label
                htmlFor={id}
                className='block text-gray-800 hover:text-gray-700 cursor-pointer font-medium text-sm'>
                {label}
            </label>
            <input
                id={id}
                {...props}
                type={type}
                ref={ref}
                className={`w-full px-5 py-2 rounded-md border border-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${className}`}
                autoComplete='off'
            />
            {error && <span className='text-rose-600 capitalize text-xs'>{message}</span>}
        </div>
    );
});

export default Inputs;
