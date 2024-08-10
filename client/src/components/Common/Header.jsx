import React from 'react';
import { useSelector } from 'react-redux';
import {
    ShoppingCart,
    CircleUser,
    History,
    Menu,
    Home,
    ShoppingBasket,
    Contact,
    Heart,
    FileClock,
    MessageCircle,
    Search,
    User,
} from 'lucide-react';

import { gallery, categories } from '../../utils';
import { NavLink, useNavigate } from 'react-router-dom';

const navLinks = [];

const Header = ({ toggle }) => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const dropdownRef = React.useRef(null);
    const { user } = useSelector((state) => state.auth);

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

    function handleToggle() {
        setOpen(!open);
    }

    const authenticate = user?.email;

    return (
        <div className='bg-gray-900 sticky top-0 z-30 text-white shadow-lg'>
            <section className='flex relative items-center justify-between sm:mx-10 mx-2 py-2'>
                <div className='flex items-center sm:gap-6 gap-2'>
                    <NavLink to={'/'} className='flex items-center'>
                        <img src={gallery.logo} alt='Logo' className='h-6' />
                        <p className='text-lg font-semibold'>HOME</p>
                    </NavLink>
                </div>
                <div ref={dropdownRef}>
                    <Menu onClick={handleToggle} />
                    {open && (
                        <ul
                            onClick={handleToggle}
                            className='absolute top-16 right-0 w-full overflow-hidden max-w-[300px] text-gray-800 bg-white shadow-2xl border rounded-2xl'>
                            <li className='py-2 pl-8 hover:bg-gray-200 text-lg font-medium capitalize duration-300'>
                                <NavLink to='/' className='flex items-center gap-4'>
                                    <Home />
                                    Home
                                </NavLink>
                            </li>
                            <li
                                onClick={toggle}
                                className='py-2 pl-8 hover:bg-gray-200 text-lg font-medium capitalize duration-300'>
                                <NavLink to='/' className='flex items-center gap-4'>
                                    <Search />
                                    Search
                                </NavLink>
                            </li>
                            <li className='py-2 pl-8 hover:bg-gray-200 text-lg font-medium capitalize duration-300'>
                                <NavLink to='/contact' className='flex items-center gap-4'>
                                    <Contact />
                                    Contact
                                </NavLink>
                            </li>
                            <li className='py-2 pl-8 hover:bg-gray-200 text-lg font-medium capitalize duration-300'>
                                <NavLink to='/order/history' className='flex items-center gap-4'>
                                    <FileClock />
                                    all orders
                                </NavLink>
                            </li>
                            <li className='py-2 pl-8 hover:bg-gray-200 text-lg font-medium capitalize duration-300'>
                                <NavLink to='/cart' className='flex items-center gap-4'>
                                    <ShoppingCart />
                                    my Cart
                                </NavLink>
                            </li>
                            <li className='py-2 pl-8 hover:bg-gray-200 text-lg font-medium capitalize duration-300'>
                                <NavLink
                                    to={authenticate ? '/wishlist' : '/login'}
                                    className='flex items-center gap-4'>
                                    <Heart />
                                    wishlist
                                </NavLink>
                            </li>
                            <li className='py-2 pl-8 hover:bg-gray-200 text-lg font-medium capitalize duration-300'>
                                <NavLink
                                    to={authenticate ? '/reviews' : '/login'}
                                    className='flex items-center gap-4'>
                                    <MessageCircle />
                                    reviews
                                </NavLink>
                            </li>
                            {authenticate ? (
                                <li className='py-2 pl-8 hover:bg-gray-200 text-lg font-medium capitalize duration-300'>
                                    <NavLink to='/user' className='flex items-center gap-4'>
                                        <User />
                                        {user?.username}
                                    </NavLink>
                                </li>
                            ) : (
                                <li className='py-2 pl-8 hover:bg-gray-200 text-lg font-medium capitalize duration-300'>
                                    <NavLink to='/login' className='flex items-center gap-4'>
                                        <User />
                                        Login
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    )}
                </div>
            </section>
            <marquee className='flex bg-white text-sm items-center capitalize overflow-x-scroll'>
                {categories?.map((category, index) => (
                    <NavLink
                        key={index}
                        to={`/category/${category}`}
                        className='text-sm text-nowrap font-medium p-2 text-blue-950 hover:bg-gray-200'>
                        {category?.replace('-', ' ')}
                    </NavLink>
                ))}
            </marquee>
        </div>
    );
};

export default Header;
