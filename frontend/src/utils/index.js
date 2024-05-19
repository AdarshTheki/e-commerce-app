import axios from 'axios';
import toast from 'react-hot-toast';

import banner1 from '../assets/banner_1.jpeg'
import banner2 from '../assets/banner_2.png'
import banner3 from '../assets/banner_3.jpeg'
import banner4 from '../assets/banner_4.jpeg'
import banner5 from '../assets/banner_5.jpeg'

import logoPng from '../assets/logo.png';
import logoWebp from '../assets/logo.webp';

import Button from './Button';
import Inputs from './Inputs';
import Search from './Search';
import Navigation from './Navigation';
import Categories from './Categories';
import Loader from './Loader';
import Slider from './Slider';

const bannerImgs = [banner1, banner2, banner3, banner4, banner5]
const logo = [logoPng, logoWebp];

const status = Object.freeze({
    idle: 'idle',
    failed: 'failed',
    loading: 'loading',
    succeed: 'succeed',
});

const formatPrice = (price, currency = 'USD', type = 'currency') => {
    return new Intl.NumberFormat('en-US', {
        style: type,
        currency: currency,
    }).format(price);
};

const toasts = ({ type = true, message = '' }) => {
    if (!type) {
        return toast.error(message, {
            position: 'bottom-right',
            duration: 5000,
            style: {
                borderRadius: 0,
                padding: '10px 20px',
                fontWeight: 400,
                textTransform: 'capitalize',
                border: '1px solid #ccc',
            },
        });
    }
    return toast.success(message, {
        position: 'bottom-right',
        duration: 5000,
        style: {
            borderRadius: 0,
            padding: '10px 20px',
            fontWeight: 400,
            textTransform: 'capitalize',
            border: '1px solid #ccc',
        },
    });
};

const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return '';
};

const instance = axios.create({
    // baseURL: 'http://localhost:8000/api/v1',
    baseURL: 'https://full-stack-ecommerce-api-pi.vercel.app/api/v1',
    // baseURL:'https://full-stack-ecommerce-app-sq9o.onrender.com/api/v1',
    headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
    },
});

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

// components
export { Button, Search, Inputs, Navigation, Categories, Slider, Loader,  };

// functions
export { formatPrice, toasts, instance, loadScript };

// Objects
export {bannerImgs,  status, logo };
