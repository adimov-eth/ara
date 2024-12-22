import { create } from 'zustand';
import { api } from '@/lib/api';
import { User, JoinRequest } from '@/types';

interface UserState {
  user: User | null;
  // applications: JoinRequest[];
  isLoading: boolean;
  error: string | null;
  fetchUserProfile: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  // applications: [],
  isLoading: false,
  error: null,
  fetchUserProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const user = await api.who_am_i(); // Fetch user data from API
      //const applications = [] // await api.aravt_applications();
      set({ user, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch user profile', isLoading: false });
    }
  },
})); 