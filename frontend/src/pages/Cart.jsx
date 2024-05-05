import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { status } from '../utils/helpers';
import { fetchCarts, getCarts, getCartsStatus } from '../redux/cartSlice';
import Loader from '../components/Loader';
import CartEmpty from '../components/CartEmpty';
import CartItem from '../components/CartItem';

const Cart = () => {
    const dispatch = useDispatch();
    const carts = useSelector(getCarts);
    const cartsStatus = useSelector(getCartsStatus);
    
    useEffect(() => {
        dispatch(fetchCarts());
    }, [dispatch]);
    

    console.log(carts);

    if (carts.items === 0) return <CartEmpty />;

    return (
        <div>
            {cartsStatus === status.loading ? (
                <Loader />
            ) : (
                <div className='mx-auto px-5'>
                    {carts?.map((item) => (
                        <CartItem key={item?._id} {...item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cart;
