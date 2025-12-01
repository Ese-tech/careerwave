// frontend/src/api/employer.ts
import { api, type ApiResponse } from '../services/api';
import type { Employer } from '../types/employer';

export interface CreateEmployerRequest {
  companyName: string;
  email: string;
  website?: string;
  logoUrl?: string;
}

export interface UpdateEmployerRequest extends Partial<CreateEmployerRequest> {
  verified?: boolean;
}

export const employerApi = {
  async getEmployers(token?: string): Promise<ApiResponse<Employer[]>> {
    return api.get<Employer[]>('/employers', token);
  },

  async getEmployerById(id: string, token?: string): Promise<ApiResponse<Employer>> {
    return api.get<Employer>(`/employers/${id}`, token);
  },

  async createEmployer(data: CreateEmployerRequest, token: string): Promise<ApiResponse<Employer>> {
    return api.post<Employer>('/employers', data, token);
  },

  async updateEmployer(id: string, data: UpdateEmployerRequest, token: string): Promise<ApiResponse<Employer>> {
    return api.put<Employer>(`/employers/${id}`, data, token);
  },

  async deleteEmployer(id: string, token: string): Promise<ApiResponse<void>> {
    return api.delete<void>(`/employers/${id}`, token);
  },

  async verifyEmployer(id: string, verified: boolean, token: string): Promise<ApiResponse<Employer>> {
    return api.patch<Employer>(`/employers/${id}/verify`, { verified }, token);
  },

  async getEmployerJobs(id: string, token?: string): Promise<ApiResponse<any[]>> {
    return api.get<any[]>(`/employers/${id}/jobs`, token);
  },

  async getMyProfile(token: string): Promise<ApiResponse<Employer>> {
    return api.get<Employer>('/employers/profile', token);
  },

  async updateMyProfile(data: UpdateEmployerRequest, token: string): Promise<ApiResponse<Employer>> {
    return api.put<Employer>('/employers/profile', data, token);
  }
};