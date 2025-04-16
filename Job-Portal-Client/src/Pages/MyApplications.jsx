import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBuilding, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaCheckCircle, 
  FaRegClock, 
  FaRegTimesCircle,
  FaMoneyBillWave,
  FaUserTie,
  FaEnvelope
} from 'react-icons/fa';
import useAuth from '../hooks/useAuth';

const MyApplications = () => {
    const { user } = useAuth();
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch applied jobs
                const appliedResponse = await fetch(`http://localhost:3000/job-Applications?email=${user?.email}`);
                const appliedData = await appliedResponse.json();
                setAppliedJobs(appliedData);


                // Fetch all jobs
                const jobsResponse = await fetch('http://localhost:3000/jobs');
                const jobsData = await jobsResponse.json();
                setJobs(jobsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
                
            }
        };

        fetchData();
    }, [user?.email]);

    // Get details of applied jobs
    const appliedJobIds = appliedJobs.map(job => job.job_id);
    const appliedJobsDetails = jobs.filter(job => appliedJobIds.includes(job._id));

    



  

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatCurrency = (amount, currency) => {
        if (!amount) return 'N/A';
        if (currency === 'bdt') {
            return new Intl.NumberFormat('en-BD', {
                style: 'currency',
                currency: 'BDT',
                minimumFractionDigits: 0
            }).format(amount).replace('BDT', '৳');
        }
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency?.toUpperCase() || 'USD',
            minimumFractionDigits: 0
        }).format(amount);
    };

    if (loading) {
        return (
            <div className="mx-auto p-6 md:p-8 max-w-6xl text-center text-gray-400">
                Loading your applications...
            </div>
        );
    }

    return (
        <div className="mx-auto p-6 md:p-8 max-w-6xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-300 mb-2">My Applications</h1>
                <p className="text-gray-400">Track the status of your job applications</p>
            </div>

            <div className="space-y-6">
                {appliedJobsDetails.length > 0 ? (
                    appliedJobsDetails.map((job) => {
                        // Find the corresponding application to get the status
                        const application = appliedJobs.find(app => app.job_id === job._id);
                        
                        const status = application?.status || 'pending';
                        
                        return (
                            <div key={job._id} className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors">
                                <div className="p-6 md:p-8">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={job.company_logo }
                                                alt={`${job.company} logo`}
                                                className="w-16 h-16 object-contain border border-gray-700 rounded-lg"
                                               
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                                <div>
                                                    <h2 className="text-xl font-bold text-gray-300 mb-1">
                                                        <Link to={`/jobDetails/${job._id}`} className="hover:text-blue-400 transition-colors">
                                                            {job.title}
                                                        </Link>
                                                    </h2>
                                                    <div className="flex items-center gap-4 flex-wrap">
                                                        <div className="flex items-center text-gray-400">
                                                            <FaBuilding className="mr-2 text-gray-500" />
                                                            <span>{job.company}</span>
                                                        </div>
                                                        <div className="flex items-center text-gray-400">
                                                            <FaMapMarkerAlt className="mr-2 text-gray-500" />
                                                            <span>{job.location}</span>
                                                        </div>
                                                        {job.salaryRange && (
                                                            <div className="flex items-center text-gray-400">
                                                                <FaMoneyBillWave className="mr-2 text-gray-500" />
                                                                <span>
                                                                    {formatCurrency(job.salaryRange.min, job.salaryRange.currency)} - 
                                                                    {formatCurrency(job.salaryRange.max, job.salaryRange.currency)}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                
                                                    <div>
                                                        {status}
                                                    </div>
                                               
                                            </div>

                                            <div className="mt-4">
                                                <p className="text-gray-400 line-clamp-2">{job.description}</p>
                                            </div>

                                            {job.requirements && job.requirements.length > 0 && (
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {job.requirements.slice(0, 4).map((skill, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm hover:bg-gray-600 transition-colors"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="mt-6 pt-6 border-t border-gray-700 flex flex-wrap items-center justify-between gap-4">
                                                {job.hr_name && (
                                                    <div className="flex items-center text-gray-400">
                                                        <FaUserTie className="mr-2 text-gray-500" />
                                                        <span>HR: {job.hr_name}</span>
                                                    </div>
                                                )}
                                                {job.hr_email && (
                                                    <div className="flex items-center text-gray-400">
                                                        <FaEnvelope className="mr-2 text-gray-500" />
                                                        <span>{job.hr_email}</span>
                                                    </div>
                                                )}
                                                {application?.appliedDate && (
                                                    <div className="flex items-center text-gray-400">
                                                        <FaCalendarAlt className="mr-2 text-gray-500" />
                                                        <span>Applied: {formatDate(application.appliedDate)}</span>
                                                    </div>
                                                )}
                                                {job.applicationDeadline && (
                                                    <div className="text-sm text-gray-500">
                                                        Deadline: {formatDate(job.applicationDeadline)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="bg-gray-800 rounded-xl p-8 text-center border border-gray-700">
                        <h3 className="text-xl font-medium text-gray-300 mb-2">No applications found</h3>
                        <p className="text-gray-400 mb-4">You haven't applied to any jobs yet.</p>
                        <Link
                            to="/jobs"
                            className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Browse Jobs
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyApplications;