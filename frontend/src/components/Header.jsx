import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllCategories, fetchCategories } from '../redux/categorySlice';
import { setSidebar } from '../redux/uiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FaSearch, FaBars } from 'react-icons/fa';
import { Button } from '../utils/helpers';

const Header = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const categories = useSelector(getAllCategories);

    return (
        <div className='py-2 px-5'>
            <ul className='flex capitalize sm:gap-10 gap-4 text-xl items-center justify-center w-full'>
                <li>
                    <NavLink to='/'>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/register'>Register</NavLink>
                </li>
                <li>
                    <NavLink to='/login'>Login</NavLink>
                </li>
                <li>
                    <NavLink to='/cart'>Cart</NavLink>
                </li>
            </ul>
            <main className='sm:flex items-center gap-5 max-w-screen-md mx-auto'>
                <section className='flex space-x-4 items-center pb-2'>
                    <Button Icon={<FaBars />} onClick={() => dispatch(setSidebar())} />
                    <NavLink
                        to={'/'}
                        className='hover:border-gray-900 text-xl font-medium border-transparent border-b-2 mr-5 duration-300'>
                        ShopeUp
                    </NavLink>
                </section>
                <div className='w-full flex flex-col'>
                    <label htmlFor='searchTerm' className='w-full mb-2 flex gap-1 items-center'>
                        <input
                            type='text'
                            id='searchTerm'
                            placeholder='Search your perfect item is here'
                            className='w-full py-1 pl-5 border-2 rounded border-gray-800/80 outline-none capitalize'
                        />
                        <button className='flex items-center justify-center rounded px-5 py-2.5 bg-slate-800 hover:bg-slate-800/80'>
                            <FaSearch className='text-white' />
                        </button>
                    </label>
                    <ul className='flex capitalize flex-wrap text-sm items-center w-full'>
                        {categories.slice(0, 6).map((category) => (
                            <li key={category}>
                                <NavLink
                                    to={`/category/${category}`}
                                    className='hover:border-gray-900 border-transparent border-b-2 mr-5 duration-300'>
                                    {category.replace('-', ' ')}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default Header;
