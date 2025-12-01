// frontend/src/pages/Jobs/JobDetails.tsx

import { useParams } from 'react-router-dom';

const JobDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // Mock data for the specific job
    const mockJob = {
        title: 'Senior Frontend Developer',
        company: 'TechCorp',
        location: 'Remote',
        salary: '$120,000 - $140,000 per year',
        description: `Join our dynamic team as a Senior Frontend Developer. You will be responsible for leading the development of our customer-facing applications, ensuring high performance and responsiveness. We use React, TypeScript, and Tailwind CSS.
        
        Responsibilities include:
        - Designing and implementing new features.
        - Optimizing application performance.
        - Mentoring junior developers.
        - Collaborating with UX/UI designers.
        `,
        requirements: ['5+ years of experience with React', 'Expertise in TypeScript/JavaScript', 'Familiarity with GraphQL is a plus'],
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="admin-card p-8">
                <h1 className="text-3xl font-bold mb-2 text-gray-800">{mockJob.title}</h1>
                <p className="text-xl text-blue-600 mb-4">{mockJob.company} - {mockJob.location}</p>
                
                <div className="mb-6">
                    <span className="admin-badge bg-green-100 text-green-800 mr-2">{mockJob.salary}</span>
                    <span className="admin-badge bg-blue-100 text-blue-800">Full-Time</span>
                </div>

                <h2 className="admin-subheader text-gray-700">Job Description</h2>
                <div className="whitespace-pre-wrap text-gray-600 mb-6">
                    {mockJob.description}
                </div>

                <h2 className="admin-subheader text-gray-700">Requirements</h2>
                <ul className="list-disc list-inside space-y-1 text-gray-600 mb-8">
                    {mockJob.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                    ))}
                </ul>

                <button className="admin-button bg-green-600 hover:bg-green-700 text-xl w-full">
                    Apply Now
                </button>
                <p className="mt-4 text-center text-sm text-gray-500">Job ID: {id}</p>
            </div>
        </div>
    );
};

export default JobDetails;