import React, { useContext } from 'react';
import Lottie from "lottie-react";
import animationData from "../../public/signup_animation.json";
import AuthContext from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { setUser, setLoading, registerUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleRegister = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        registerUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoading(false);
                form.reset();
                setUser(null);
                navigate('/login');

            })
            .catch(error => {
                console.error(error.message);
            })

    }
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen ">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left w-96">
                        <Lottie animationData={animationData}></Lottie>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <h1 className="text-5xl font-bold text-center py-4">Register now!</h1>
                        <form onSubmit={handleRegister} className="card-body">

                            <label className="fieldset-label">Email</label>
                            <input type="email" name='email' className="input" placeholder="Email" />
                            <label className="fieldset-label">Password</label>
                            <input name='password' type="password" className="input" placeholder="Password" />
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button type='submit' className="btn btn-neutral mt-4">Register</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;