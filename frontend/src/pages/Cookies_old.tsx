import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const Cookies: React.FC = () => {
  const [cookieSettings, setCookieSettings] = useState({
    necessary: true,
    functional: true,
    analytics: false,
    marketing: false
  });

  const handleToggle = (category: keyof typeof cookieSettings) => {
    if (category === 'necessary') return; // Necessary cookies can't be disabled
    setCookieSettings(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleAcceptAll = () => {
    setCookieSettings({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true
    });
  };

  const handleSaveSettings = () => {
    // Save cookie preferences
    localStorage.setItem('cookieSettings', JSON.stringify(cookieSettings));
    alert('Cookie-Einstellungen gespeichert!');
  };

  const cookieCategories = [
    {
      id: 'necessary' as const,
      title: 'Notwendige Cookies',
      icon: '🔒',
      description: 'Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.',
      examples: [
        'Session-Cookies zur Authentifizierung',
        'Sicherheits-Cookies zur Verhinderung von CSRF-Angriffen',
        'Cookie-Einstellungen',
        'Sprachpräferenzen'
      ],
      canDisable: false
    },
    {
      id: 'functional' as const,
      title: 'Funktionale Cookies',
      icon: '⚙️',
      description: 'Diese Cookies ermöglichen erweiterte Funktionalität und Personalisierung.',
      examples: [
        'Gespeicherte Suchfilter',
        'Bevorzugte Ansichtseinstellungen',
        'Chat-Funktionen',
        'Merkliste und Favoriten'
      ],
      canDisable: true
    },
    {
      id: 'analytics' as const,
      title: 'Analytische Cookies',
      icon: '📊',
      description: 'Diese Cookies helfen uns zu verstehen, wie Besucher mit der Website interagieren.',
      examples: [
        'Google Analytics',
        'Seitenaufrufe und Nutzungsdauer',
        'Klickverhalten',
        'Performance-Metriken'
      ],
      canDisable: true
    },
    {
      id: 'marketing' as const,
      title: 'Marketing Cookies',
      icon: '🎯',
      description: 'Diese Cookies werden verwendet, um Werbung relevanter für Sie zu gestalten.',
      examples: [
        'Facebook Pixel',
        'Google Ads Tracking',
        'Retargeting-Cookies',
        'Conversion-Tracking'
      ],
      canDisable: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">
            Cookie-Richtlinie
          </h1>
          <p className="text-lg">
            Letzte Aktualisierung: 12. Januar 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <Card className="p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Was sind Cookies?</h2>
            <p className="text-gray-700 mb-4">
              Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden, wenn Sie eine Website besuchen. Sie helfen uns, die Website effizienter zu gestalten, Ihre Benutzererfahrung zu verbessern und Informationen über die Nutzung der Website zu sammeln.
            </p>
            <p className="text-gray-700">
              Cookies können dauerhaft (persistente Cookies) oder vorübergehend (Session-Cookies) gespeichert werden. Sie werden entweder direkt von uns (First-Party-Cookies) oder von Drittanbietern (Third-Party-Cookies) gesetzt.
            </p>
          </div>
        </Card>

        {/* Cookie Categories */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
            Cookie-Kategorien
          </h2>
          <div className="space-y-6">
            {cookieCategories.map((category) => (
              <Card key={category.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{category.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                      <p className="text-gray-600 mt-1">{category.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle(category.id)}
                    disabled={!category.canDisable}
                    className={`relative w-16 h-8 rounded-full transition-colors ${
                      cookieSettings[category.id] ? 'bg-green-500' : 'bg-gray-300'
                    } ${!category.canDisable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className={`absolute top-1 ${cookieSettings[category.id] ? 'right-1' : 'left-1'} w-6 h-6 bg-white rounded-full transition-all shadow`} />
                  </button>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Beispiele:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    {category.examples.map((example, idx) => (
                      <li key={idx} className="text-sm text-gray-600">{example}</li>
                    ))}
                  </ul>
                </div>

                {!category.canDisable && (
                  <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-800">
                      ℹ️ Diese Cookies sind technisch notwendig und können nicht deaktiviert werden.
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <Card className="p-8 mb-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Ihre Cookie-Einstellungen</h3>
            <p className="text-gray-600 mb-6">
              Sie können Ihre Zustimmung jederzeit anpassen oder zurückziehen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleAcceptAll}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg"
              >
                ✓ Alle akzeptieren
              </Button>
              <Button 
                onClick={handleSaveSettings}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg"
              >
                Einstellungen speichern
              </Button>
            </div>
          </div>
        </Card>

        {/* Additional Information */}
        <Card className="p-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Weitere Informationen</h2>
            
            <h3 className="text-xl font-bold mb-3 text-gray-800">Wie Sie Cookies verwalten können</h3>
            <p className="text-gray-700 mb-4">
              Sie können Cookies in Ihren Browsereinstellungen verwalten und löschen:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Chrome:</strong> Einstellungen → Datenschutz und Sicherheit → Cookies</li>
              <li><strong>Firefox:</strong> Einstellungen → Datenschutz & Sicherheit → Cookies</li>
              <li><strong>Safari:</strong> Einstellungen → Datenschutz → Cookies</li>
              <li><strong>Edge:</strong> Einstellungen → Cookies und Websiteberechtigungen</li>
            </ul>

            <h3 className="text-xl font-bold mb-3 text-gray-800">Do Not Track (DNT)</h3>
            <p className="text-gray-700 mb-6">
              Wir respektieren Do-Not-Track-Signale. Wenn Sie DNT in Ihrem Browser aktiviert haben, setzen wir keine Tracking-Cookies.
            </p>

            <h3 className="text-xl font-bold mb-3 text-gray-800">Cookie-Lebensdauer</h3>
            <p className="text-gray-700 mb-4">
              Die Lebensdauer von Cookies variiert:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Session-Cookies:</strong> Werden beim Schließen des Browsers gelöscht</li>
              <li><strong>Persistente Cookies:</strong> Bleiben für einen festgelegten Zeitraum gespeichert (maximal 2 Jahre)</li>
            </ul>

            <h3 className="text-xl font-bold mb-3 text-gray-800">Kontakt</h3>
            <p className="text-gray-700 mb-2">
              Bei Fragen zu unserer Cookie-Richtlinie können Sie uns kontaktieren:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">E-Mail: <a href="mailto:privacy@careerwave.de" className="text-blue-600 hover:underline">privacy@careerwave.de</a></p>
              <p className="text-gray-700">Telefon: +49 (0) 30 1234567</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Cookies;
