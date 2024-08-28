import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';

import {
    Cart,
    Category,
    Home,
    OrderSuccess,
    OrdersList,
    ProductSingle,
    Contact,
    ReviewUpdate,
    UserLogin,
    UserRegister,
    ForgotPassword,
    NotFound,
} from './pages';
import {
    Footer,
    Header,
    PrivateRoute,
    UserProfile,
    UserPassword,
    UserInformation,
    AboutMe,
} from './components';
import { setUser } from './redux/authSlice';
import { useMeQuery } from './redux/apiSlice';
import toast from 'react-hot-toast';
import LeftBar from './components/Common/LeftBar';

const App = () => {
    const dispatch = useDispatch();
    const { data } = useMeQuery();

    React.useEffect(() => {
        if (data) {
            dispatch(setUser(data));
            toast.success('current user successfully login');
        }
    }, [data, dispatch]);

    return (
        <div className='bg-gray-100 text-gray-700'>
            <Router>
                <Header />
                <div className='flex w-full'>
                    <LeftBar />
                    <div className='flex-1 overflow-y-auto h-[90vh] gutter'>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/category/:category' element={<Category />} />
                            <Route path='/product/:id' element={<ProductSingle />} />
                            <Route path='/order/success' element={<OrderSuccess />} />
                            <Route path='/order/history' element={<OrdersList />} />
                            <Route path='/login' element={<UserLogin />} />
                            <Route path='/register' element={<UserRegister />} />
                            <Route path='/forgot-password' element={<ForgotPassword />} />
                            <Route path='/contact' element={<Contact />} />
                            <Route path='/review/:id' element={<ReviewUpdate />} />
                            <Route
                                path='/user'
                                element={
                                    <PrivateRoute path='/login'>
                                        <div className='max-w-screen-md mx-auto py-10'>
                                            <Outlet />
                                        </div>
                                    </PrivateRoute>
                                }>
                                <Route path='profile' element={<UserProfile {...data} />} />
                                <Route path='information' element={<UserInformation />} />
                                <Route path='password' element={<UserPassword />} />
                                <Route path='about' element={<AboutMe />} />
                            </Route>
                            <Route
                                path='/cart'
                                element={
                                    <PrivateRoute path='/login'>
                                        <Cart />
                                    </PrivateRoute>
                                }
                            />
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                        <Footer />
                    </div>
                </div>
            </Router>
        </div>
    );
};

export default App;
