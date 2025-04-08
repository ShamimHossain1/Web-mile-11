import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { FaEnvelope, FaFileAlt, FaGithub, FaLinkedin, FaUserCheck } from 'react-icons/fa';

const Applicants = () => {
    const jobApplicants = useLoaderData();


    const handleStatusChange = (id, newStatus) => {

        fetch(`http://localhost:3000/job-applications/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus })
        }).then(res => res.json()).then(data => console.log(data));
    };

    return (
        <div className="mx-auto p-6 md:p-8">
            <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
                {/* Header */}
                <div className="p-6 md:p-8 border-b border-gray-700">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-300 mb-4">
                        Applicants ({jobApplicants.length})
                    </h1>
                    <p className="text-gray-400">
                        Below is a list of candidates who have applied to this job.
                    </p>
                </div>

                {/* Applicants List */}
                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {jobApplicants.map((applicant, index) => (
                        <div
                            key={applicant._id}
                            className="bg-gray-700 p-5 rounded-lg border border-gray-600 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <h2 className="text-xl font-semibold text-gray-200 mb-3">
                                Applicant {index + 1}
                            </h2>

                            <ul className="space-y-3 text-gray-400 mb-4">
                                <li className="flex items-center">
                                    <FaEnvelope className="mr-3 text-blue-400" />
                                    <span>{applicant.applicant_email}</span>
                                </li>
                                <li className="flex items-center">
                                    <FaGithub className="mr-3 text-purple-400" />
                                    <a
                                        href={applicant.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-300 hover:underline"
                                    >
                                        GitHub Profile
                                    </a>
                                </li>
                                <li className="flex items-center">
                                    <FaLinkedin className="mr-3 text-blue-500" />
                                    <a
                                        href={applicant.linkedIn}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-300 hover:underline"
                                    >
                                        LinkedIn Profile
                                    </a>
                                </li>
                                <li className="flex items-center">
                                    <FaFileAlt className="mr-3 text-green-400" />
                                    <a
                                        href={applicant.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-300 hover:underline"
                                    >
                                        View Resume
                                    </a>
                                </li>
                            </ul>

                            {/* Application Status Section */}
                            <div className="mt-4">
                                <label className="text-gray-300 font-medium flex items-center mb-2">
                                    <FaUserCheck className="mr-2 text-yellow-400" />
                                    Application Status:
                                </label>
                                <select
                                    defaultValue={applicant.status || 'Pending'}
                                    onChange={(e) => handleStatusChange(applicant._id, e.target.value)}
                                    className="w-full p-2 bg-gray-800 text-gray-300 border border-gray-600 rounded-md"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Reviewed">Reviewed</option>
                                    <option value="Shortlisted">Shortlisted</option>
                                    <option value="Hired">Hired</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Applicants;
