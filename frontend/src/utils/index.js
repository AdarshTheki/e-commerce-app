import axios from 'axios';
import toast from 'react-hot-toast';

import mobile_3 from '../assets/mobile3.jpg';
import mobile_4 from '../assets/laptop.jpg';
import mobile_5 from '../assets/laptop2.jpg';

import logoPng from '../assets/logo.png';
import logoWebp from '../assets/logo.webp';

import Button from './Button';
import Inputs from './Inputs';
import Search from './Search';
import Navigation from './Navigation';
import Categories from './Categories';
import Loader from './Loader';
import Slider from './Slider';

const sliderImgs = [mobile_3, mobile_4, mobile_5];
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

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNiNWNiMTc3NTZmNmI5MzAxNGJiZTgiLCJlbWFpbCI6ImFkYXJzaHZlcm1hNTQ5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRhcnNoIHZlcm1hIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzE1MTY2Mzk1LCJleHAiOjE3MTUzMzkxOTV9.3alZRDoRdK5pO9QcFL0ammf39bDhatZx0PEq4zF9jwM`,
    },
});

// components
export { Button, Search, Inputs, Navigation, Categories, Slider, Loader };

// functions
export { formatPrice, toasts, instance };

// Objects
export { sliderImgs, status, logo };
