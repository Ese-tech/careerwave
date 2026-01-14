import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../components/ui/Card';

const Privacy: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">
            {t('privacy.title')}
          </h1>
          <p className="text-lg">
            {t('privacy.lastUpdated')}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="p-8">
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('privacy.section1.title')}</h2>
              <p className="text-gray-700 mb-4">
                {t('privacy.section1.intro')}
              </p>
              <p className="text-gray-700">
                {t('privacy.section1.responsible')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('privacy.section2.title')}</h2>
              
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t('privacy.section2.cookies.title')}</h3>
              <p className="text-gray-700 mb-4">
                {t('privacy.section2.cookies.description')}
              </p>
              
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t('privacy.section2.serverLogs.title')}</h3>
              <p className="text-gray-700 mb-4">
                {t('privacy.section2.serverLogs.description')}
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>{t('privacy.section2.serverLogs.items.browserType')}</li>
                <li>{t('privacy.section2.serverLogs.items.os')}</li>
                <li>{t('privacy.section2.serverLogs.items.referrerUrl')}</li>
                <li>{t('privacy.section2.serverLogs.items.hostname')}</li>
                <li>{t('privacy.section2.serverLogs.items.time')}</li>
                <li>{t('privacy.section2.serverLogs.items.ip')}</li>
              </ul>
              <p className="text-gray-700">
                {t('privacy.section2.serverLogs.legal')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">3. Ihre Rechte</h2>
              <p className="text-gray-700 mb-4">
                Sie haben jederzeit das Recht:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu erhalten (Art. 15 DSGVO)</li>
                <li>Die Berichtigung unrichtiger oder unvollständiger Daten zu verlangen (Art. 16 DSGVO)</li>
                <li>Die Löschung Ihrer bei uns gespeicherten Daten zu verlangen (Art. 17 DSGVO)</li>
                <li>Die Einschränkung der Verarbeitung Ihrer Daten zu verlangen (Art. 18 DSGVO)</li>
                <li>Der Verarbeitung Ihrer Daten zu widersprechen (Art. 21 DSGVO)</li>
                <li>Ihre Daten in einem strukturierten Format zu erhalten (Art. 20 DSGVO)</li>
                <li>Sich bei einer Aufsichtsbehörde zu beschweren (Art. 77 DSGVO)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">4. Registrierung und Nutzerkonto</h2>
              <p className="text-gray-700 mb-4">
                Bei der Registrierung auf unserer Plattform erheben wir folgende personenbezogene Daten:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Name und Vorname</li>
                <li>E-Mail-Adresse</li>
                <li>Passwort (verschlüsselt gespeichert)</li>
                <li>Berufliche Informationen (freiwillig)</li>
                <li>Lebenslauf und Bewerbungsunterlagen (bei Jobsuchenden)</li>
              </ul>
              <p className="text-gray-700">
                Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sowie zur Erfüllung des Vertrags (Art. 6 Abs. 1 lit. b DSGVO).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">5. Bewerbungsprozess</h2>
              <p className="text-gray-700 mb-4">
                Wenn Sie sich auf eine Stelle bewerben, verarbeiten wir Ihre Bewerbungsdaten zum Zweck der Durchführung des Bewerbungsverfahrens. Dies umfasst:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Lebenslauf und Anschreiben</li>
                <li>Zeugnisse und Qualifikationsnachweise</li>
                <li>Kontaktdaten</li>
                <li>Beruflicher Werdegang</li>
              </ul>
              <p className="text-gray-700">
                Die Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO i.V.m. § 26 BDSG. Ihre Daten werden nach Abschluss des Bewerbungsverfahrens gelöscht, sofern Sie nicht einer weiteren Speicherung zugestimmt haben.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">6. Weitergabe von Daten</h2>
              <p className="text-gray-700 mb-4">
                Eine Weitergabe Ihrer persönlichen Daten an Dritte erfolgt nur:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Wenn Sie ausdrücklich eingewilligt haben (Art. 6 Abs. 1 lit. a DSGVO)</li>
                <li>Zur Vertragserfüllung erforderlich ist (Art. 6 Abs. 1 lit. b DSGVO)</li>
                <li>Eine gesetzliche Verpflichtung besteht (Art. 6 Abs. 1 lit. c DSGVO)</li>
                <li>Dies zur Geltendmachung von Rechtsansprüchen erforderlich ist (Art. 6 Abs. 1 lit. f DSGVO)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">7. Einsatz von Analyse-Tools</h2>
              
              <h3 className="text-xl font-bold mb-3 text-gray-800">Google Analytics</h3>
              <p className="text-gray-700 mb-4">
                Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die Google Ireland Limited. Google Analytics verwendet Cookies. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.
              </p>
              <p className="text-gray-700">
                Die Speicherung von Google-Analytics-Cookies und die Nutzung dieses Analyse-Tools erfolgen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">8. Datensicherheit</h2>
              <p className="text-gray-700 mb-4">
                Wir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren (Secure Socket Layer) in Verbindung mit der jeweils höchsten Verschlüsselungsstufe, die von Ihrem Browser unterstützt wird.
              </p>
              <p className="text-gray-700">
                Darüber hinaus setzen wir geeignete technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten gegen zufällige oder vorsätzliche Manipulationen, teilweisen oder vollständigen Verlust, Zerstörung oder gegen den unbefugten Zugriff Dritter zu schützen.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">9. Speicherdauer</h2>
              <p className="text-gray-700">
                Wir speichern personenbezogene Daten nur so lange, wie dies für die Zwecke, für die sie erhoben wurden, erforderlich ist oder wie es durch gesetzliche Aufbewahrungsfristen vorgeschrieben ist. Nach Wegfall des jeweiligen Zwecks bzw. Ablauf dieser Fristen werden die entsprechenden Daten routinemäßig und entsprechend den gesetzlichen Vorschriften gelöscht.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">10. Kontakt</h2>
              <p className="text-gray-700 mb-4">
                Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 font-semibold">CareerWave GmbH</p>
                <p className="text-gray-700">Datenschutzbeauftragter</p>
                <p className="text-gray-700">Beispielstraße 123</p>
                <p className="text-gray-700">10115 Berlin</p>
                <p className="text-gray-700 mt-2">E-Mail: datenschutz@careerwave.de</p>
                <p className="text-gray-700">Telefon: +49 (0) 30 1234567</p>
              </div>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;
