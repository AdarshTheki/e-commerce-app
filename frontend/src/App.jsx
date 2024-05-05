import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { instance, toasts } from './utils';
import { setUser } from './redux/authSlice';
import toast from 'react-hot-toast';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

const App = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            await instance
                .get('/users/current-user')
                .then((res) => {
                    dispatch(setUser(res.data.data));
                    toasts({ message: 'Login successful' });
                })
                .catch((error) => {
                    toasts({ type: false, message: error?.message });
                })
                .finally(() => {
                    setLoading(false);
                });
        };
        fetchUser();
    }, [dispatch]);

    return (
        <div className='max-w-screen-2xl mx-auto'>
            {/* {loading ? (
                <p className='flex h-screen text-xl items-center justify-center'>loading...</p>
            ) : (
                <div>
                    <Header />
                    <Outlet />
                </div>
            )} */}
            <Header />
            <Sidebar />
            <Outlet />
            <Footer/>
        </div>
    );
};

export default App;
