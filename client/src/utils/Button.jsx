/* eslint-disable react/prop-types */
import React from 'react';

const Button = ({ type = 'magic', leftIcon, rightIcon, className = '', children, ...rest }) => {
    if (type === 'magic') {
        return (
            <button className='relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50'>
                <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
                <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl'>
                    Border Magic
                </span>
            </button>
        );
    }

    if (type === 'border') {
        return (
            <button className='p-[3px] relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg' />
                <div className='px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent'>
                    {children}
                </div>
            </button>
        );
    }

    if (type === 'hover') {
        return (
            <button className='shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200'>
                {children}
            </button>
        );
    }

    return (
        <button
            {...rest}
            type='button'
            className={`${className} flex items-center gap-2 focus:outline-none focus:ring-2 font-medium rounded-lg text-sm px-5 py-2.5`}>
            {!!leftIcon && leftIcon}
            {children}
            {!!rightIcon && rightIcon}
        </button>
    );
};

export default Button;
