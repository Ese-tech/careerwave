// frontend/src/store/adminStore.ts

import { create } from 'zustand';
import type { AdminUser, AdminEmployer } from '../types/admin';

type AdminState = {
  users: AdminUser[] | null;
  employers: AdminEmployer[] | null;
  loading: boolean;
  setUsers: (u: AdminUser[]) => void;
  setEmployers: (e: AdminEmployer[]) => void;
  setLoading: (l: boolean) => void;
  clear: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  users: null,
  employers: null,
  loading: false,
  setUsers: (u) => set({ users: u }),
  setEmployers: (e) => set({ employers: e }),
  setLoading: (l) => set({ loading: l }),
  clear: () => set({ users: null, employers: null, loading: false })
}));

export const selectAdminUsers = (state: AdminState) => state.users;
export const selectAdminEmployers = (state: AdminState) => state.employers;
export const selectAdminLoading = (state: AdminState) => state.loading; 
export const selectAdminSetUsers = (state: AdminState) => state.setUsers;
export const selectAdminSetEmployers = (state: AdminState) => state.setEmployers;
export const selectAdminSetLoading = (state: AdminState) => state.setLoading;
export const selectAdminClear = (state: AdminState) => state.clear;
