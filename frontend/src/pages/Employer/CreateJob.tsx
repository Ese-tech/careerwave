// frontend/src/pages/Employer/CreateJob.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { api } from '../../services/api';
import { useAuthStore } from '../../store/authStore';

interface JobFormData {
  title: string;
  description: string;
  requirements: string;
  location: string;
  locationType: 'onsite' | 'remote' | 'hybrid';
  contractType: 'full-time' | 'part-time' | 'contract' | 'internship';
  experienceLevel: 'entry' | 'mid' | 'senior' | 'lead';
  salaryMin?: number;
  salaryMax?: number;
  benefits: string;
  applicationDeadline?: string;
  companyDescription: string;
  category?: string;
}

const CreateJob: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    description: '',
    requirements: '',
    location: '',
    locationType: 'onsite',
    contractType: 'full-time',
    experienceLevel: 'mid',
    benefits: '',
    companyDescription: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Convert numeric fields to numbers
    if (name === 'salaryMin' || name === 'salaryMax') {
      setFormData(prev => ({ ...prev, [name]: value ? Number(value) : undefined }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Upload image to backend if provided
      let imageUrl = '';
      if (imageFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', imageFile);
        
        const uploadResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/upload/job-image`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${useAuthStore.getState().token}`,
          },
          body: uploadFormData,
        });
        
        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          imageUrl = uploadData.imageUrl || uploadData.url;
        } else {
          throw new Error('Bild-Upload fehlgeschlagen');
        }
      }

      // Create job with image URL
      const jobData = {
        ...formData,
        imageUrl,
        employerId: user?.id,
        status: 'published',
        published: true,
      };

      const response = await api.post('/employer/jobs', jobData);

      if (response.success) {
        navigate('/employer/jobs');
      } else {
        setError(response.error || 'Fehler beim Erstellen der Stellenanzeige');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Erstellen der Stellenanzeige');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Neue Stellenanzeige erstellen
          </h1>
          <p className="text-gray-600">
            Füllen Sie alle Details aus, um qualifizierte Kandidaten zu erreichen
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              <p className="font-semibold">{error}</p>
            </div>
          </div>
        )}

        <Card className="p-8 shadow-xl border border-gray-100 rounded-2xl bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stellentitel *
              </label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="z.B. Senior Software Engineer"
                required
                className="w-full"
              />
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stellenbeschreibung *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Beschreiben Sie die Position, Aufgaben und Verantwortlichkeiten..."
                required
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Anforderungen *
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                placeholder="Listen Sie die erforderlichen Qualifikationen und Fähigkeiten auf..."
                required
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
              />
            </div>

            {/* Location & Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Standort *
                </label>
                <Input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="z.B. Berlin, Deutschland"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Arbeitsort-Typ *
                </label>
                <select
                  name="locationType"
                  value={formData.locationType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
                >
                  <option value="onsite">Vor Ort</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            {/* Contract Type & Experience Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vertragsart *
                </label>
                <select
                  name="contractType"
                  value={formData.contractType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
                >
                  <option value="full-time">Vollzeit</option>
                  <option value="part-time">Teilzeit</option>
                  <option value="contract">Vertrag</option>
                  <option value="internship">Praktikum</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Erfahrungsstufe *
                </label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
                >
                  <option value="entry">Berufseinsteiger</option>
                  <option value="mid">Mittleres Level</option>
                  <option value="senior">Senior</option>
                  <option value="lead">Lead/Manager</option>
                </select>
              </div>
            </div>

            {/* Salary Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mindestgehalt (€)
                </label>
                <Input
                  type="number"
                  name="salaryMin"
                  value={formData.salaryMin?.toString() || ''}
                  onChange={handleInputChange}
                  placeholder="z.B. 50000"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Maximalgehalt (€)
                </label>
                <Input
                  type="number"
                  name="salaryMax"
                  value={formData.salaryMax?.toString() || ''}
                  onChange={handleInputChange}
                  placeholder="z.B. 80000"
                  className="w-full"
                />
              </div>
            </div>

            {/* Benefits */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Benefits
              </label>
              <textarea
                name="benefits"
                value={formData.benefits}
                onChange={handleInputChange}
                placeholder="z.B. Homeoffice, Flexible Arbeitszeiten, Gesundheitsversicherung..."
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
              />
            </div>

            {/* Application Deadline */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bewerbungsfrist
              </label>
              <input
                type="date"
                name="applicationDeadline"
                value={formData.applicationDeadline || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
              />
            </div>

            {/* Company Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Unternehmensbeschreibung *
              </label>
              <textarea
                name="companyDescription"
                value={formData.companyDescription}
                onChange={handleInputChange}
                placeholder="Beschreiben Sie Ihr Unternehmen und die Unternehmenskultur..."
                required
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
              />
            </div>

            {/* Job Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Job Bild (optional)
              </label>
              <div className="mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                />
              </div>
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Job preview"
                    className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
                  />
                </div>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kategorie
              </label>
              <Input
                type="text"
                name="category"
                value={formData.category || ''}
                onChange={handleInputChange}
                placeholder="z.B. IT, Marketing, Vertrieb..."
                className="w-full"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                onClick={() => navigate('/employer/jobs')}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl font-semibold"
              >
                Abbrechen
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-linear-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">🔄</span> Wird erstellt...
                  </span>
                ) : (
                  'Stellenanzeige veröffentlichen'
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateJob;
