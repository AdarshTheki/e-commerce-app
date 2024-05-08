import React, { useRef, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FaBars, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import { fetchCategories } from '../redux/categorySlice';
import { setSidebar } from '../redux/uiSlice';
import { Button, logo, Search, Navigation, Categories } from '../utils';

const Header = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const containerRef = useRef(null);
    const sideScroll = useCallback((direction) => {
        const scrollAmount = direction === 'left' ? -200 : 200;
        containerRef.current.scrollBy({
            left: scrollAmount,
            behavior: 'smooth',
        });
    }, []);

    return (
        <div className='bg-gray-900 text-white py-4 relative'>
            <main className='w-full max-w-screen-xl mx-auto'>
                <div className='container mx-auto flex justify-between items-center px-4'>
                    <section className='flex items-center'>
                        <Button
                            Icon={<FaBars />}
                            className='mr-5 md:hidden block hover:bg-gray-700'
                            onClick={() => dispatch(setSidebar())}
                        />
                        <img src={logo[1]} alt='Logo' className='h-6 mr-2' />
                        <p className='text-lg font-semibold'>ShopUp</p>
                    </section>
                    <section className='md:flex hidden capitalize space-x-4'>
                        <Navigation />
                    </section>
                    <div className='sm:flex hidden items-center'>
                        <Search />
                    </div>
                </div>
            </main>
            <section className='hidden sm:block border-t mt-4 pt-3 border-gray-700'>
                <div
                    ref={containerRef}
                    className='flex text-sm gap-4 items-center md:max-w-[90vw] sm:max-w-[85vw] max-w-[75vw] mx-auto overflow-hidden'>
                    <Categories />
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
            </section>
        </div>
    );
};

export default Header;
