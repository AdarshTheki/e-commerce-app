import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';

import {
    Cart,
    ProductListing,
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
import 'react-loading-skeleton/dist/skeleton.css';
import {
    Brands,
    CategoryCreate,
    Categories,
    CategoryUpdate,
    Products,
    Dashboard,
} from './components/Admin';

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
        <>
            <Router>
                <div className='sticky bg-base-300 text-base-content w-full top-0 z-30 shadow'>
                    <Header />
                </div>
                <div>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/products' element={<ProductListing />} />
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

                        {/* Dashboard */}
                        <Route path='/dashboard' element={<Dashboard />}>
                            <Route index path='*' element={<Products />} />
                            <Route path='category' element={<Categories />} />
                            <Route path='category/create' element={<CategoryCreate />} />
                            <Route path='category/update/:id' element={<CategoryUpdate />} />
                            <Route path='brand' element={<Brands />} />
                        </Route>
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </>
    );
};

export default App;
