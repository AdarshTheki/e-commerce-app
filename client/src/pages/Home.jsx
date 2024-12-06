/* eslint-disable react/prop-types */
import { ItemList, Customer, FAQ } from '../components';

const HomePage = () => {
    return (
        <div className='w-full'>
            <img src='/banner-2.jpg' alt='banner_image' className='w-full object-contain' />

            <div className='mx-auto space-y-8 mt-8 px-2'>
                <ItemList name='new arrivals' category='furniture' />
                <ItemList name='top selling' category='womens-bags' />
                <div className=' space-y-5'>
                    <FAQ />
                </div>
                <Customer />
            </div>
        </div>
    );
};

export default HomePage;
