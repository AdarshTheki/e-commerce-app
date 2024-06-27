import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import {
    Cart,
    Category,
    Home,
    OrderSuccess,
    OrdersList,
    ProductSingle,
    Profile,
    Login,
    Register,
} from './pages';
import { Footer, Header, PrivateRoute, Search } from './components';
import { toasts } from './utils';
import { setUser } from './redux/authSlice';
import { useMeQuery } from './redux/apiSlice';

const App = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsClose] = useState(false); // search model toggle
    const { data } = useMeQuery();

    React.useEffect(() => {
        if (data) {
            dispatch(setUser(data));
            toasts({ message: 'current user successfully login' });
        }
    }, [data, dispatch]);

    return (
        <>
            <div className='max-w-screen-2xl h-screen mx-auto'>
                <Router>
                    <Header setOpen={setIsClose} open={isOpen} />
                    <Search setOpen={setIsClose} open={isOpen} />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/category/:category' element={<Category />} />
                        <Route path='/product/:id' element={<ProductSingle />} />
                        <Route path='/order/success' element={<OrderSuccess />} />
                        <Route path='/order/history' element={<OrdersList />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />

                        <Route
                            path='/user'
                            element={
                                <PrivateRoute path='/login'>
                                    <Profile />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path='/cart'
                            element={
                                <PrivateRoute path='/login'>
                                    <Cart />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                    <Footer />
                </Router>
            </div>
        </>
    );
};

export default App;
