import React, { useMemo } from 'react';
import Cart from '../components/Cart/Cart';
import Checkout from '../components/Cart/Checkout';
import { useSelector } from 'react-redux';

const CartPage = () => {
    const { items } = useSelector((state) => state.cart);
    const cart = useMemo(() => items?.filter((item) => item.flag), [items]);
    const filterCart = useMemo(() => items?.filter((item) => !item.flag), [items]);
    const totals = useMemo(
        () => cart.reduce((prev, curr) => prev + curr.price * curr.quantity, 0),
        [cart]
    );

    return (
        <div className='min-h-screen md:flex justify-between gap-5 w-full'>
            <Cart carts={cart} saveItems={filterCart} />
            <Checkout carts={cart} totals={totals} />
        </div>
    );
};

export default CartPage;
