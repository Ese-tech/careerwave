// frontend/src/constants/roles.ts
export const ROLES = {
  ADMIN: 'admin',
  EMPLOYER: 'employer',
  CANDIDATE: 'candidate',
  VIEWER: 'viewer'
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Administrator',
  employer: 'Employer',
  candidate: 'Candidate',
  viewer: 'Viewer'
};

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  admin: 'Full access to all platform features and administration',
  employer: 'Can create job postings and manage applications',
  candidate: 'Can apply for jobs and manage profile',
  viewer: 'Can browse jobs and view public content'
};

export type Permission = 
  | 'create_job' | 'edit_job' | 'delete_job' | 'view_all_jobs' 
  | 'manage_users' | 'manage_employers' | 'view_analytics' | 'manage_settings'
  | 'edit_own_job' | 'delete_own_job' | 'view_own_jobs' 
  | 'view_applications' | 'manage_profile'
  | 'apply_job' | 'view_jobs' | 'view_companies';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    'create_job',
    'edit_job',
    'delete_job',
    'view_all_jobs',
    'manage_users',
    'manage_employers',
    'view_analytics',
    'manage_settings'
  ],
  employer: [
    'create_job',
    'edit_own_job',
    'delete_own_job',
    'view_own_jobs',
    'view_applications',
    'manage_profile'
  ],
  candidate: [
    'apply_job',
    'view_jobs',
    'manage_profile',
    'view_applications'
  ],
  viewer: [
    'view_jobs',
    'view_companies'
  ]
} as const;

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) || false;
}

export function isAdmin(role?: UserRole): boolean {
  return role === ROLES.ADMIN;
}

export function isEmployer(role?: UserRole): boolean {
  return role === ROLES.EMPLOYER;
}

export function isCandidate(role?: UserRole): boolean {
  return role === ROLES.CANDIDATE;
}