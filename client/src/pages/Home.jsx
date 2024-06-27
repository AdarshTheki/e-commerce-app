/* eslint-disable react/prop-types */
import { Banner, ProductList, Customer } from '../components';

const ProductSingle = () => {
    return (
        <div className='w-full'>
            <Banner />
            <div className='max-w-screen-lg mx-auto space-y-8 mt-8 px-2'>
                <ProductList name='new arrivals' category='furniture' />
                <ProductList name='top selling' category='womens-bags' />
                <Customer />
            </div>
        </div>
    );
};

export default ProductSingle;
