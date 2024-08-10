/* eslint-disable react/prop-types */
import { Banner, ItemList, Customer, FAQ } from '../components';

const ProductSingle = () => {
    return (
        <div className='w-full'>
            <Banner />
            <div className='max-w-screen-lg mx-auto space-y-8 mt-8 px-2'>
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

export default ProductSingle;
