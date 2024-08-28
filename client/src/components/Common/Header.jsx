import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBart from '../Search/SearchBar';
import { NavLink } from 'react-router-dom';
import { setLogout } from '../../redux/authSlice';
import toast from 'react-hot-toast';
import {
    ChevronDown,
    ChevronUp,
    Contact,
    FileClock,
    Heart,
    Home,
    Menu,
    ShoppingBag,
    ShoppingCart,
} from 'lucide-react';
import { categories } from '../../utils';

const Header = () => {
    return (
        <div className='sticky bg-white w-full h-[10vh] sm:px-10 px-4 items-center justify-between flex top-0 z-40 shadow'>
            {/* Logo */}
            <NavLink
                to='https://github.com/AdarshTheki'
                target='__blank'
                className='flex items-center sm:gap-2'>
                <img src={'/logo.webp'} alt='logo' />
                <p className='font-semibold sm:text-lg'>Ecommerce</p>
            </NavLink>

            {/* Search Bar */}
            <SearchBart />

            {/* User */}
            <LoginUser />

            <MenuItems />
        </div>
    );
};

export default Header;

const LoginUser = () => {
    const { user } = useSelector((state) => state.auth);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const logoutHandler = async () => {
        dispatch(setLogout());
        toast.success('user has been logout');
    };

    const toggle = () => setOpen(!open);

    return (
        <div className='relative' ref={dropdownRef}>
            <img
                src={'/user.png'}
                width={40}
                alt='user logo'
                className='cursor-pointer'
                onClick={toggle}
            />

            {open && (
                <div className='z-20 absolute grid top-14 right-0 w-[150px] rounded shadow-lg bg-white h-fit'>
                    {user?.email && (
                        <NavLink
                            className='hover:text-blue-600 px-4 py-2 hover:bg-gray-100'
                            to='/user/profile'>
                            Users
                        </NavLink>
                    )}
                    <NavLink
                        className='hover:text-blue-600 px-4 py-2 hover:bg-gray-100'
                        to='/user/information'>
                        Information
                    </NavLink>
                    <NavLink
                        className='hover:text-blue-600 px-4 py-2 hover:bg-gray-100'
                        to='/user/password'>
                        Password
                    </NavLink>
                    <NavLink
                        className='hover:text-blue-600 px-4 py-2 hover:bg-gray-100'
                        to='/user/about'>
                        About Me
                    </NavLink>
                    {user?.email ? (
                        <NavLink
                            onClick={logoutHandler}
                            className='text-red-700 px-4 py-2 border-t hover:bg-gray-100'>
                            Logout
                        </NavLink>
                    ) : (
                        <NavLink
                            to='/login'
                            className='hover:text-blue-600 px-4 py-2 border-t hover:bg-gray-100'>
                            Login
                        </NavLink>
                    )}
                </div>
            )}
        </div>
    );
};

const MenuItems = () => {
    const [category, setCategory] = useState(false);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='block sm:hidden relative' ref={dropdownRef}>
            <Menu onClick={() => setOpen(!open)} className='cursor-pointer hover:text-blue-700' />
            {open && (
                <ul className='z-20 py-4 px-6 overflow-y-auto gutter max-h-[85vh] absolute grid rounded gap-4 top-12 right-0 w-fit shadow-lg bg-white h-fit'>
                    <NavLink to={'/'} className='flex items-center gap-2 hover:text-blue-600'>
                        <Home size={18} />
                        Home
                    </NavLink>
                    <div>
                        <p
                            onClick={() => setCategory(!category)}
                            className='flex items-center gap-2 hover:text-blue-600 cursor-pointer'>
                            <ShoppingBag size={18} />
                            Category
                            {!category ? <ChevronDown /> : <ChevronUp />}
                        </p>
                        {category && (
                            <div className='grid gap-2 pl-6 my-2'>
                                {categories.map((item) => (
                                    <NavLink
                                        key={item}
                                        to={`/category/${item}`}
                                        className='hover:text-blue-600'>
                                        {item.split('-')[1]
                                            ? item.split('-')[1]
                                            : item.split('-')[0]}
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>
                    <NavLink to='/cart' className='flex items-center gap-2 hover:text-blue-600'>
                        <ShoppingCart size={18} />
                        my Cart
                    </NavLink>
                    <NavLink to='/wishlist' className='flex items-center gap-2 hover:text-blue-600'>
                        <Heart size={18} />
                        wishlist
                    </NavLink>
                    <NavLink
                        to='/order/history'
                        className='flex items-center gap-2 hover:text-blue-600'>
                        <FileClock size={18} />
                        orders
                    </NavLink>
                    <NavLink to='/contact' className='flex items-center gap-2 hover:text-blue-600'>
                        <Contact size={18} />
                        Contact
                    </NavLink>
                </ul>
            )}
        </div>
    );
};
