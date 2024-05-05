import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../redux/categorySlice';
import { getSidebarStatus, setSidebar } from '../redux/uiSlice';
import { NavLink } from 'react-router-dom';
import { IoCloseSharp } from 'react-icons/io5';
import { Button } from '../utils/helpers';

const Sidebar = () => {
    const dispatch = useDispatch();
    const isSidebarOn = useSelector(getSidebarStatus);
    const categories = useSelector(getAllCategories);

    return (
        <div
            className={
                !isSidebarOn
                    ? 'hidden'
                    : 'scrollbar fixed z-30 top-0 left-0 w-[200px] h-full bg-black/50 flex items-start justify-start overflow-y-auto'
            }>
            <div className='w-full bg-slate-50 relative'>
                <h2 className='text-lg font-medium p-4'>All Categories</h2>
                <ul className='flex flex-col'>
                    {categories?.map((category) => (
                        <NavLink
                            key={category}
                            to={`/category/${category}`}
                            className='capitalize text-sm py-1 px-4 hover:bg-slate-300 w-full'>
                            {category?.replace('-', ' ')}
                        </NavLink>
                    ))}
                </ul>
            </div>
            <Button
                Icon={<IoCloseSharp />}
                onClick={() => dispatch(setSidebar())}
                className='absolute right-2 top-3'
            />
        </div>
    );
};

export default Sidebar;
