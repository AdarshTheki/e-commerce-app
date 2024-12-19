/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import { useMotionTemplate, useMotionValue, motion } from 'framer-motion';

export const Input = forwardRef(({ className, type = 'text', ...props }, ref) => {
    const radius = 100; // change this to increase the rdaius of the hover effect
    const [visible, setVisible] = React.useState(false);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        let { left, top } = currentTarget.getBoundingClientRect();

        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            style={{
                background: useMotionTemplate`radial-gradient(${
                    visible ? radius + 'px' : '0px'
                } circle at ${mouseX}px ${mouseY}px, var(--gray-800), transparent 80%)`,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            className='p-[2px] rounded-lg transition duration-300 group/input'>
            <input
                type={type}
                className={`border outline-none w-full py-2 px-5 rounded-xl transition duration-400 ${className}`}
                ref={ref}
                {...props}
            />
        </motion.div>
    );
});

export const Label = forwardRef(function ({ className = '', ...props }, ref) {
    return (
        <label
            ref={ref}
            className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
            {...props}
        />
    );
});

// add to parent style = relative group/btn
export const BottomGradient = () => {
    return (
        <>
            <span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent' />
            <span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent' />
        </>
    );
};
