export type Employer = {
  id: string;
  companyName: string;
  email: string;
  website?: string;
  logoUrl?: string;
  verified: boolean;
  createdAt?: string; // ISO date string
  // Add more employer-specific fields here
};