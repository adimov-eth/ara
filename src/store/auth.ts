import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/types'

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  hasAravt: boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      hasAravt: false,
      setToken: (token: string) => set({ token }),
      login: (user: User, token: string) => 
        set({ user, token, isAuthenticated: true, hasAravt: Boolean(user.aravt) }),
      logout: () => 
        set({ user: null, token: null, isAuthenticated: false, hasAravt: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
) 