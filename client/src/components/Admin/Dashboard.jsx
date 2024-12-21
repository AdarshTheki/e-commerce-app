import React from 'react';
import LeftBar from './LeftBar';
import MainBar from './MainBar';

const Dashboard = () => {
    return (
        <div className='flex gap-2'>
            <LeftBar />
            <MainBar />
        </div>
    );
};

export default Dashboard;
