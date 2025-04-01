import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaFilePdf, FaArrowLeft } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';

const JobApply = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useAuth();

    const submitJobApplication = e => {
        e.preventDefault();
        const form = e.target;
        const linkedIn = form.linkedIn.value;
        const github = form.github.value;
        const resume = form.resume.value;

        const jobApplication = {
            job_id: id,
            applicant_email: user?.email,
            linkedIn,
            github,
            resume
        }

        fetch('http://localhost:3000/job-Applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jobApplication)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    form.reset();
                    Swal.fire({
                        title: 'Application Submitted!',
                        text: 'Your application has been successfully submitted.',
                        icon: 'success',
                        confirmButtonColor: '#3b82f6',
                        background: '#1f2937',
                        color: '#f3f4f6'
                    }).then(() => {
                        navigate('/');
                    });
                }
            })




    }



    return (
        <div className="max-w-2xl mx-auto p-4 md:p-6">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-400 hover:text-blue-400 mb-6 transition-colors"
            >
                <FaArrowLeft /> Back to Job
            </button>

            <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-700">
                    <h1 className="text-3xl font-bold text-gray-300">Job Application</h1>
                    <p className="text-gray-400 mt-2">Complete the form below to apply for this position</p>
                </div>

                <form onSubmit={submitJobApplication} className="p-6 md:p-8">
                    <div className="space-y-6">
                        {/* LinkedIn Field */}
                        <div className="form-group">
                            <label className="block mb-2 text-gray-300">
                                <FaLinkedin className="inline mr-2 text-blue-400" />
                                LinkedIn Profile URL
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                                    https://
                                </div>
                                <input
                                    type="url"
                                    name="linkedIn"
                                    placeholder="linkedin.com/in/yourprofile"
                                    className="input-field pl-20"
                                    // pattern="https?://(www\.)?linkedin\.com/.*"
                                    required
                                />
                            </div>
                            <p className="mt-1 text-sm text-gray-500">Must be a valid LinkedIn URL</p>
                        </div>

                        {/* GitHub Field */}
                        <div className="form-group">
                            <label className="block mb-2 text-gray-300">
                                <FaGithub className="inline mr-2 text-gray-400" />
                                GitHub Profile URL
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                                    https://
                                </div>
                                <input
                                    type="url"
                                    name="github"
                                    placeholder="github.com/yourusername"
                                    className="input-field pl-20"
                                    // pattern="https?://(www\.)?github\.com/.*"
                                    required
                                />
                            </div>
                            <p className="mt-1 text-sm text-gray-500">Must be a valid GitHub URL</p>
                        </div>

                        {/* Resume Field */}
                        <div className="form-group">
                            <label className="block mb-2 text-gray-300">
                                <FaFilePdf className="inline mr-2 text-red-400" />
                                Resume/CV URL
                            </label>
                            <input
                                type="url"
                                name="resume"
                                placeholder="https://yourdomain.com/resume.pdf"
                                className="input-field"
                                // pattern="https?://.*\.(pdf|docx?|pages)"
                                required
                            />
                            <p className="mt-1 text-sm text-gray-500">PDF, DOC, or DOCX format preferred</p>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full btn-primary-lg"
                            >
                                Submit Application
                            </button>
                        </div>
                    </div>
                </form>
            </div>


        </div>
    );
};

export default JobApply;