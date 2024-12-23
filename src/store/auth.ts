import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, Aravt } from '@/types'
import { api } from '@/lib/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean; 
  fetchUser: () => Promise<void>;
  setToken: (token: string) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  aravt: Aravt | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      aravt: null,
      fetchUser: async () => {
        const st_user = get().user;
        if (st_user) {
          const new_user = await api.users_user(st_user.id);
          set({ user: new_user })
        }
      },
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