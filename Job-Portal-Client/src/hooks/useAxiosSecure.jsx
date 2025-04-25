import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
    baseURL: 'https://job-portal-server-d28ye5li7-shamimhossain1s-projects.vercel.app',
    withCredentials: true,
});

const useAxiosSecure = () => {
 return axiosInstance;
};

export default useAxiosSecure;