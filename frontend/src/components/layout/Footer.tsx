import { Link } from 'react-router-dom';

const footerSections = [
  {
    title: 'Für Jobsuchende',
    links: [
      { name: 'Job suchen', href: '/jobs' },
      { name: 'Unternehmen entdecken', href: '/companies' },
      { name: 'Karriere-Tipps', href: '/career-tips' },
      { name: 'Profil erstellen', href: '/register' },
    ],
  },
  {
    title: 'Für Unternehmen',
    links: [
      { name: 'Job posten', href: '/post-job' },
      { name: 'Kandidaten finden', href: '/find-candidates' },
      { name: 'Preise', href: '/pricing' },
      { name: 'Unternehmensprofil', href: '/company-profile' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'Hilfe-Center', href: '/help' },
      { name: 'Kontakt', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Community', href: '/community' },
    ],
  },
  {
    title: 'Über CareerWave',
    links: [
      { name: 'Über uns', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Karriere', href: '/careers' },
      { name: 'Presse', href: '/press' },
    ],
  },
];

const socialLinks = [
  { name: 'LinkedIn', href: '#', icon: '💼' },
  { name: 'Twitter', href: '#', icon: '🐦' },
  { name: 'Facebook', href: '#', icon: '📘' },
  { name: 'Instagram', href: '#', icon: '📷' },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company info */}
          <div className="lg:col-span-1">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">CW</span>
              </div>
              <span className="ml-2 text-xl font-bold text-white">
                CareerWave
              </span>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              Die führende Plattform für Jobs und Karrierechancen. 
              Verbinden Sie Talente mit den besten Unternehmen.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={item.name}
                >
                  <span className="text-xl">{item.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter signup */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:flex-1">
              <h3 className="text-lg font-medium text-white">Newsletter abonnieren</h3>
              <p className="mt-1 text-gray-400 text-sm">
                Erhalten Sie die neuesten Jobs und Karriere-Updates direkt in Ihr Postfach.
              </p>
            </div>
            <div className="mt-4 md:mt-0 md:ml-8">
              <form className="flex max-w-md">
                <input
                  type="email"
                  placeholder="Ihre E-Mail-Adresse"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-r-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                >
                  Abonnieren
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Datenschutz
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                AGB
              </Link>
              <Link to="/imprint" className="text-gray-400 hover:text-white text-sm transition-colors">
                Impressum
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie-Richtlinie
              </Link>
            </div>
            <p className="mt-4 md:mt-0 text-gray-400 text-sm">
              © {new Date().getFullYear()} CareerWave. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}