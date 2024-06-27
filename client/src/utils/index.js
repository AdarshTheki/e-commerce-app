import toast from 'react-hot-toast';

import bannerSrc from '../assets/banner.avif';
import logoSrc from '../assets/logo.webp';
import notFoundSrc from '../assets/notFound.jpg';
import Button from './Button';
import Inputs from './Inputs';
import Search from './Search';
import Loader from './Loader';
import Star from './Star';

const gallery = {
    banner: bannerSrc,
    logo: logoSrc,
    notFound: notFoundSrc,
};

// components
export { Button, Search, Inputs, Loader, gallery, Star };

// Price formate in Dollar
export const formatPrice = (price, currency = 'INR', type = 'currency') => {
    return new Intl.NumberFormat('en-IN', {
        style: type,
        currency: currency,
        maximumFractionDigits: 0,
    }).format(price * 80);
};

// toaster with align center-bottom
export const toasts = ({ type = true, message = '' }) => {
    return toast[type ? 'success' : 'error'](message);
};

// all categories
export const categories = [
    'automotive',
    'fragrances',
    'furniture',
    'groceries',
    'home-decoration',
    'laptops',
    'lighting',
    'mens-shirts',
    'mens-shoes',
    'mens-watches',
    'motorcycle',
    'skincare',
    'smartphones',
    'sunglasses',
    'tops',
    'womens-bags',
    'womens-dresses',
    'womens-jewellery',
    'womens-shoes',
    'womens-watches',
];
