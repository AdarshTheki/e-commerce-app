import React from 'react';

const Button = ({ Icon, className = '', ...props }) => {
    return (
        <button
            {...props}
            className={`flex ${className} items-center justify-center w-10 h-10 hover:bg-gray-200 duration-100 rounded-full`}>
            {Icon}
        </button>
    );
};

export default Button;
