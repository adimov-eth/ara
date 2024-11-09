import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: number;
  username: string;
  email?: string;
  role: 'User' | 'AravtLeader' | 'SuperAdmin';
  aravt_id?: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user: User, token: string) => 
        set({ user, token, isAuthenticated: true }),
      logout: () => 
        set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
) 