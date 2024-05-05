import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { instance } from './axios/config';
import { setUser } from './redux/authSlice';
import toast from 'react-hot-toast';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';

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
                    toast.success('Login successful');
                })
                .catch((error) => {
                    console.log(error?.message);
                    toast.error(`Login failed, ${error?.message}`);
                })
                .finally(() => {
                    setLoading(false);
                });
        };
        fetchUser();
    }, [dispatch]);

    return (
        <div>
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
        </div>
    );
};

export default App;
