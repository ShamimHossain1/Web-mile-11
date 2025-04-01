
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import HotJobCard from './HotJobCard';

const HotJobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/jobs')
            .then(res => res.json())
            .then(data => setJobs(data))
    }, [])

    console.log(jobs);

    // // Make a request for a user with a given ID
    // axios.get('http://localhost:3000/jobs')
    //     .then(function (response) {
    //         // handle success
    //         setJobs(response);
    //     })
    //     .catch(function (error) {
    //         // handle error
    //         console.log(error);
    //     }).finally(function () {

    //     });




    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10'>
            {
                jobs.map(job => <HotJobCard key={job._id} job={job}></HotJobCard>)
            }
        </div>
    );
};

export default HotJobs;