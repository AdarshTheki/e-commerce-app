import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { instance, toasts } from './utils';
import { setUser } from './redux/authSlice';
import { Sidebar, Footer, Header, Authenticate } from './components';

const App = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await instance.get('/users/current-user');
                dispatch(setUser(response.data.data));
            } catch (error) {
                toasts({ type: false, message: error?.message });
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [dispatch]);

    return (
        <div className='max-w-screen-2xl mx-auto'>
            <Header />
            <Sidebar />
            <Authenticate />
            <Outlet />
            <Footer />
        </div>
    );
};

export default App;
