import React, { useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllCategories, fetchCategories } from '../redux/categorySlice';
import { getUser } from '../redux/authSlice';
import { setSidebar } from '../redux/uiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FaBars, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Button, logo } from '../utils';
import HeaderSearch from './HeaderSearch';
import { useRef } from 'react';

const Header = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const categories = useSelector(getAllCategories);
    const user = useSelector(getUser);

    const Categories = () => {
        const containerRef = useRef(null);

        const sideScroll = useCallback((direction) => {
            const scrollAmount = direction === 'left' ? -200 : 200;
            containerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });
        }, []);

        return (
            <div
                ref={containerRef}
                className='flex capitalize gap-4 text-sm items-center md:max-w-[90vw] sm:max-w-[85vw] max-w-[75vw] mx-auto overflow-hidden'>
                {categories?.map((category, index) => (
                    <NavLink
                        key={index}
                        to={`/category/${category}`}
                        className='text-nowrap hover:text-gray-400'>
                        {category.replace('-', ' ')}
                    </NavLink>
                ))}
                <button
                    onClick={() => sideScroll('left')}
                    className='absolute bg-gray-700 hover:bg-gray-600 p-1.5 flex items-center rounded-full h-8 w-8 left-2 bottom-3'>
                    <FaAngleLeft fontSize={20} />
                </button>
                <button
                    onClick={() => sideScroll('right')}
                    className='absolute bg-gray-700 hover:bg-gray-600 p-1.5 flex items-center rounded-full h-8 w-8 right-2 bottom-3'>
                    <FaAngleRight fontSize={20} />
                </button>
            </div>
        );
    };

    return (
        <div className='bg-gray-900 text-white py-4 relative'>
            <main className='w-full max-w-screen-xl mx-auto'>
                <div className='container mx-auto flex justify-between items-center px-4'>
                    <div className='flex items-center'>
                        <Button
                            Icon={<FaBars />}
                            className='mr-5 md:hidden block hover:bg-gray-700'
                            onClick={() => dispatch(setSidebar())}
                        />
                        <img src={logo[1]} alt='Logo' className='h-6 mr-2' />
                        <h1 className='text-lg font-semibold'>ShopUp</h1>
                    </div>
                    <nav>
                        <ul className='md:flex hidden capitalize space-x-4'>
                            <li>
                                <NavLink to='/' className='hover:text-gray-300'>
                                    home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/cart' className='hover:text-gray-300'>
                                    cart
                                </NavLink>
                            </li>
                            {user?.email ? (
                                <li>
                                    <NavLink to='/user' className='hover:text-gray-300'>
                                        User
                                    </NavLink>
                                </li>
                            ) : (
                                <li>
                                    <NavLink to='/login' className='hover:text-gray-300'>
                                        login
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </nav>
                    <div className='sm:flex hidden items-center'>
                        <HeaderSearch />
                    </div>
                </div>
            </main>
            <section className='hidden sm:block border-t pt-3 mt-3 border-gray-700'>
                <Categories />
            </section>
        </div>
    );
};

export default Header;
