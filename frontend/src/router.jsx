import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Cart, CategoryProduct, Home, ProductSingle, Search,Checkout } from './pages';
import App from './App';

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
        ],
    },
]);
