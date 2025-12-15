// frontend/src/types/user.ts
import type { UserRole } from './admin';

export type User = {
  [x: string]: string | undefined;
  uid: string;
  email: string;
  role: UserRole;
  displayName?: string;
  // Add more user-specific fields here
};