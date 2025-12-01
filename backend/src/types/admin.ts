// backend/src/types/admin.ts
import { UserRole } from '../models/user.model';

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  emailVerified: boolean;
  disabled: boolean;
  createdAt?: string;
  lastLoginAt?: string;
}

export interface AdminStats {
  totalUsers: number;
  totalEmployers: number;
  totalJobs: number;
  totalApplications: number;
  monthlyApplications: { month: string; count: number }[];
}

export interface AdminDashboard {
  stats: AdminStats;
  recentUsers: AdminUser[];
  recentJobs: any[];
}