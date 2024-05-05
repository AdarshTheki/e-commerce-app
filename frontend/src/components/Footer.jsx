import React from 'react';
import { FaInstagram, FaLinkedin, FaGithub, FaTwitter, FaFacebook, FaBars } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { logo } from '../utils';

const Footer = () => {
    return (
        <footer className='bg-gray-900 text-gray-200 py-8 mt-10'>
            <div className='container mx-auto flex flex-col md:flex-row justify-between md:items-center px-4'>
                <div className='mb-4 lg:mb-0'>
                    <div className='flex'>
                        <img src={logo[1]} alt='logo' className='h-8 mr-2' />
                        <h3 className='text-xl font-semibold mb-2'>ShopUp</h3>
                    </div>
                    <p className='text-sm max-w-[400px]'>
                        Welcome to our e-commerce platform where convenience meets quality! Discover
                        a wide range of products that cater to your every need, all at the click of
                        a button. Shop with us and experience seamless shopping like never before.
                    </p>
                </div>
                <div className='mb-4 lg:mb-0'>
                    <h3 className='text-xl font-semibold mb-2'>Useful Links</h3>
                    <ul className='text-sm'>
                        <li>
                            <NavLink to='#' className='hover:text-gray-400'>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='#' className='hover:text-gray-400'>
                                About Us
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='#' className='hover:text-gray-400'>
                                Services
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='#' className='hover:text-gray-400'>
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className='mb-4 lg:mb-0'>
                    <h3 className='text-xl font-semibold mb-2'>Contact Us</h3>
                    <p className='text-sm'>123 Street Name, City, Country</p>
                    <p className='text-sm'>contact@example.com</p>
                    <p className='text-sm'>123-456-7890</p>
                </div>
                <div>
                    <h3 className='text-xl font-semibold mb-2'>Follow Us</h3>
                    <div className='flex space-x-4'>
                        <NavLink to='#' className='text-gray-300 hover:text-gray-400'>
                            <FaGithub />
                        </NavLink>
                        <NavLink to='#' className='text-gray-300 hover:text-gray-400'>
                            <FaTwitter />
                        </NavLink>
                        <NavLink to='#' className='text-gray-300 hover:text-gray-400'>
                            <FaFacebook />
                        </NavLink>
                        <NavLink to='#' className='text-gray-300 hover:text-gray-400'>
                            <FaInstagram />
                        </NavLink>
                        <NavLink to='#' className='text-gray-300 hover:text-gray-400'>
                            <FaLinkedin />
                        </NavLink>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
