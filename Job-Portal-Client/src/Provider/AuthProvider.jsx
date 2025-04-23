import React, { useEffect, useState } from 'react';
import AuthContext from '../Context/AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import auth from '../../firebase';
import axios from 'axios';


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // Register user
    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };
    // Sign in user
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Sign out user
    const signOutUser = () => {

        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
console.log('Current User:', currentUser);

            if (currentUser?.email) {
                // console.log('User is signed in:', currentUser);
                const userInfo = {
                    email: currentUser.email,
                }
                axios.post('http://localhost:3000/jwt', userInfo, { withCredentials: true })
                    .then(res => {
                        console.log("User login",res.data);
                        setLoading(false);
                    })
            }
            else {
                axios.post('http://localhost:3000/logout',{}, { withCredentials: true })
                    .then(res => {
                        console.log("User sign out",res.data);
                        setLoading(false);
                    })
            }




        });

        return () => unsubscribe();
    })

    const authInfo = { user, setUser, loading, setLoading, registerUser, signInUser, signOutUser };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;