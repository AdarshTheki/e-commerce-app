import React from 'react';
import { NavLink } from 'react-router-dom';

const leftItem = ['product', 'category', 'brand', 'dashboard', 'profile'];

const LeftBar = () => {
    return (
        <div className='w-[300px] p-2 max-h-screen'>
            <ul className=''>
                {leftItem.map((link) => (
                    <li key={link} className='py-2 hover:bg-gray-200 border-b rounded'>
                        <NavLink to={`/dashboard/${link}`} className='px-4 block capitalize'>
                            {link}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeftBar;
