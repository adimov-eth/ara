import { create } from 'zustand';
import { api } from '@/lib/api';
import { User } from '@/types';

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  fetchUserProfile: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  fetchUserProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const user = await api.who_am_i(); // Fetch user data from API
      set({ user, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch user profile', isLoading: false });
    }
  },
})); 