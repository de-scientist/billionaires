import {create} from "zustand";
import { persist } from "zustand/middleware";

type Purchase = { itemId: string; priceUSD: number; timestamp: number };

type GameState = {
  selectedBillionaireId: string | null;
  remaining: number; // in cents or dollars
  purchases: Purchase[];
  setBillionaire: (id: string, netWorthUSD: number) => void;
  buyItem: (itemId: string, priceUSD: number) => boolean;
  reset: () => void;
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      selectedBillionaireId: null,
      remaining: 0,
      purchases: [],
      setBillionaire: (id, netWorthUSD) =>
        set(() => ({ selectedBillionaireId: id, remaining: netWorthUSD })),
      buyItem: (itemId, priceUSD) => {
        const { remaining, purchases } = get();
        if (priceUSD > remaining) return false;
        set({
          remaining: +(remaining - priceUSD).toFixed(2),
          purchases: [...purchases, { itemId, priceUSD, timestamp: Date.now() }],
        });
        return true;
      },
      reset: () => set({ selectedBillionaireId: null, remaining: 0, purchases: [] }),
    }),
    { name: "spend-game-v1" }
  )
);
