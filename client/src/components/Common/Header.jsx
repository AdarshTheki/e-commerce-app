import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';

import { setLogout } from '../../redux/authSlice';
import { Heart, Menu, Search, ShoppingCart, UserRound, X } from 'lucide-react';

const Header = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        dispatch(setLogout());
        toast.success('user has been logout');
    };

    return (
        <div className='sticky bg-base-300 text-base-content w-full top-0 z-40 shadow'>
            <div className='pr-2 flex items-center justify-end gap-3'>
                <NavLink className='text-sm link-primary' to='/'>
                    Track Order
                </NavLink>
                <NavLink className='text-sm link-primary' to='/'>
                    Help Center
                </NavLink>
                <label htmlFor='dark_mode' className='text-xs'>
                    <input
                        id='dark_mode'
                        type='checkbox'
                        value='dark'
                        className='toggle scale-75 theme-controller'
                    />
                </label>
            </div>
            <div className='container px-2 mx-auto flex items-center justify-between py-2'>
                {/* Logo */}
                <div className='flex items-center gap-2 lg:gap-12 md:gap-8'>
                    {/* MenuBar modal */}
                    <button
                        onClick={() => document.getElementById('menubar_modal').showModal()}
                        className='btn sm:hidden btn-ghost btn-circle'>
                        <Menu />
                    </button>
                    <MenuBar />

                    <NavLink to='/' className='text-teal-600 text-2xl'>
                        Tira
                    </NavLink>

                    {/* brands */}
                    <ul className='sm:flex hidden font-light items-center justify-between gap-2 lg:gap-12 md:gap-8 capitalize'>
                        {['brand', 'offers', 'top seals', 'category'].map((i) => (
                            <li
                                to={i}
                                key={i}
                                className='hover:link-primary font-medium cursor-pointer capitalize text-sm'>
                                {i}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='flex items-center justify-center'>
                    {/* Search Bar */}
                    <button
                        onClick={() => document.getElementById('search_modal').showModal()}
                        className='sm:flex btn btn-ghost max-sm:btn-circle'>
                        <Search />
                        <span className='hidden sm:inline'>Search Products ...</span>
                    </button>
                    <SearchBar />

                    <NavLink to={'/cart'} className='relative btn btn-ghost btn-circle'>
                        <Heart />
                        <p className='bg-primary-content font-bold flex items-center justify-center text-xs rounded-full absolute bottom-1 right-0 px-1'>
                            1
                        </p>
                    </NavLink>
                    <NavLink to={'/wishlist'} className='relative btn btn-ghost btn-circle'>
                        <ShoppingCart />
                        <p className='bg-primary-content font-bold flex items-center justify-center text-xs rounded-full absolute bottom-1 right-0 px-1'>
                            1
                        </p>
                    </NavLink>
                    <NavLink to={'/user'} className='max-sm:hidden btn btn-ghost btn-circle'>
                        <UserRound />
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Header;

const MenuBar = () => {
    const menuItems = [
        { title: 'brand', item: ['one', 'two', 'three', 'four'] },
        { title: 'category', item: ['one', 'two', 'three', 'four'] },
        { title: 'products', item: ['one', 'two', 'three', 'four'] },
        { title: 'login', item: ['login', 'register'] },
    ];

    const [checked, setChecked] = useState('');

    return (
        <>
            <dialog id='menubar_modal' className='modal'>
                <div className='modal-box !max-h-full !col-auto !row-auto !w-full'>
                    <main className='min-h-[90vh]'>
                        <div className='flex items-center justify-between'>
                            <h2>logo</h2>
                            <X />
                        </div>
                        {/* accordion menus*/}
                        {menuItems.map((menu) => (
                            <div
                                key={menu.title}
                                className='collapse mt-2 rounded-none collapse-arrow'>
                                <input
                                    type='radio'
                                    name='my-accordion-2'
                                    checked={menu.title === checked}
                                    onChange={(e) => setChecked(e.target.value)}
                                    value={menu.title}
                                />
                                <div className='collapse-title text-xl font-medium'>
                                    {menu.title}
                                </div>
                                <ul className='collapse-content'>
                                    {menu.item.map((i) => (
                                        <li key={i}>{i}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </main>
                </div>
                <form method='dialog' className='modal-backdrop'>
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
};

const SearchBar = () => {
    return (
        <>
            <dialog id='search_modal' className='modal'>
                <div className='modal-box'>
                    <label className='input input-bordered flex items-center gap-2'>
                        <input type='text' className='grow' placeholder='Search' />
                        <Search size={16} />
                    </label>

                    {/* search result implement */}
                </div>
                <form method='dialog' className='modal-backdrop'>
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
};
