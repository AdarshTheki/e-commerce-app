import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
    Cart,
    CategoryProduct,
    ProtectedRoute,
    Home,
    ProductSingle,
    Search,
    Checkout,
    Success,
    OrderHistory,
    OrderSingle,
} from './pages';

import { instance, toasts } from './utils';
import { setUser } from './redux/authSlice';
import { Sidebar, Footer, Header, Authenticate } from './components';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await instance.get('/users/current-user');
                if (response.data.data) {
                    dispatch(setUser(response.data.data));
                }
            } catch (error) {
                toasts({ type: false, message: 'Get Current User Failed' });
            }
        };
        fetchUser();
    }, [dispatch]);

    return (
        <div className='max-w-screen-2xl mx-auto'>
            <Router>
                <Header />
                <Sidebar />
                <Authenticate />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/category/:category' element={<CategoryProduct />} />
                    <Route path='/search/:searchTerm' element={<Search />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path='/cart' element={<Cart />} />
                        <Route path='/product/:id' element={<ProductSingle />} />
                        <Route path='/checkout' element={<Checkout />} />
                        <Route path='/order/success' element={<Success />} />
                        <Route path='/order/history' element={<OrderHistory />} />
                        <Route path='/order/user/:id' element={<OrderSingle />} />
                    </Route>
                </Routes>
                <Footer />
            </Router>
        </div>
    );
};

export default App;
