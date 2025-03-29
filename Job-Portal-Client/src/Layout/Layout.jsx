import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../componants/Navbar';
import Footer from '../componants/Footer';

const Layout = () => {
    return (
        <div className='max-w-5/6 mx-auto'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;