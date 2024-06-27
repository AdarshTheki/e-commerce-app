import React from 'react';
import { useSelector } from 'react-redux';
import { ChevronLeft, ChevronRight, Search, ShoppingCart, CircleUser, History } from 'lucide-react';

import { gallery, categories } from '../../utils';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = ({ open, setOpen }) => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const containerRef = React.useRef(null);

    const sideScroll = React.useCallback((direction) => {
        const scrollAmount = direction === 'left' ? -80 : 80;
        containerRef.current.scrollBy({
            left: scrollAmount,
            behavior: 'smooth',
        });
    }, []);

    return (
        <div className='bg-gray-900 sticky top-0 z-30 text-white'>
            <section className='flex items-center justify-between py-2 sm:px-4 px-2'>
                <div className='flex items-center sm:gap-6 gap-2'>
                    <NavLink to={'/'} className='flex items-center'>
                        <img src={gallery.logo} alt='Logo' className='h-6' />
                        <p className='text-lg font-semibold'>HOME</p>
                    </NavLink>
                </div>
                <div className='flex capitalize items-center sm:gap-6 gap-5'>
                    <button
                        onClick={() => setOpen(!open)}
                        className='flex gap-1 capitalize rounded-full hover:text-gray-300'>
                        <Search />
                        <span className='hidden sm:inline'>search</span>
                    </button>
                    <button
                        onClick={() => navigate('/cart')}
                        className='flex gap-1 capitalize rounded-full hover:text-gray-300'>
                        <ShoppingCart />
                        <span className='hidden sm:inline'>cart</span>
                    </button>
                    <button
                        onClick={() => navigate('/order/history')}
                        className='flex gap-1 capitalize rounded-full hover:text-gray-300'>
                        <History />
                        <span className='hidden sm:inline'>Order</span>
                    </button>
                    {user?.email ? (
                        <button
                            onClick={() => navigate('/user')}
                            className='flex gap-1 rounded-full items-center hover:text-gray-300'>
                            <span className='font-semibold uppercase bg-black rounded-full p-1'>
                                {user?.username?.substring(0, 2)}
                            </span>
                            User
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className='flex gap-2 capitalize rounded-full hover:text-gray-300'>
                            <CircleUser />
                            <span className='hidden sm:inline'>Login</span>
                        </button>
                    )}
                </div>
            </section>
            <section className='flex items-center sm:px-4 px-2 gap-5'>
                <button
                    onClick={() => sideScroll('left')}
                    className='bg-gray-800 hover:border hover:bg-gray-900 text-white p-1.5 flex items-center rounded-full h-8 w-8'>
                    <ChevronLeft fontSize={20} />
                </button>
                <div ref={containerRef} className='flex text-sm items-center overflow-hidden'>
                    {categories?.map((category, index) => (
                        <NavLink
                            key={index}
                            to={`/category/${category}`}
                            className='text-sm text-nowrap px-3 py-2 h-full capitalize hover:bg-gray-800'>
                            {category?.replace('-', ' ')}
                        </NavLink>
                    ))}
                </div>
                <button
                    onClick={() => sideScroll('right')}
                    className='bg-gray-800 hover:border hover:bg-gray-900 text-white p-1.5 flex items-center rounded-full h-8 w-8'>
                    <ChevronRight fontSize={20} />
                </button>
            </section>
        </div>
    );
};

export default Header;
