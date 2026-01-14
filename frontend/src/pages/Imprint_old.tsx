import React from 'react';
import { Card } from '../components/ui/Card';

const Imprint: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">
            Impressum
          </h1>
          <p className="text-lg">
            Angaben gemäß § 5 TMG
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Company Information */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Firmeninformationen</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Firmenname</p>
                <p className="text-lg font-semibold text-gray-900">CareerWave GmbH</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">Anschrift</p>
                <p className="text-gray-900">Beispielstraße 123</p>
                <p className="text-gray-900">10115 Berlin</p>
                <p className="text-gray-900">Deutschland</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">Handelsregister</p>
                <p className="text-gray-900">Amtsgericht Berlin-Charlottenburg</p>
                <p className="text-gray-900">HRB 123456 B</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">USt-IdNr.</p>
                <p className="text-gray-900">DE123456789</p>
              </div>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Kontakt</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Telefon</p>
                <a href="tel:+493012345678" className="text-lg text-blue-600 hover:underline">
                  +49 (0) 30 1234567
                </a>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">E-Mail</p>
                <a href="mailto:info@careerwave.de" className="text-lg text-blue-600 hover:underline">
                  info@careerwave.de
                </a>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">Website</p>
                <a href="https://www.careerwave.de" className="text-lg text-blue-600 hover:underline">
                  www.careerwave.de
                </a>
              </div>
            </div>
          </Card>

          {/* Management */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Vertretungsberechtigte Geschäftsführung</h2>
            <div className="space-y-3">
              <div>
                <p className="text-lg font-semibold text-gray-900">Dr. Sarah Müller</p>
                <p className="text-gray-600">CEO & Gründerin</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">Michael Schmidt</p>
                <p className="text-gray-600">CTO & Gründer</p>
              </div>
            </div>
          </Card>

          {/* Regulatory Information */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Aufsichtsbehörde</h2>
            <div className="space-y-2">
              <p className="text-gray-900">Bundesagentur für Arbeit</p>
              <p className="text-gray-900">Regensburger Straße 104</p>
              <p className="text-gray-900">90478 Nürnberg</p>
            </div>
          </Card>
        </div>

        {/* Additional Legal Information */}
        <Card className="p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Haftungsausschluss</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Haftung für Inhalte</h3>
              <p className="text-gray-700">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Haftung für Links</h3>
              <p className="text-gray-700">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Urheberrecht</h3>
              <p className="text-gray-700">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Streitschlichtung</h3>
              <p className="text-gray-700">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://ec.europa.eu/consumers/odr</a>. Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
              <p className="text-gray-700 mt-3">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </div>
        </Card>

        {/* Design Credits */}
        <Card className="p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Bildnachweise & Credits</h2>
          <div className="space-y-3 text-gray-700">
            <p>Icons und Grafiken: Eigene Darstellung</p>
            <p>Fotos: Unsplash, Pexels (Lizenzen siehe jeweilige Plattform)</p>
            <p>Schriftarten: Google Fonts (Open-Source-Lizenzen)</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Imprint;
