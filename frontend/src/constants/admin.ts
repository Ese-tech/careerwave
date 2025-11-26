// frontend/src/constants/admin.ts

export const ADMIN_ROUTES = {
  root: '/admin',
  users: '/admin/users',
  employers: '/admin/employers',
  jobs: '/admin/jobs',
  applications: '/admin/applications',
  analytics: '/admin/analytics',
  settings: '/admin/settings'
};

export const ADMIN_ROLE = 'admin';
export const EMPLOYER_ROLE = 'employer';
export const CANDIDATE_ROLE = 'candidate';

export const ITEMS_PER_PAGE = 20;

export const JOB_STATUSES = ['draft', 'published', 'archived'] as const;
export const APPLICATION_STATUSES = ['applied', 'reviewing', 'rejected', 'accepted'] as const;

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const DEFAULT_AVATAR_URL = '/images/default-avatar.png';
export const DEFAULT_COMPANY_LOGO_URL = '/images/default-company-logo.png';