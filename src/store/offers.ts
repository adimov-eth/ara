import { create } from 'zustand'
import { Offer, CreateOffer } from '@/types'
import { api } from '@/lib/api'

interface OffersState {
  offers: Offer[];
  isLoading: boolean;
  error: string | null;
  fetchOffers: () => Promise<void>;
  createOffer: (offer: Omit<CreateOffer, 'id'>) => Promise<void>;
}

export const useOffersStore = create<OffersState>((set, get) => {
  return {
    offers: [],
    isLoading: false,
    error: null,
    fetchOffers: async () => {
      set({ isLoading: true, error: null });
      try {
        const offers: Offer[] = await api.offers();
        set({ offers: offers, isLoading: false });
      } catch (err) {
        set({ error: err instanceof Error ? err.message : 'Failed to fetch offers', isLoading: false });
      }
    },
    createOffer: async (offer: Omit<CreateOffer, 'id'>) => {
      set({ isLoading: true, error: null });
      try {
        await api.aravt_set_offer(offer);
        await get().fetchOffers();
        set({ isLoading: false });
      } catch (err) {
        set({ error: err instanceof Error ? err.message : 'Failed to create offer', isLoading: false });
      }
    }
  }
}); 