import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../componants/Navbar';

const Layout = () => {
    return (
        <div className='max-w-7xl mx-auto py-4'>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Layout;