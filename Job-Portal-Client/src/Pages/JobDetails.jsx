import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { FaBuilding, FaCalendarAlt, FaMoneyBillWave, FaMapMarkerAlt, FaEnvelope, FaUserTie, FaTasks, FaCheckCircle } from 'react-icons/fa';

const JobDetails = () => {
    const job = useLoaderData();
    const { 
        _id, 
        title, 
        company, 
        company_logo, 
        description, 
        location, 
        salaryRange, 
        hr_name, 
        hr_email, 
        requirements, 
        responsibilities, 
        jobType, 
        category, 
        status, 
        deadline: applicationDeadline 
    } = job;

    // Format deadline date
    const formattedDeadline = new Date(applicationDeadline).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className=' mx-auto p-6 md:p-8'>
            <div className='bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700'>
                {/* Job Header */}
                <div className='p-6 md:p-8 border-b border-gray-700'>
                    <div className='flex flex-col md:flex-row gap-6'>
                        <div className='flex-shrink-0'>
                            <img 
                                src={company_logo} 
                                alt={`${company} logo`} 
                                className='w-20 h-20 object-contain border border-gray-700 rounded-lg'
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/80';
                                    e.target.onerror = null;
                                }}
                            />
                        </div>
                        <div className='flex-grow'>
                            <h1 className='text-2xl md:text-3xl font-bold text-gray-300 mb-2'>{title}</h1>
                            <div className='flex items-center gap-4 flex-wrap'>
                                <div className='flex items-center text-gray-400'>
                                    <FaBuilding className='mr-2 text-gray-500' />
                                    <span>{company}</span>
                                </div>
                                <div className='flex items-center text-gray-400'>
                                    <FaMapMarkerAlt className='mr-2 text-gray-500' />
                                    <span>{location}</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <span className='px-3 py-1 bg-blue-900 text-blue-300 text-sm font-medium rounded-full'>
                                        {jobType}
                                    </span>
                                    <span className='px-3 py-1 bg-green-900 text-green-300 text-sm font-medium rounded-full'>
                                        {category}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Job Details */}
                <div className='p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {/* Main Content */}
                    <div className='md:col-span-2'>
                        <div className='mb-8'>
                            <h2 className='text-xl font-semibold text-gray-300 mb-4'>Job Description</h2>
                            <p className='text-gray-400 leading-relaxed'>{description}</p>
                        </div>

                        <div className='mb-8'>
                            <h2 className='text-xl font-semibold text-gray-300 mb-4'>Responsibilities</h2>
                            <ul className='space-y-2'>
                                {responsibilities.map((item, index) => (
                                    <li key={index} className='flex items-start text-gray-400'>
                                        <FaCheckCircle className='mt-1 mr-2 text-green-500 flex-shrink-0' />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className='mb-8'>
                            <h2 className='text-xl font-semibold text-gray-300 mb-4'>Requirements</h2>
                            <div className='flex flex-wrap gap-2'>
                                {requirements.map((skill, index) => (
                                    <span 
                                        key={index} 
                                        className='px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm hover:bg-gray-600 transition-colors'
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className='space-y-6'>
                        <div className='bg-gray-700 p-5 rounded-lg border border-gray-600'>
                            <h3 className='text-lg font-semibold text-gray-300 mb-4'>Job Overview</h3>
                            <ul className='space-y-3'>
                                <li className='flex items-center'>
                                    <FaUserTie className='mr-3 text-blue-400' />
                                    <span className='text-gray-400'>
                                        <span className='font-medium'>HR Contact:</span> {hr_name}
                                    </span>
                                </li>
                                <li className='flex items-center'>
                                    <FaEnvelope className='mr-3 text-blue-400' />
                                    <span className='text-gray-400'>
                                        <span className='font-medium'>Email:</span> {hr_email}
                                    </span>
                                </li>
                                <li className='flex items-center'>
                                    <FaMoneyBillWave className='mr-3 text-blue-400' />
                                    <span className='text-gray-400'>
                                        <span className='font-medium'>Salary:</span> {salaryRange.min.toLocaleString()} - {salaryRange.max.toLocaleString()} {salaryRange.currency.toUpperCase()}
                                    </span>
                                </li>
                                <li className='flex items-center'>
                                    <FaCalendarAlt className='mr-3 text-blue-400' />
                                    <span className='text-gray-400'>
                                        <span className='font-medium'>Deadline:</span> {formattedDeadline}
                                    </span>
                                </li>
                                <li className='flex items-center'>
                                    <FaTasks className='mr-3 text-blue-400' />
                                    <span className='text-gray-400'>
                                        <span className='font-medium'>Status:</span> 
                                        <span className={`ml-1 capitalize ${status === 'active' ? 'text-green-400' : 'text-red-400'}`}>
                                            {status}
                                        </span>
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className='text-center'>
                            <Link to={`/jobApply/${_id}`} className='hover:no-underline'>
                                <button className='btn btn-primary w-full py-3 px-6 rounded-lg font-medium hover:bg-opacity-90 transition-all border-none'>
                                    Apply Now
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;