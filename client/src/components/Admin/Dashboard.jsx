import React from 'react';
import LeftBar from './LeftBar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='flex gap-2 relative'>
            <LeftBar />
            <div className='w-full p-5'>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
