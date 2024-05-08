import React, { forwardRef, useId } from 'react';

const Inputs = forwardRef(function Inputs({ label, type = 'text', className = '', ...props }, ref) {
    const id = useId();
    return (
        <div className='relative'>
            <label htmlFor={id} className='block text-gray-800'>
                {label}
            </label>
            <input
                id={id}
                {...props}
                type={type}
                ref={ref}
                className={`w-full px-4 py-2 rounded-md border border-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${className}`}
                autoComplete='off'
            />
        </div>
    );
});

export default Inputs;
