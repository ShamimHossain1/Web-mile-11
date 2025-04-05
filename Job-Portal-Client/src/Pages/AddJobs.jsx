import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddJobs = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const jobData = {
            title: form.title.value,
            location: form.location.value,
            jobType: form.jobType.value,
            category: form.category.value,
            applicationDeadline: form.applicationDeadline.value,
            salaryRange: {
                min: parseInt(form.salaryMin.value),
                max: parseInt(form.salaryMax.value),
                currency: "bdt"
            },
            description: form.description.value,
            company: form.company.value,
            requirements: form.requirements.value.split(',').map(r => r.trim()),
            responsibilities: form.responsibilities.value.split(',').map(r => r.trim()),
            status: "active",
            hr_email: form.hr_email.value,
            hr_name: form.hr_name.value,
            company_logo: form.company_logo.value
        };

        
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-200 mb-6">Post a New Job</h1>

            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl space-y-5">
                <input type="text" name="title" placeholder="Job Title" required className="input-field" />
                <input type="text" name="location" placeholder="Location (e.g. Halishohor, Chittagong)" required className="input-field" />
                <input type="text" name="jobType" placeholder="Job Type (e.g. Hybrid, Remote, On-site)" required className="input-field" />
                <input type="text" name="category" placeholder="Job Category (e.g. Engineering)" required className="input-field" />
                <input type="date" name="applicationDeadline" required className="input-field" />
                
                <div className="grid grid-cols-2 gap-4">
                    <input type="number" name="salaryMin" placeholder="Min Salary (e.g. 40000)" required className="input-field" />
                    <input type="number" name="salaryMax" placeholder="Max Salary (e.g. 60000)" required className="input-field" />
                </div>

                <textarea name="description" placeholder="Job Description" required className="input-field h-24" />
                <input type="text" name="company" placeholder="Company Name" required className="input-field" />
                <input type="text" name="requirements" placeholder="Requirements (comma separated)" required className="input-field" />
                <input type="text" name="responsibilities" placeholder="Responsibilities (comma separated)" required className="input-field" />

                <input type="email" name="hr_email" placeholder="HR Email" required className="input-field" />
                <input type="text" name="hr_name" placeholder="HR Name" required className="input-field" />
                <input type="url" name="company_logo" placeholder="Company Logo URL" className="input-field" />

                <button type="submit" className="btn-primary-lg w-full">Post Job</button>
            </form>
        </div>
    );
};

export default AddJobs;
