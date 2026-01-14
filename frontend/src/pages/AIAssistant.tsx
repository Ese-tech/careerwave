// frontend/src/pages/AIAssistant.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/authStore';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { SparklesIcon, BriefcaseIcon, DocumentTextIcon, UserIcon } from '@heroicons/react/24/outline';

const AIAssistant: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [generating, setGenerating] = useState(false);
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');
  
  // Cover letter states
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [userSkills, setUserSkills] = useState('');

  // Interview preparation states
  const [interviewJobTitle, setInterviewJobTitle] = useState('');
  const [interviewCompany, setInterviewCompany] = useState('');
  const [interviewLevel, setInterviewLevel] = useState('');
  const [generatingQuestions, setGeneratingQuestions] = useState(false);
  const [interviewQuestions, setInterviewQuestions] = useState<Array<{question: string, answer: string}>>([]);

  const handleGenerateCoverLetter = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setGenerating(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1'}/ai/generate-cover-letter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${useAuthStore.getState().token}`
        },
        body: JSON.stringify({
          jobTitle,
          companyName,
          jobDescription,
          skills: userSkills.split(',').map(s => s.trim())
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate cover letter');
      }

      const data = await response.json();
      setGeneratedCoverLetter(data.coverLetter);
    } catch (error) {
      console.error('Error generating cover letter:', error);
      alert('Fehler beim Generieren des Anschreibens. Bitte versuchen Sie es erneut.');
    } finally {
      setGenerating(false);
    }
  };

  const handleGenerateInterviewQuestions = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setGeneratingQuestions(true);
    try {
      // Mock questions - in production, this would call the backend API
      const mockQuestions = [
        {
          question: `Warum möchten Sie als ${interviewJobTitle} bei ${interviewCompany} arbeiten?`,
          answer: `Ich bin von ${interviewCompany} begeistert, weil das Unternehmen in der Branche führend ist und innovative Lösungen entwickelt. Als ${interviewJobTitle} könnte ich meine Fähigkeiten optimal einsetzen und zur Weiterentwicklung des Teams beitragen. Besonders interessiert mich [spezifische Projekte/Technologien des Unternehmens].`
        },
        {
          question: `Was sind Ihre größten Stärken als ${interviewJobTitle}?`,
          answer: `Meine Hauptstärken liegen in [relevante technische Fähigkeiten], der Fähigkeit zur Problemlösung und der Teamarbeit. Ich habe bereits erfolgreich [konkrete Beispiele aus der Vergangenheit] umgesetzt und dabei [messbare Ergebnisse] erzielt.`
        },
        {
          question: 'Beschreiben Sie eine herausfordernde Situation in Ihrem bisherigen Berufsleben und wie Sie diese gemeistert haben.',
          answer: 'In meiner vorherigen Position stand ich vor [konkrete Herausforderung]. Ich habe das Problem analysiert, einen Plan entwickelt und mit dem Team zusammengearbeitet. Durch [konkrete Maßnahmen] konnten wir [positives Ergebnis] erreichen.'
        },
        {
          question: 'Wo sehen Sie sich in 5 Jahren?',
          answer: `In 5 Jahren möchte ich meine Expertise als ${interviewJobTitle} weiter ausgebaut haben und möglicherweise eine Führungsrolle übernehmen. Ich strebe danach, kontinuierlich zu lernen, innovative Projekte zu leiten und einen bedeutenden Beitrag zum Unternehmenserfolg zu leisten.`
        },
        {
          question: `Welche Technologien/Methoden sind für einen ${interviewJobTitle} besonders wichtig?`,
          answer: `Für diese Position sind ${userSkills || 'moderne Technologien und agile Methoden'} besonders relevant. Ich habe Erfahrung mit [spezifische Tools/Frameworks] und halte mich durch kontinuierliche Weiterbildung auf dem neuesten Stand.`
        },
        {
          question: 'Warum sollten wir gerade Sie einstellen?',
          answer: `Ich bringe nicht nur die erforderlichen technischen Fähigkeiten mit, sondern auch [Soft Skills wie Teamfähigkeit, Kommunikation]. Meine Erfahrung in [relevante Bereiche] und meine Leidenschaft für [Branche/Technologie] machen mich zu einem wertvollen Teammitglied, der sofort einen Beitrag leisten kann.`
        }
      ];

      setInterviewQuestions(mockQuestions);
    } catch (error) {
      console.error('Error generating interview questions:', error);
      alert('Fehler beim Generieren der Interviewfragen. Bitte versuchen Sie es erneut.');
    } finally {
      setGeneratingQuestions(false);
    }
  };

  const aiFeatures = [
    {
      icon: <BriefcaseIcon className="w-8 h-8 text-blue-600" />,
      title: 'Intelligente Jobempfehlungen',
      description: 'Erhalten Sie personalisierte Jobvorschläge basierend auf Ihrem Profil, Ihren Fähigkeiten und Karrierezielen.',
      action: () => navigate('/jobs'),
      buttonText: 'Jobs finden',
      available: true
    },
    {
      icon: <DocumentTextIcon className="w-8 h-8 text-purple-600" />,
      title: 'Automatische Anschreiben-Erstellung',
      description: 'Lassen Sie KI ein professionelles Anschreiben für Ihre Bewerbung erstellen - individuell auf die Stelle zugeschnitten.',
      action: () => document.getElementById('cover-letter-section')?.scrollIntoView({ behavior: 'smooth' }),
      buttonText: 'Anschreiben erstellen',
      available: true
    },
    {
      icon: <UserIcon className="w-8 h-8 text-green-600" />,
      title: 'Profiloptimierung',
      description: 'Optimieren Sie Ihr Profil mit KI-gestützten Vorschlägen für Skills, Erfahrungen und Beschreibungen.',
      action: () => navigate('/profile'),
      buttonText: 'Profil optimieren',
      available: true
    },
    {
      icon: <SparklesIcon className="w-8 h-8 text-orange-600" />,
      title: 'Interview-Vorbereitung',
      description: 'Bereiten Sie sich mit KI-generierten Interviewfragen und Antworten auf Vorstellungsgespräche vor.',
      action: () => document.getElementById('interview-section')?.scrollIntoView({ behavior: 'smooth' }),
      buttonText: 'Vorbereitung starten',
      available: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:bg-[#2C6C8B]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:bg-[#2C6C8B] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center">
              <SparklesIcon className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            KI-Unterstützung
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Nutzen Sie modernste KI-Technologie für Ihre Jobsuche und Bewerbungen
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {aiFeatures.map((feature, index) => (
            <Card key={index} className="p-8 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-slate-800 mb-6">
                    {feature.description}
                  </p>
                  <button
                    onClick={feature.action}
                    disabled={!feature.available}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      feature.available 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:scale-105' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {feature.buttonText}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Cover Letter Generator Section */}
      <div id="cover-letter-section" className="bg-gray-50 dark:bg-[#2C6C8B] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-slate-900 mb-4">
              Anschreiben Generator
            </h2>
            <p className="text-xl text-gray-600 dark:text-slate-800">
              Erstellen Sie ein professionelles Anschreiben in Sekunden
            </p>
          </div>

          <Card className="p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-900 mb-2">
                  Stellentitel
                </label>
                <Input
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="z.B. Senior Software Engineer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-900 mb-2">
                  Unternehmensname
                </label>
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="z.B. TechCorp GmbH"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-900 mb-2">
                  Stellenbeschreibung (Optional)
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Fügen Sie die Stellenbeschreibung ein oder beschreiben Sie die Position kurz..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px] dark:bg-[#BCD4E6] dark:text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-900 mb-2">
                  Ihre Fähigkeiten (Komma-getrennt)
                </label>
                <Input
                  value={userSkills}
                  onChange={(e) => setUserSkills(e.target.value)}
                  placeholder="z.B. React, TypeScript, Node.js, Leadership"
                />
              </div>

              <button
                onClick={handleGenerateCoverLetter}
                disabled={generating || !jobTitle || !companyName}
                className={`w-full px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center ${
                  generating || !jobTitle || !companyName
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:scale-105'
                }`}
              >
                {generating ? (
                  <>
                    <SparklesIcon className="w-5 h-5 mr-2 animate-spin" />
                    Generiere Anschreiben...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    Anschreiben erstellen
                  </>
                )}
              </button>

              {generatedCoverLetter && (
                <div className="mt-8 p-6 bg-white dark:bg-[#BCD4E6] rounded-lg border-2 border-blue-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-slate-900">
                      Ihr generiertes Anschreiben
                    </h3>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedCoverLetter);
                        alert('In Zwischenablage kopiert!');
                      }}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      📋 Kopieren
                    </button>
                  </div>
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-gray-700 dark:text-slate-900 text-sm leading-relaxed">
                      {generatedCoverLetter}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {!user && (
            <div className="mt-8 text-center p-6 bg-blue-50 dark:bg-[#BCD4E6] rounded-lg">
              <p className="text-gray-700 dark:text-slate-900 mb-4">
                Melden Sie sich an, um die KI-Funktionen vollständig nutzen zu können
              </p>
              <button 
                onClick={() => navigate('/login')}
                className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Jetzt anmelden
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Interview Preparation Section */}
      <div id="interview-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-slate-900 mb-4">
            Interview-Vorbereitung
          </h2>
          <p className="text-xl text-gray-600 dark:text-slate-800">
            Bereiten Sie sich optimal auf Ihr Vorstellungsgespräch vor
          </p>
        </div>

        <Card className="p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-900 mb-2">
                Position
              </label>
              <Input
                value={interviewJobTitle}
                onChange={(e) => setInterviewJobTitle(e.target.value)}
                placeholder="z.B. Senior Frontend Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-900 mb-2">
                Unternehmen
              </label>
              <Input
                value={interviewCompany}
                onChange={(e) => setInterviewCompany(e.target.value)}
                placeholder="z.B. TechCorp GmbH"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-900 mb-2">
                Erfahrungslevel
              </label>
              <select
                value={interviewLevel}
                onChange={(e) => setInterviewLevel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-[#BCD4E6] dark:text-slate-900"
              >
                <option value="">Bitte wählen...</option>
                <option value="junior">Junior (0-2 Jahre)</option>
                <option value="mid">Mid-Level (2-5 Jahre)</option>
                <option value="senior">Senior (5+ Jahre)</option>
                <option value="lead">Lead/Principal</option>
              </select>
            </div>

            <button
              onClick={handleGenerateInterviewQuestions}
              disabled={generatingQuestions || !interviewJobTitle || !interviewCompany}
              className={`w-full px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center ${
                generatingQuestions || !interviewJobTitle || !interviewCompany
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 to-pink-600 text-white hover:from-orange-600 hover:to-pink-700 shadow-md hover:shadow-lg transform hover:scale-105'
              }`}
            >
              {generatingQuestions ? (
                <>
                  <SparklesIcon className="w-5 h-5 mr-2 animate-spin" />
                  Generiere Fragen...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5 mr-2" />
                  Interviewfragen generieren
                </>
              )}
            </button>

            {interviewQuestions.length > 0 && (
              <div className="mt-8 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-900">
                    Ihre Interviewfragen
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-slate-700">
                    {interviewQuestions.length} Fragen
                  </span>
                </div>

                {interviewQuestions.map((item, index) => (
                  <div key={index} className="p-6 bg-gradient-to-r from-orange-50 to-pink-50 dark:bg-[#BCD4E6] rounded-lg border-2 border-orange-200">
                    <div className="mb-4">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-900 dark:text-slate-900 mb-2">
                            {item.question}
                          </h4>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-11">
                      <div className="bg-white dark:bg-white/80 p-4 rounded-lg border-l-4 border-green-500">
                        <p className="text-sm font-semibold text-green-700 mb-2">💡 Musterantwort:</p>
                        <p className="text-gray-700 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-6 p-4 bg-blue-50 dark:bg-[#BCD4E6] rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-slate-900">
                    <strong>💡 Tipp:</strong> Passen Sie die Musterantworten an Ihre persönlichen Erfahrungen an und üben Sie die Antworten laut, um sich optimal vorzubereiten.
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {!user && (
          <div className="mt-8 text-center p-6 bg-orange-50 dark:bg-[#BCD4E6] rounded-lg">
            <p className="text-gray-700 dark:text-slate-900 mb-4">
              Melden Sie sich an, um personalisierte Interviewfragen zu erhalten
            </p>
            <button 
              onClick={() => navigate('/login')}
              className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-orange-500 to-pink-600 text-white hover:from-orange-600 hover:to-pink-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Jetzt anmelden
            </button>
          </div>
        )}
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-slate-900 mb-4">
            Warum KI-Unterstützung nutzen?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2 dark:text-slate-900">Zeitersparnis</h3>
            <p className="text-gray-600 dark:text-slate-800">
              Erstellen Sie professionelle Bewerbungsunterlagen in Minuten statt Stunden
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2 dark:text-slate-900">Personalisiert</h3>
            <p className="text-gray-600 dark:text-slate-800">
              Jedes Anschreiben wird individuell auf die Stelle und das Unternehmen zugeschnitten
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-bold mb-2 dark:text-slate-900">Erfolgsquote steigern</h3>
            <p className="text-gray-600 dark:text-slate-800">
              Professionelle, fehlerfreie Bewerbungen erhöhen Ihre Chancen auf ein Interview
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
