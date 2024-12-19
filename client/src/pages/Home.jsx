/* eslint-disable react/prop-types */
import { ItemList, FAQ } from '../components';
import { Button } from '../utils';

const HomePage = () => {
    return (
        <div className='w-full bg-gray-600'>
            <img src='/banner-2.jpg' alt='banner_image' className='w-full object-contain' />
            {/* <ItemList name='new arrivals' category='furniture' />
            <ItemList name='top selling' category='womens-bags' /> */}
            <FAQ />
            <Button type='hover'>Playlist</Button>
        </div>
    );
};

export default HomePage;
