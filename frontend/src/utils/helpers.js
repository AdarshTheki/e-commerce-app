export const status = Object.freeze({
    idle: 'idle',
    failed: 'failed',
    loading: 'loading',
    succeed: 'succeed',
});

export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price);
};

import mobile_1 from '../assets/mobile.png';
import mobile_2 from '../assets/mobile2.jpg';
import mobile_3 from '../assets/mobile3.jpg';
import mobile_4 from '../assets/laptop.jpg';
import mobile_5 from '../assets/laptop2.jpg';
export const sliderImgs = [mobile_1, mobile_2, mobile_3, mobile_4, mobile_5];

import Button from './Button'
import Inputs from './Inputs'

export {Button, Inputs}