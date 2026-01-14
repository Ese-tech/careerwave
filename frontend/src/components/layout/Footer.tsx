import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  const footerSections = [
    {
      title: t('footer.jobSeekers.title'),
      links: [
        { name: t('footer.jobSeekers.searchJobs'), href: '/jobs' },
        { name: t('footer.jobSeekers.companies'), href: '/companies' },
        { name: t('footer.jobSeekers.careerTips'), href: '/career-tips' },
        { name: t('footer.jobSeekers.createProfile'), href: '/register' },
      ],
    },
    {
      title: t('footer.employers.title'),
      links: [
        { name: t('footer.employers.postJob'), href: '/post-job' },
        { name: t('footer.employers.findCandidates'), href: '/find-candidates' },
        { name: t('footer.employers.pricing'), href: '/pricing' },
        { name: t('footer.employers.companyProfile'), href: '/company-profile' },
      ],
    },
    {
      title: t('footer.support.title'),
      links: [
        { name: t('footer.support.helpCenter'), href: '/help' },
        { name: t('footer.support.contact'), href: '/contact' },
        { name: t('footer.support.faq'), href: '/faq' },
        { name: t('footer.support.community'), href: '/community' },
      ],
    },
    {
      title: t('footer.company.title'),
      links: [
        { name: t('footer.company.about'), href: '/about' },
        { name: t('footer.company.blog'), href: '/blog' },
        { name: t('footer.company.careers'), href: '/careers' },
        { name: t('footer.company.press'), href: '/press' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'LinkedIn', href: '#', icon: '💼' },
    { name: 'Twitter', href: '#', icon: '🐦' },
    { name: 'Facebook', href: '#', icon: '📘' },
    { name: 'Instagram', href: '#', icon: '📷' },
  ];
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
              {t('footer.description')}
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
              <h3 className="text-lg font-medium text-white">{t('footer.newsletter.title')}</h3>
              <p className="mt-1 text-gray-400 text-sm">
                {t('footer.newsletter.description')}
              </p>
            </div>
            <div className="mt-4 md:mt-0 md:ml-8">
              <form className="flex max-w-md">
                <input
                  type="email"
                  placeholder={t('footer.newsletter.placeholder')}
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-r-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                >
                  {t('footer.newsletter.subscribe')}
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
                {t('footer.legal.privacy')}
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                {t('footer.legal.terms')}
              </Link>
              <Link to="/imprint" className="text-gray-400 hover:text-white text-sm transition-colors">
                {t('footer.legal.imprint')}
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                {t('footer.legal.cookies')}
              </Link>
            </div>
            <p className="mt-4 md:mt-0 text-gray-400 text-sm">
              © {new Date().getFullYear()} CareerWave. {t('footer.copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}