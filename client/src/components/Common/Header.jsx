import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';

import SearchBart from '../Search/SearchBar';
import { setLogout } from '../../redux/authSlice';
import { Heart, ShoppingCart, UserRound } from 'lucide-react';

const Header = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        dispatch(setLogout());
        toast.success('user has been logout');
    };
    return (
        <div className='sticky bg-base-300 text-base-content w-full top-0 z-40 shadow'>
            <h4 className='text-right pb-2'>
                <NavLink className='text-sm link link-primary' to='/'>
                    Track Order
                </NavLink>
                <strong>&ensp;|&ensp;</strong>
                <NavLink className='text-sm sm:pr-10 pr-3 link link-primary' to='/'>
                    Help Center
                </NavLink>
            </h4>
            <div className='container mx-auto flex items-start justify-between py-2'>
                {/* Logo */}
                <div className='flex items-center gap-5 lg:gap-12 md:gap-8'>
                    <NavLink to='/'>
                        <p className='text-teal-600 text-4xl'>Tira</p>
                    </NavLink>

                    {/* brands */}
                    <ul className='flex font-light items-center justify-between gap-5 lg:gap-12 md:gap-8 capitalize'>
                        {['brand', 'offers', 'top seals', 'category'].map((i) => (
                            <li
                                to={i}
                                key={i}
                                className='hover:link-primary text-neutral-content font-medium cursor-pointer capitalize'>
                                {i}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='flex items-center gap-5 lg:gap-12 md:gap-8'>
                    {/* Search Bar */}
                    <SearchBart />

                    {/* User */}
                    <div className='flex items-center justify-center gap-5'>
                        <NavLink to={'/cart'} className='relative'>
                            <Heart className='hover:link-primary' />
                            <p className='bg-black/90 font-bold flex items-center justify-center text-xs rounded-full absolute -bottom-1 right-0 px-1'>
                                1
                            </p>
                        </NavLink>
                        <NavLink to={'/wishlist'} className='relative'>
                            <ShoppingCart className='hover:link-primary' />
                            <p className='bg-black/90 font-bold flex items-center justify-center text-xs rounded-full absolute -bottom-1 right-0 px-1'>
                                1
                            </p>
                        </NavLink>
                        <div className='dropdown dropdown-end'>
                            <NavLink tabIndex={0} role='button'>
                                <UserRound className='hover:link-primary' />
                            </NavLink>
                            <ul
                                tabIndex={0}
                                className='dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow'>
                                {user?.email && (
                                    <li>
                                        <NavLink className='' to='/user/profile'>
                                            Users
                                        </NavLink>
                                    </li>
                                )}
                                <li>
                                    <NavLink className='' to='/user/information'>
                                        Information
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className='' to='/user/password'>
                                        Password
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className='' to='/user/about'>
                                        About Me
                                    </NavLink>
                                </li>
                                {user?.email ? (
                                    <li>
                                        <NavLink onClick={logoutHandler} className='text-error'>
                                            Logout
                                        </NavLink>
                                    </li>
                                ) : (
                                    <li>
                                        <NavLink to='/login' className='text-primary font-semibold'>
                                            Log-In
                                        </NavLink>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
