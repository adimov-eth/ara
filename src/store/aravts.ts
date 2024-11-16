import { create } from 'zustand'
import { type Aravt } from '@/types'

interface AravtsState {
  aravts: Aravt[];
  isLoading: boolean;
  error: string | null;
  fetchAravts: () => Promise<void>;
  applyToAravt: (aravtId: number) => Promise<void>;
}

export const useAravtsStore = create<AravtsState>((set) => ({
  aravts: [],
  isLoading: false,
  error: null,
  fetchAravts: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockAravts: Aravt[] = [
        {
          id: 1,
          name: 'ARAVT SYSTEMS',
          description: 'Founders Aravt',
          capacity: { current: 4, max: 10 },
          leader: 'Anar Artur',
          skills: ['Governance building', 'team management', 'organization'],
        },
        {
          id: 2,
          name: 'RubeTON',
          description: 'e/acc token for digital life',
          capacity: { current: 1, max: 10 },
          leader: 'Ruben Babaev',
          skills: ['Development', 'Fundraising', 'Design'],
        },
      ];
      set({ aravts: mockAravts, isLoading: false });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to fetch aravts', isLoading: false });
    }
  },
  applyToAravt: async (aravtId: number) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Applying to aravt ${aravtId}`); // Temporary logging
      // Optimistic update could be implemented here
      set({ isLoading: false });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to apply to aravt', isLoading: false });
    }
  },
})); 