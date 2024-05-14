import React from 'react';
import { BrowserRouter, Route, Routes, createBrowserRouter } from 'react-router-dom';
import {
    Cart,
    CategoryProduct,
    Home,
    ProductSingle,
    Search,
    Checkout,
    Success,
    OrderHistory,
    OrderSingle,
} from './pages';
import App from './App';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from './redux/uiSlice';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/product/:id',
                element: <ProductSingle />,
            },
            {
                path: '/category/:category',
                element: <CategoryProduct />,
            },
            {
                path: '/cart',
                element: <Cart />,
            },
            {
                path: '/search/:searchTerm',
                element: <Search />,
            },
            {
                path: '/checkout',
                element: <Checkout />,
            },
            {
                path: '/order/success',
                element: <Success />,
            },
            {
                path: '/order/history',
                element: <OrderHistory />,
            },
            {
                path: '/order/user/:id',
                element: <OrderSingle />,
            },
        ],
    },
]);


const Components = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/category/:category' element={<CategoryProduct />} />
                <Route path='/product/:id' element={<ProductSingle />} />
                <Route path='/search/:searchTerm' element={<Search />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/order/success' element={<Success />} />
                <Route path='/order/history' element={<OrderHistory />} />
                <Route path='/order/user/:id' element={<OrderSingle />} />
            </Routes>
        </BrowserRouter>
    );
};
