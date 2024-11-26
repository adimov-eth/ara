import { create } from 'zustand'
import { Aravt } from '@/types'
import { api } from '@/lib/api'

interface AravtsState {
  aravts: Aravt[];
  isLoading: boolean;
  error: string | null;
  fetchAravts: () => Promise<void>;
  applyToAravt: (aravtId: number, text: string) => Promise<void>;
}

export const useAravtsStore = create<AravtsState>((set) => ({
  aravts: [],
  isLoading: false,
  error: null,
  fetchAravts: async () => {
    set({ isLoading: true, error: null });
    try {
      const Aravts: Aravt[] = await api.aravt();
      set({ aravts: Aravts, isLoading: false });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to fetch aravts', isLoading: false });
    }
  },
  applyToAravt: async (aravtId: number, text: string) => {
    set({ isLoading: true, error: null });
    try {
      await api.aravt_join(aravtId, { aravt_id: aravtId, text: text });
      set({ isLoading: false });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to apply to aravt', isLoading: false });
    }
  },
})); 