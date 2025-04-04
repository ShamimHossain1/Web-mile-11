import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { FaTrashAlt } from 'react-icons/fa';

const MypostedJobs = () => {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/jobs?hr_email=${user.email}`)
                .then(res => res.json())
                .then(data => setJobs(data));
        }
    }, [user.email]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!',
            background: '#1f2937',
            color: '#f3f4f6'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/jobs/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            setJobs(jobs.filter(job => job._id !== id));
                            Swal.fire(
                                'Deleted!',
                                'The job has been removed.',
                                'success'
                            );
                        }
                    });
            }
        });
    };

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-6 text-gray-200">
            <h1 className="text-3xl font-bold mb-6">My Posted Jobs</h1>
            {
                jobs.length === 0 ? (
                    <p className="text-gray-400">You haven't posted any jobs yet.</p>
                ) : (
                    <div className="grid gap-6">
                        {jobs.map(job => (
                            <div
                                key={job._id}
                                className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-md relative"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-xl font-semibold">{job.title}</h2>
                                        <p className="text-gray-400">{job.company} — {job.location}</p>
                                        <p className="text-sm mt-2 text-gray-400">Type: {job.jobType}</p>
                                        <p className="text-sm text-gray-400">Category: {job.category}</p>
                                        <p className="text-sm text-gray-400">Salary: {job.salaryRange?.min} - {job.salaryRange?.max} {job.salaryRange?.currency?.toUpperCase()}</p>
                                        <p className="text-sm mt-2 text-gray-400">Deadline: {job.applicationDeadline}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(job._id)}
                                        className="text-red-500 hover:text-red-400 text-xl"
                                        title="Delete Job"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </div>
                                <p className="mt-4 text-sm text-gray-300">{job.description}</p>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default MypostedJobs;
