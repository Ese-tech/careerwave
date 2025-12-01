// frontend/src/constants/routes.ts
export const ROUTES = {
  // Public routes
  HOME: '/',
  JOBS: '/jobs',
  JOB_DETAIL: '/jobs/:id',
  COMPANIES: '/companies',
  COMPANY_DETAIL: '/companies/:id',
  ABOUT: '/about',
  CONTACT: '/contact',
  
  // Auth routes
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  
  // User dashboard
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  APPLICATIONS: '/applications',
  SAVED_JOBS: '/saved-jobs',
  SETTINGS: '/settings',
  
  // Employer routes
  EMPLOYER_DASHBOARD: '/employer',
  EMPLOYER_JOBS: '/employer/jobs',
  EMPLOYER_APPLICATIONS: '/employer/applications',
  EMPLOYER_PROFILE: '/employer/profile',
  CREATE_JOB: '/employer/jobs/create',
  EDIT_JOB: '/employer/jobs/:id/edit',
  
  // Admin routes
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_EMPLOYERS: '/admin/employers',
  ADMIN_JOBS: '/admin/jobs',
  ADMIN_APPLICATIONS: '/admin/applications',
  ADMIN_ANALYTICS: '/admin/analytics',
  ADMIN_SETTINGS: '/admin/settings',
  
  // Error pages
  NOT_FOUND: '/404',
  FORBIDDEN: '/forbidden',
  SERVER_ERROR: '/500'
} as const;

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.PROFILE,
  ROUTES.APPLICATIONS,
  ROUTES.SAVED_JOBS,
  ROUTES.SETTINGS,
  ROUTES.EMPLOYER_DASHBOARD,
  ROUTES.EMPLOYER_JOBS,
  ROUTES.EMPLOYER_APPLICATIONS,
  ROUTES.EMPLOYER_PROFILE,
  ROUTES.CREATE_JOB,
  ROUTES.EDIT_JOB
];

export const ADMIN_ROUTES = [
  ROUTES.ADMIN,
  ROUTES.ADMIN_DASHBOARD,
  ROUTES.ADMIN_USERS,
  ROUTES.ADMIN_EMPLOYERS,
  ROUTES.ADMIN_JOBS,
  ROUTES.ADMIN_APPLICATIONS,
  ROUTES.ADMIN_ANALYTICS,
  ROUTES.ADMIN_SETTINGS
];

export const EMPLOYER_ROUTES = [
  ROUTES.EMPLOYER_DASHBOARD,
  ROUTES.EMPLOYER_JOBS,
  ROUTES.EMPLOYER_APPLICATIONS,
  ROUTES.EMPLOYER_PROFILE,
  ROUTES.CREATE_JOB,
  ROUTES.EDIT_JOB
];

export function createJobDetailRoute(id: string): string {
  return ROUTES.JOB_DETAIL.replace(':id', id);
}

export function createCompanyDetailRoute(id: string): string {
  return ROUTES.COMPANY_DETAIL.replace(':id', id);
}

export function createEditJobRoute(id: string): string {
  return ROUTES.EDIT_JOB.replace(':id', id);
}