// frontend/src/pages/Jobs/ JobsListings.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const JobsListings: React.FC = () => {
    // Mock data for initial display
    const mockJobs = [
        { id: '1', title: 'Senior Frontend Developer', company: 'TechCorp', location: 'Remote', salary: '$120k' },
        { id: '2', title: 'Data Scientist', company: 'DataGen', location: 'New York', salary: '$150k' },
        { id: '3', title: 'Product Manager', company: 'InnovateX', location: 'Berlin', salary: '€90k' },
    ];

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Available Job Listings</h1>
            <div className="space-y-4">
                {mockJobs.map((job) => (
                    <div key={job.id} className="admin-card flex justify-between items-center hover:shadow-lg transition">
                        <div>
                            <Link to={`/jobs/${job.id}`} className="text-xl font-semibold admin-link">
                                {job.title}
                            </Link>
                            <p className="text-gray-600">{job.company} | {job.location}</p>
                            <p className="text-sm font-medium text-green-600">{job.salary}</p>
                        </div>
                        <Link to={`/jobs/${job.id}`} className="admin-button">
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
            {mockJobs.length === 0 && <p className="text-gray-500">No jobs found.</p>}
        </div>
    );
};

export default JobsListings;