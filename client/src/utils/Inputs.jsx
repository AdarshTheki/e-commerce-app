import React, { forwardRef, useId } from 'react';

const Inputs = forwardRef(function Inputs(
    { label, type = 'text', isError = false, message = '', className = '', ...props },
    ref
) {
    const id = useId();
    return (
        <div className='relative mb-4 w-full'>
            <label htmlFor={id} className='block capitalize text-base font-medium text-[#07074D]'>
                {label}
            </label>
            <input
                id={id}
                {...props}
                type={type}
                ref={ref}
                className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-black/90 outline-none focus:border-[#6A64F1] focus:shadow-md ${className}`}
                autoComplete='off'
            />
            {isError ? <span className='text-rose-600 capitalize text-xs'>{message}</span> : null}
        </div>
    );
});

export default Inputs;
