import {create} from "zustand";
import { persist } from "zustand/middleware";
import type { Billionaire, Purchase } from "@/types";

type State = {
  selectedBillionaire: Billionaire | null;
  remaining: number;
  purchases: Purchase[];
  setBillionaire: (b: Billionaire) => void;
  buyItem: (itemId: string, itemName: string, priceUSD: number) => boolean;
  reset: () => void;
};

export const useGameStore = create<State>()(
  persist(
    (set, get) => ({
      selectedBillionaire: null,
      remaining: 0,
      purchases: [],
      setBillionaire: (b) =>
        set({
          selectedBillionaire: b,
          remaining: +b.netWorthUSD,
          purchases: [],
        }),
      buyItem: (itemId, itemName, priceUSD) => {
        const { remaining, purchases } = get();
        if (priceUSD > remaining) return false;
        const newRemaining = +(remaining - priceUSD);
        set({
          remaining: newRemaining,
          purchases: [
            ...purchases,
            { id: `${Date.now()}`, itemId, itemName, priceUSD, timestamp: Date.now() },
          ],
        });
        return true;
      },
      reset: () => set({ selectedBillionaire: null, remaining: 0, purchases: [] }),
    }),
    { name: "spend-game-v1" }
  )
);
