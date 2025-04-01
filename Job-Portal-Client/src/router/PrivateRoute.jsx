import React, { useContext } from 'react';
import AuthContext from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user } = useContext(AuthContext);

    return user ? children : <Navigate to='/login' state={location?.pathname} />;

};

export default PrivateRoute;