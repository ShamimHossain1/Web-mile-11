import React from 'react';
import { FaDollarSign, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HotJobCard = ({ job }) => {
    const { _id, title, company, company_logo, requirements, description, location, salaryRange } = job;
    
    return (
        <div className="card card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
            <div className='flex gap-4 p-6 pb-0'>
                <figure className="flex-shrink-0">
                    <img
                        className='w-16 h-16 object-contain rounded-lg border border-gray-200'
                        src={company_logo || 'https://via.placeholder.com/64'}
                        alt={company}
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/64';
                        }}
                    />
                </figure>
                <div className="flex-grow">
                    <h4 className="text-xl font-semibold text-gray-800">{company}</h4>
                    <p className='flex gap-2 items-center text-gray-600 mt-1'>
                        <FaMapMarkerAlt className="text-gray-500" />
                        <span>{location}</span>
                    </p>
                </div>
            </div>
            
            <div className="card-body p-6">
                <div className="flex items-start justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {title}
                    </h2>
                    <div className="badge badge-secondary badge-lg px-3 py-2">
                        HOT
                    </div>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
                
                <div className="mb-4">
                    <div className="flex items-center gap-2 text-gray-700 mb-2">
                        <FaBriefcase className="text-gray-500" />
                        <span className="font-medium">Requirements:</span>
                    </div>
                    <div className='flex gap-2 flex-wrap'>
                        {requirements.map((skill, index) => (
                            <span
                                key={index}
                                className='badge badge-outline px-3 py-2 text-sm hover:bg-primary hover:text-white transition-colors'
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
                
                <div className="card-actions justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-gray-700">
                        <span className="font-medium">Salary:</span>
                        <FaDollarSign className="text-green-600" />
                        <span className="font-semibold text-green-700">
                            {salaryRange.min} - {salaryRange.max} {salaryRange.currency}
                        </span>
                    </div>

                    <Link to={`/jobs/${_id}`} className="hover:no-underline">
                        <button className="btn btn-primary px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all">
                            Apply Now
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HotJobCard;