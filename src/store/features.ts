import { create } from 'zustand'
import { type Feature } from '@/types'

interface FeaturesState {
  features: {
    community: Feature[];
    tasks: Feature[];
  };
  isLoading: boolean;
  error: string | null;
  fetchFeatures: () => Promise<void>;
}

export const useFeaturesStore = create<FeaturesState>((set) => ({
  features: {
    community: [
      {
        id: 1,
        type: 'community',
        title: '10 member groups',
        description: 'Start with a core team',
        badge: 'Basic',
        badgeVariant: 'default',
      },
      {
        id: 2,
        type: 'community',
        title: '100 member organization',
        description: 'Scale your community',
        badge: 'Advanced',
        badgeVariant: 'secondary',
      },
      {
        id: 3,
        type: 'community',
        title: '1000 member network',
        description: 'Build an ecosystem',
        badge: 'Elite',
        badgeVariant: 'destructive',
      },
    ],
    tasks: [
      {
        id: 4,
        type: 'tasks',
        title: 'Local Tasks',
        description: 'Group specific tasks',
        badge: 'Basic',
        badgeVariant: 'default',
      },
      {
        id: 5,
        type: 'tasks',
        title: 'Global Tasks',
        description: 'Network-wide opportunities',
        badge: 'Advanced',
        badgeVariant: 'secondary',
      },
      {
        id: 6,
        type: 'tasks',
        title: 'Rewards',
        description: 'Tokens & USDT compensation',
        badge: 'Rewards',
        badgeVariant: 'destructive',
      },
    ],
  },
  isLoading: false,
  error: null,
  fetchFeatures: async () => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      // Features are hardcoded in the initial state
      set({ isLoading: false });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to fetch features', isLoading: false });
    }
  },
})); 