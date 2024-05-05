import React, { forwardRef, useId } from 'react';

const Inputs = forwardRef(function Inputs({ label, type = 'text', className = '', ...props }, ref) {
    const id = useId();
    return (
        <div className='flex w-full flex-col mb-4 relative'>
            <label htmlFor={id} className='cursor-pointer'>
                {label}
            </label>
            <input
                id={id}
                {...props}
                type={type}
                ref={ref}
                className={`w-full p-2 border rounded-md ${className}`}
                autoComplete='off'
            />
        </div>
    );
});

export default Inputs;
