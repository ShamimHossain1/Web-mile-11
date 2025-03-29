import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../componants/Navbar';
import Footer from '../componants/Footer';

const Layout = () => {
    return (
        <div className='max-w-7xl mx-auto py-4'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;