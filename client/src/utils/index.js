import toast from 'react-hot-toast';

import banner1 from '../assets/banner_1.jpeg';
import banner2 from '../assets/banner_2.png';
import banner3 from '../assets/banner_3.jpeg';
import banner4 from '../assets/banner_4.jpeg';
import banner5 from '../assets/banner_5.jpeg';

import logoPng from '../assets/logo.png';
import logoWebp from '../assets/logo.webp';

import Button from './Button';
import Inputs from './Inputs';
import Search from './Search';
import Navigation from './Navigation';
import Categories from './Categories';
import Loader from './Loader';
import Slider from './Slider';

const bannerImgs = [banner1, banner2, banner3, banner4, banner5];
const logo = [logoPng, logoWebp];

const formatPrice = (price, currency = 'INR', type = 'currency') => {
    return new Intl.NumberFormat('en-IN', {
        style: type,
        currency: currency,
    }).format(price * 80);
};

const toasts = ({ type = true, message = '' }) => {
    return toast[type ? 'success' : 'error'](message);
};

// components
export { Button, Search, Inputs, Navigation, Categories, Slider, Loader };

// functions
export { formatPrice, toasts };

// Objects
export { bannerImgs, logo };
