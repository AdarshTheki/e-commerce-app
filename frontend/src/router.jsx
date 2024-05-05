import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Cart, CategoryProduct, Home, Login, ProductSingle, Register, Search } from './pages';
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
                path: '/register',
                element: <Register />,
            },
            {
                path: '/login',
                element: <Login />,
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
        ],
    },
]);
