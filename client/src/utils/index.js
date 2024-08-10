import toast from 'react-hot-toast';

import bannerSrc from '../assets/banner.avif';
import logoSrc from '../assets/logo.webp';
import notFoundSrc from '../assets/notFound.jpg';
import Button from './Button';
import Inputs from './Inputs';
import Loader from './Loader';
import StarRating from './StarRating';
import LazyImage from './LazyImage';

const gallery = {
    banner: bannerSrc,
    logo: logoSrc,
    notFound: notFoundSrc,
};

// components
export { Button, Inputs, Loader, gallery, StarRating, LazyImage };

// Price formate in Dollar
export const formatPrice = (price) => {
    price = price / 80;
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
    }).format(price * 80);
};

// toaster with align center-bottom
export const toasts = ({ type = true, message = '' }) => {
    return toast[type ? 'success' : 'error'](message);
};

// all categories
export const categories = [
    'beauty',
    'fragrances',
    'furniture',
    'groceries',
    'home-decoration',
    'kitchen-accessories',
    'laptops',
    'mens-shirts',
    'mens-shoes',
    'mens-watches',
    'mobile-accessories',
    'motorcycle',
    'skin-care',
    'smartphones',
    'sports-accessories',
    'sunglasses',
    'tablets',
    'tops',
    'vehicle',
    'womens-bags',
    'womens-dresses',
    'womens-jewellery',
    'womens-shoes',
    'womens-watches',
];
