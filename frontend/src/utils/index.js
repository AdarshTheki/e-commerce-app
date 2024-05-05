import mobile_1 from '../assets/mobile.png';
import mobile_2 from '../assets/mobile2.jpg';
import mobile_3 from '../assets/mobile3.jpg';
import mobile_4 from '../assets/laptop.jpg';
import mobile_5 from '../assets/laptop2.jpg';
import logoPng from '../assets/logo.png';
import logoWebp from '../assets/logo.webp';
import Button from './Button';
import Inputs from './Inputs';
import axios from 'axios';
import toast from 'react-hot-toast';

const sliderImgs = [mobile_1, mobile_2, mobile_3, mobile_4, mobile_5];
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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjMzNWY3YTVjY2M5NGRiMzllMmE4NzkiLCJlbWFpbCI6ImFkYXJzaHZlcm1hNTQ5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRhcnNodmVybWE1NDkiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3MTQ4MTg4MDUsImV4cCI6MTcxNDk5MTYwNX0.xIgvfNlAx9hMOL8UuLix_aNPXTBwNDTF3lw24Dxi6sg`,
    },
});

export { Button, Inputs, instance, sliderImgs, formatPrice, status, toasts, logo };
