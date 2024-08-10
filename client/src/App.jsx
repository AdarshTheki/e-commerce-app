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
    Contact,
} from './pages';
import { Footer, Header, PrivateRoute, ProductEmpty, SearchBart } from './components';
import { setUser } from './redux/authSlice';
import { useMeQuery } from './redux/apiSlice';
import toast from 'react-hot-toast';

const App = () => {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const { data } = useMeQuery();

    React.useEffect(() => {
        if (data) {
            dispatch(setUser(data));
            toast.success('current user successfully login');
        }
    }, [data, dispatch]);

    const handleToggle = () => setOpen(!open);

    return (
        <>
            <div className='max-w-screen-2xl h-screen mx-auto'>
                <Router>
                    <Header toggle={handleToggle} />
                    {open && <SearchBart setOpen={handleToggle} />}
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/category/:category' element={<Category />} />
                        <Route path='/product/:id' element={<ProductSingle />} />
                        <Route path='/order/success' element={<OrderSuccess />} />
                        <Route path='/order/history' element={<OrdersList />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/contact' element={<Contact />} />
                        <Route path='*' element={<ProductEmpty />} />

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
