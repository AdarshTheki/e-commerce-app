import Button from './Button';
import Inputs from './Inputs';
import LazyImage from './LazyImage';
import Loader from './Loader';
import StarRating from './StarRating';
import { EmptyImage, PageNotFound } from './SVG';
import FocusCard from './FocusCard';
import { BottomGradient, Input, Label } from './Input';
import { Button as Buttons, MovingBorder } from './MovingBorder';
import Testimonials from './Testimonials';

// components
export {
    Button,
    Inputs,
    Loader,
    StarRating,
    LazyImage,
    EmptyImage,
    PageNotFound,
    FocusCard,
    BottomGradient,
    Input,
    Label,
    Buttons,
    MovingBorder,
    Testimonials,
};

// Price formate in Dollar
export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
    }).format(price);
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
