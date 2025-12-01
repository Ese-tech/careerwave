import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Badge } from '../components/ui';

const featuredJobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp GmbH',
    location: 'Berlin',
    type: 'full-time',
    salary: { min: 70000, max: 90000, currency: 'EUR' },
    tags: ['React', 'TypeScript', 'Remote'],
    remote: true,
    publishedAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'StartupX',
    location: 'München',
    type: 'full-time',
    salary: { min: 80000, max: 100000, currency: 'EUR' },
    tags: ['Strategie', 'Agile', 'B2B'],
    remote: false,
    publishedAt: '2024-01-14'
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    company: 'CloudSystems',
    location: 'Hamburg',
    type: 'full-time',
    salary: { min: 65000, max: 85000, currency: 'EUR' },
    tags: ['AWS', 'Docker', 'Kubernetes'],
    remote: true,
    publishedAt: '2024-01-13'
  }
];

const companies = [
  { name: 'TechCorp', logo: '🏢', openJobs: 12 },
  { name: 'StartupX', logo: '🚀', openJobs: 8 },
  { name: 'CloudSystems', logo: '☁️', openJobs: 15 },
  { name: 'DataFlow', logo: '📊', openJobs: 6 },
  { name: 'AILabs', logo: '🤖', openJobs: 9 },
  { name: 'GreenTech', logo: '🌱', openJobs: 4 }
];

export function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Finden Sie Ihren
              <span className="block text-secondary-300">Traumjob</span>
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8">
              Verbinden Sie sich mit den besten Unternehmen und entdecken Sie 
              Karrierechancen, die perfekt zu Ihnen passen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex w-full max-w-md">
                <input
                  type="text"
                  placeholder="Position oder Stichwort..."
                  className="flex-1 px-4 py-3 rounded-l-lg border-0 focus:ring-2 focus:ring-secondary-400 text-gray-900"
                />
                <input
                  type="text"
                  placeholder="Ort..."
                  className="flex-1 px-4 py-3 border-0 focus:ring-2 focus:ring-secondary-400 text-gray-900"
                />
                <Button className="px-6 py-3 rounded-r-lg rounded-l-none" variant="secondary">
                  Suchen
                </Button>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {['React', 'Python', 'AWS', 'Product Management', 'Design', 'Marketing'].map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-white/20 text-white border border-white/30 hover:bg-white/30 transition-colors cursor-pointer">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary-600">15,000+</div>
            <div className="text-gray-600 dark:text-gray-400">Aktive Jobs</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary-600">2,500+</div>
            <div className="text-gray-600 dark:text-gray-400">Unternehmen</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary-600">50,000+</div>
            <div className="text-gray-600 dark:text-gray-400">Bewerber</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary-600">98%</div>
            <div className="text-gray-600 dark:text-gray-400">Erfolgsrate</div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Empfohlene Jobs
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Entdecken Sie die neuesten und besten Stellenangebote
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
                  </div>
                  {job.remote && (
                    <Badge variant="success" size="sm">Remote</Badge>
                  )}
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <span>📍 {job.location}</span>
                  <span className="mx-2">•</span>
                  <span className="capitalize">{job.type.replace('-', ' ')}</span>
                </div>

                <div className="text-sm font-medium text-primary-600">
                  €{job.salary.min.toLocaleString()} - €{job.salary.max.toLocaleString()}
                </div>

                <div className="flex flex-wrap gap-2">
                  {job.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="primary" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button variant="outline" className="w-full">
                  Details ansehen
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/jobs">
            <Button variant="primary" size="lg">
              Alle Jobs durchsuchen
            </Button>
          </Link>
        </div>
      </section>

      {/* Companies Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Top Unternehmen
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Arbeiten Sie bei den besten Unternehmen der Branche
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {companies.map((company) => (
              <Card 
                key={company.name} 
                className="text-center hover:shadow-md transition-shadow cursor-pointer"
                padding="md"
              >
                <div className="space-y-3">
                  <div className="text-3xl">{company.logo}</div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {company.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {company.openJobs} offene Stellen
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/companies">
              <Button variant="outline">
                Alle Unternehmen ansehen
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-accent-600 to-accent-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Bereit für den nächsten Schritt?
          </h2>
          <p className="text-xl text-accent-100 mb-8 max-w-2xl mx-auto">
            Erstellen Sie Ihr Profil und lassen Sie sich von den besten Unternehmen finden.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button variant="secondary" size="lg" className="bg-white text-accent-700 hover:bg-accent-50">
                Kostenloses Konto erstellen
              </Button>
            </Link>
            <Link to="/jobs">
              <Button variant="ghost" size="lg" className="text-white border-white hover:bg-white/10">
                Jobs durchsuchen
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}