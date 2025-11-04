import { create } from "zustand";

interface Subscription {
  id: string;
  planName: string | null;
  startDate: Date;
  endDate: Date;
  status: string;
}

interface SubscriptionState {
  isPaidUser: boolean;
  subscription: Subscription | null;
  isLoading: boolean;
  setSubscriptionStatus: (
    isPaidUser: boolean,
    subscription: Subscription | null
  ) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  isPaidUser: false,
  subscription: null,
  isLoading: true,
  setSubscriptionStatus: (isPaidUser, subscription) =>
    set({ isPaidUser, subscription, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () => set({ isPaidUser: false, subscription: null, isLoading: true }),
}));
