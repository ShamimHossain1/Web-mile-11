import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

const Navbar = () => {
    const { user, setUser, loading, setLoading, signInUser, signOutUser } = useContext(AuthContext);
    const handleSignOut = () => {
        signOutUser().then(() => {
            setUser(null);
        })
        .catch(error => {
            console.error(error.message);
  
        })
    }

    // console.log(user);
    const { displayName,
        email } = user || {};
    const links = <>
        <li><a>Item 1</a></li>
        <li><a>Item 3</a></li>
    </>
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <a href="/" className="btn btn-ghost text-xl">{user ? (displayName? displayName : email) : 'User'}</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                   {
                    user ?   <Link onClick={() => handleSignOut()} to="/login" className="btn">Sign Out</Link> : <><Link to="/login" className="btn">Sign In</Link>
                    <Link to="/register" className="btn">Register</Link></> 
                   }
                </div>
            </div>
        </div>
    );
};

export default Navbar;