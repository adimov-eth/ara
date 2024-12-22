import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, Aravt } from '@/types'

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  aravt: Aravt | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      aravt: null,
      setToken: (token: string) => set({ token }),
      login: (user: User, token: string) => 
        set({ user, token, isAuthenticated: true, aravt: user.aravt }),
      logout: () => 
        set({ user: null, token: null, isAuthenticated: false, aravt: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
) 