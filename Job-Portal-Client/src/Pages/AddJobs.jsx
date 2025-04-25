import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AddJobs = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
   

    const [currencySymbol, setCurrencySymbol] = useState('৳');

    const handleCurrencyChange = (e) => {
        const value = e.target.value;
        setCurrencySymbol(value === 'usd' ? '$' : value === 'eur' ? '€' : '৳');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        // const formData = new FormData(form);
        // const formDataObj = Object.fromEntries(formData.entries());
        // console.log(formDataObj); // For debugging purposes
        // console.log(formData);

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
            requirements: form.requirements.value.split('\n').map(r => r.trim()),
            responsibilities: form.responsibilities.value.split('\n').map(r => r.trim()),
            status: "active",
            hr_email: form.hr_email.value,
            hr_name: form.hr_name.value,
            company_logo: form.company_logo.value
        };

        fetch("https://job-portal-server-d28ye5li7-shamimhossain1s-projects.vercel.app/AddJobs",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jobData)

        })
        .then(res => res.json())
        .then(data => {
            if (data.acknowledged) {
                form.reset();
                Swal.fire({
                    title: 'Job Posted!',
                    text: 'Your job has been successfully posted.',
                    icon: 'success',
                    confirmButtonColor: '#3b82f6',
                    background: '#1f2937',
                    color: '#f3f4f6'
                }).then(() => {
                    navigate('/');
                });
            }
        })

        
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-200 mb-6">Post a New Job</h1>

            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl space-y-5">
                <input type="text" name="title" placeholder="Job Title" required className="input-field" />
                <input type="text" name="location" placeholder="Location (e.g. Halishohor, Chittagong)" required className="input-field" />

                {/* Job Type Dropdown */}
                <select name="jobType" required className="input-field">
                    <option value="">Select Job Type</option>
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                </select>

                {/* Category Dropdown */}
                <select name="category" required className="input-field">
                    <option value="">Select Job Category</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Product">Product</option>
                    <option value="Sales">Sales</option>
                    <option value="Support">Support</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                </select>

                <input type="date" name="applicationDeadline" required className="input-field" />

                {/* Salary Inputs with Currency Dropdown */}
                <div className="grid grid-cols-2 gap-4">
                    <input type="number" name="salaryMin" placeholder={`Min Salary (${currencySymbol})`} required className="input-field" />
                    <input type="number" name="salaryMax" placeholder={`Max Salary (${currencySymbol})`} required className="input-field" />
                </div>
                <select name="currency" onChange={handleCurrencyChange} required className="input-field">
                    <option value="bdt">BDT (৳)</option>
                    <option value="usd">USD ($)</option>
                    <option value="eur">EUR (€)</option>
                </select>

                <textarea name="description" placeholder="Job Description" required className="input-field h-24" />
                <input type="text" name="company" placeholder="Company Name" required className="input-field" />
                <input type="text" name="requirements" placeholder="Requirements (comma separated)" required className="input-field" />
                <input type="text" name="responsibilities" placeholder="Responsibilities (comma separated)" required className="input-field" />

                <input type="email" name="hr_email" required value={user?.email} readOnly className="input-field" />
              
                <input type="text" name="hr_name" placeholder="HR Name" required className="input-field" />
                <input type="url" name="company_logo" placeholder="Company Logo URL" className="input-field" />

                <button type="submit" className="btn-primary-lg w-full">Post Job</button>
            </form>
        </div>
    );
};

export default AddJobs;
