import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../components/ui/Card';


interface CareerTip {
  id: number;
  category: string;
  title: string;
  description: string;
  icon: string;
  tips: string[];
  readTime: string;
}

const CareerTips: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedTip, setExpandedTip] = useState<number | null>(null);

  const careerTips: CareerTip[] = [
    {
      id: 1,
      category: 'Bewerbung',
      title: 'Der perfekte Lebenslauf',
      description: 'So gestaltest du einen Lebenslauf, der überzeugt',
      icon: '📄',
      readTime: '5 Min.',
      tips: [
        'Halte deinen Lebenslauf auf maximal 2 Seiten',
        'Verwende eine klare, professionelle Struktur',
        'Beginne mit deinen aktuellsten Erfahrungen (reverse chronologisch)',
        'Quantifiziere deine Erfolge mit konkreten Zahlen und Ergebnissen',
        'Passe deinen Lebenslauf für jede Stelle individuell an',
        'Verwende Aktionsverben wie "entwickelt", "implementiert", "geleitet"',
        'Achte auf perfekte Rechtschreibung und Grammatik',
        'Füge relevante Keywords aus der Stellenausschreibung ein'
      ]
    },
    {
      id: 2,
      category: 'Bewerbung',
      title: 'Das überzeugende Anschreiben',
      description: 'Wie du mit deinem Anschreiben herausstichst',
      icon: '✉️',
      readTime: '6 Min.',
      tips: [
        'Beginne mit einer starken Einleitung, die Interesse weckt',
        'Zeige echte Begeisterung für die Position und das Unternehmen',
        'Erkläre konkret, warum du perfekt für die Stelle bist',
        'Vermeide Standard-Floskeln und Wiederholungen aus dem Lebenslauf',
        'Adressiere spezifische Anforderungen aus der Stellenausschreibung',
        'Erzähle eine kurze Geschichte über relevante Erfolge',
        'Schließe mit einem klaren Call-to-Action',
        'Halte das Anschreiben auf maximal eine Seite'
      ]
    },
    {
      id: 3,
      category: 'Vorstellungsgespräch',
      title: 'Vorbereitung auf das Interview',
      description: 'Mit der richtigen Vorbereitung zum Erfolg',
      icon: '🎯',
      readTime: '8 Min.',
      tips: [
        'Recherchiere gründlich über das Unternehmen und die Branche',
        'Bereite Antworten auf häufige Fragen vor (STAR-Methode)',
        'Übe deine Selbstpräsentation (2-3 Minuten)',
        'Bereite eigene Fragen an den Interviewer vor',
        'Kleide dich angemessen und professionell',
        'Plane deine Anreise mit genügend Zeitpuffer',
        'Bringe mehrere Kopien deines Lebenslaufs mit',
        'Übe mit Freunden oder vor dem Spiegel'
      ]
    },
    {
      id: 4,
      category: 'Vorstellungsgespräch',
      title: 'Körpersprache und Auftreten',
      description: 'Der erste Eindruck zählt',
      icon: '🤝',
      readTime: '4 Min.',
      tips: [
        'Gib einen festen, selbstbewussten Händedruck',
        'Halte Augenkontakt, aber starre nicht',
        'Achte auf eine aufrechte, offene Körperhaltung',
        'Lächle authentisch und zeige positive Energie',
        'Vermeide nervöse Gesten wie Fingertrommeln',
        'Sprich klar und in angemessenem Tempo',
        'Zeige aktives Zuhören durch Nicken und Nachfragen',
        'Bleibe auch unter Stress ruhig und professionell'
      ]
    },
    {
      id: 5,
      category: 'Gehaltsverhandlung',
      title: 'Erfolgreich verhandeln',
      description: 'So bekommst du, was du verdienst',
      icon: '💰',
      readTime: '7 Min.',
      tips: [
        'Recherchiere vorher Marktgehälter für deine Position',
        'Warte auf das richtige Timing (nach Jobangebot)',
        'Nenne zuerst eine Gehaltsspanne statt einer fixen Zahl',
        'Begründe deine Forderung mit konkreten Qualifikationen',
        'Verhandle das Gesamtpaket (Bonus, Benefits, Weiterbildung)',
        'Bleibe freundlich und professionell, aber bestimmt',
        'Sei bereit zu kompromittieren, aber kenne deine Untergrenze',
        'Lasse dir das Angebot schriftlich geben'
      ]
    },
    {
      id: 6,
      category: 'Karriereentwicklung',
      title: 'Networking richtig gemacht',
      description: 'Baue ein wertvolles berufliches Netzwerk auf',
      icon: '🌐',
      readTime: '6 Min.',
      tips: [
        'Pflege dein LinkedIn-Profil professionell und aktuell',
        'Besuche Branchen-Events und Meetups',
        'Biete anderen Mehrwert, bevor du um Hilfe bittest',
        'Bleibe authentisch und zeige echtes Interesse',
        'Follow-up nach neuen Kontakten innerhalb von 24 Stunden',
        'Teile relevante Inhalte und zeige deine Expertise',
        'Pflege bestehende Kontakte regelmäßig',
        'Nutze Alumni-Netzwerke und Fachgruppen'
      ]
    },
    {
      id: 7,
      category: 'Karriereentwicklung',
      title: 'Weiterbildung und Skills',
      description: 'Bleibe am Puls der Zeit',
      icon: '📚',
      readTime: '5 Min.',
      tips: [
        'Identifiziere gefragte Skills in deiner Branche',
        'Nutze Online-Lernplattformen (Coursera, Udemy, LinkedIn Learning)',
        'Besuche Konferenzen und Workshops',
        'Lies Fachbücher und -artikel regelmäßig',
        'Arbeite an Side-Projects zur Praxis',
        'Hole dir Zertifizierungen für wichtige Qualifikationen',
        'Lerne von Mentoren und erfahrenen Kollegen',
        'Dokumentiere deine Lernfortschritte im Portfolio'
      ]
    },
    {
      id: 8,
      category: 'Soft Skills',
      title: 'Kommunikation am Arbeitsplatz',
      description: 'Effektiv kommunizieren im Job',
      icon: '💬',
      readTime: '5 Min.',
      tips: [
        'Höre aktiv zu, bevor du antwortest',
        'Kommuniziere klar und präzise',
        'Passe deinen Kommunikationsstil dem Empfänger an',
        'Gib konstruktives Feedback statt Kritik',
        'Nutze "Ich"-Botschaften statt Vorwürfe',
        'Dokumentiere wichtige Absprachen schriftlich',
        'Sei in Meetings vorbereitet und punktgenau',
        'Lerne, auch unangenehme Themen professionell anzusprechen'
      ]
    },
    {
      id: 9,
      category: 'Soft Skills',
      title: 'Zeitmanagement und Produktivität',
      description: 'Arbeite smarter, nicht härter',
      icon: '⏰',
      readTime: '6 Min.',
      tips: [
        'Nutze die Pomodoro-Technik (25 Min. Fokus, 5 Min. Pause)',
        'Priorisiere nach Eisenhower-Matrix (wichtig vs. dringend)',
        'Plane deinen Tag am Abend vorher',
        'Blockiere Fokuszeit in deinem Kalender',
        'Eliminiere Ablenkungen (Handy, Notifications)',
        'Delegiere, was andere besser können',
        'Sage Nein zu unwichtigen Aufgaben',
        'Reflektiere regelmäßig deine Arbeitsweise'
      ]
    },
    {
      id: 10,
      category: 'Work-Life-Balance',
      title: 'Burnout vermeiden',
      description: 'Achte auf deine mentale Gesundheit',
      icon: '🧘',
      readTime: '7 Min.',
      tips: [
        'Setze klare Grenzen zwischen Arbeit und Privatleben',
        'Nimm dir regelmäßig Pausen während des Arbeitstags',
        'Praktiziere Achtsamkeit und Meditation',
        'Treibe regelmäßig Sport als Ausgleich',
        'Sprich offen über Stress mit Vorgesetzten',
        'Nutze deinen Urlaub vollständig',
        'Entwickle Hobbys außerhalb der Arbeit',
        'Suche professionelle Hilfe, wenn nötig'
      ]
    },
    {
      id: 11,
      category: 'Remote Work',
      title: 'Erfolgreich im Homeoffice',
      description: 'Produktiv von zu Hause arbeiten',
      icon: '🏠',
      readTime: '5 Min.',
      tips: [
        'Richte einen dedizierten Arbeitsplatz ein',
        'Halte feste Arbeitszeiten ein',
        'Kleide dich wie für das Büro',
        'Nutze Video-Calls für persönlichen Kontakt',
        'Kommuniziere proaktiv mit dem Team',
        'Mache regelmäßige Pausen und Bewegung',
        'Investiere in gute Technik (Headset, Monitor, Stuhl)',
        'Trenne räumlich und zeitlich Arbeit und Freizeit'
      ]
    },
    {
      id: 12,
      category: 'Führung',
      title: 'Erste Schritte als Führungskraft',
      description: 'So meisterst du die neue Rolle',
      icon: '👔',
      readTime: '8 Min.',
      tips: [
        'Höre zunächst mehr zu, als dass du sprichst',
        'Baue Vertrauen durch Authentizität auf',
        'Führe regelmäßige 1:1 Gespräche mit Mitarbeitern',
        'Gib klare Ziele und Erwartungen vor',
        'Delegiere Verantwortung und vertraue deinem Team',
        'Sei ein Vorbild in Arbeitsethik und Werten',
        'Investiere in die Entwicklung deiner Mitarbeiter',
        'Lerne aus Fehlern und sei offen für Feedback'
      ]
    }
  ];

  const categories = ['all', ...Array.from(new Set(careerTips.map(tip => tip.category)))];
  
  const filteredTips = selectedCategory === 'all' 
    ? careerTips 
    : careerTips.filter(tip => tip.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Bewerbung': 'bg-blue-50 text-blue-700 border border-blue-200',
      'Vorstellungsgespräch': 'bg-purple-50 text-purple-700 border border-purple-200',
      'Gehaltsverhandlung': 'bg-green-50 text-green-700 border border-green-200',
      'Karriereentwicklung': 'bg-orange-50 text-orange-700 border border-orange-200',
      'Soft Skills': 'bg-pink-50 text-pink-700 border border-pink-200',
      'Work-Life-Balance': 'bg-teal-50 text-teal-700 border border-teal-200',
      'Remote Work': 'bg-indigo-50 text-indigo-700 border border-indigo-200',
      'Führung': 'bg-red-50 text-red-700 border border-red-200'
    };
    return colors[category] || 'bg-gray-50 text-gray-700 border border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Karriere-Tipps
          </h1>
          <p className="text-lg text-gray-600">
            Wertvolle Ratschläge für deine berufliche Entwicklung
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all border-2 ${
                  selectedCategory === category
                    ? 'bg-teal-600 text-zinc-500 border-teal-600 shadow-lg hover:bg-teal-700 hover:border-teal-700'
                    : 'bg-white text-gray-500 border-gray-400 hover:bg-teal-50 hover:border-teal-600 hover:text-teal-700'
                }`}
              >
                {category === 'all' ? '🌟 Alle' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-teal-600">{filteredTips.length}</span> Tipps gefunden
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map(tip => (
            <Card 
              key={tip.id}
              className="p-6 hover:shadow-lg transition-shadow rounded-xl border border-gray-200 bg-white"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-teal-500 rounded-xl flex items-center justify-center text-3xl shadow-sm">
                  {tip.icon}
                </div>
                <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getCategoryColor(tip.category)}`}>
                  {tip.category}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {tip.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {tip.description}
              </p>
              <p className="text-xs text-gray-500 mb-4">
                ⏱️ Lesezeit: {tip.readTime}
              </p>

              {/* Tips List */}
              {expandedTip === tip.id && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <ul className="space-y-2">
                    {tip.tips.map((t, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-teal-600 font-bold mt-0.5 shrink-0">✓</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Toggle Button */}
              <button
                onClick={() => setExpandedTip(expandedTip === tip.id ? null : tip.id)}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all border-2 ${
                  expandedTip === tip.id
                    ? 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'
                    : 'bg-teal-600 text-gray-500 border-teal-600 hover:bg-teal-700 hover:border-teal-700 shadow-md'
                }`}
              >
                {expandedTip === tip.id ? '▲ Weniger anzeigen' : '▼ Mehr erfahren'}
              </button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerTips;
