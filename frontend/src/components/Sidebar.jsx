import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoCloseSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

import { getAllCategories } from '../redux/categorySlice';
import { getSidebarStatus, setSidebar } from '../redux/uiSlice';
import HeaderSearch from './HeaderSearch';
import { Button, logo } from '../utils';

const Sidebar = () => {
    const dispatch = useDispatch();
    const isSidebarOn = useSelector(getSidebarStatus);
    const categories = useSelector(getAllCategories);

    const Navigation = () => {
        return (
            <>
                <NavLink
                    to='/'
                    className='block py-2 px-4 capitalize font-medium hover:bg-gray-800'>
                    Home
                </NavLink>
                <NavLink
                    to='/login'
                    className='block py-2 px-4 capitalize font-medium hover:bg-gray-800'>
                    login
                </NavLink>
                <NavLink
                    to='/cart'
                    className='block py-2 px-4 capitalize font-medium hover:bg-gray-800'>
                    Cart
                </NavLink>
                <hr />
            </>
        );
    };

    const Categories = () => {
        return (
            <>
                <h1 className='text-white pl-4 py-2 font-semibold'>All Categories</h1>
                {categories?.map((category, index) => (
                    <NavLink
                        key={index}
                        to={`/category/${category}`}
                        className='block py-2 px-4 text-sm capitalize font-medium hover:bg-gray-800'>
                        {category?.replace('-', ' ')}
                    </NavLink>
                ))}
            </>
        );
    };

    return (
        <aside
            className={`bg-gray-900 text-gray-300 w-[250px] h-full fixed top-0 left-0 overflow-y-auto z-10 ${
                isSidebarOn ? '' : 'hidden'
            } sidebar scrollbar`}>
            <section className='py-4 flex items-center gap-2 justify-center'>
                <img src={logo[1]} alt='lgo' width={20} />
                <p className='text-white font-semibold '>ShopUp</p>
            </section>
            <section className='sm:hidden flex flex-col items-center gap-2'>
                <HeaderSearch />
            </section>
            <nav>
                <Navigation />
            </nav>
            <nav>
                <Categories />
            </nav>
            <Button
                Icon={<IoCloseSharp className='text-gray-200 font-bold text-xl' />}
                onClick={() => dispatch(setSidebar())}
                className='absolute top-2 right-2 hover:bg-gray-700'
            />
        </aside>
    );
};

export default Sidebar;
