import React from 'react';
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
} from './pages';

import { Loader, toasts } from './utils';
import { setUser } from './redux/authSlice';
import { useMeQuery } from './redux/apiSlice';
import { Sidebar, Footer, Header, Authenticate } from './components';

const App = () => {
    const dispatch = useDispatch();
    const { data, isLoading } = useMeQuery();

    React.useEffect(() => {
        if (!isLoading) {
            if (data?.username) {
                dispatch(setUser(data));
                toasts({ message: 'current user successfully login' });
            }
        }
    }, [isLoading, data, dispatch]);

    if (isLoading) return <Loader />;

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
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/product/:id' element={<ProductSingle />} />
                    <Route path='/checkout' element={<Checkout />} />
                    <Route path='/order/success' element={<Success />} />
                    <Route path='/order/history' element={<OrderHistory />} />
                    <Route element={<ProtectedRoute />}></Route>
                </Routes>
                <Footer />
            </Router>
        </div>
    );
};

export default App;
