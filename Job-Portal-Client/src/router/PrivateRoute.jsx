import React, { useContext, useEffect } from 'react';
import AuthContext from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user, loading, setLoading } = useContext(AuthContext);
    useEffect(() => {
        // Simulate user state fetching delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Adjust delay as needed

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <div>Loading...</div>; 
    }

    return user ? children : <Navigate to='/login' state={location?.pathname} />;

};

export default PrivateRoute;