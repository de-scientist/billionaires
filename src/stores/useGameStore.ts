import {create} from "zustand";
import { persist } from "zustand/middleware";
import type { Billionaire, Purchase } from "@/types";

type GameState = {
  selectedBillionaire: Billionaire | null;
  remaining: number;
  purchases: Purchase[];
  setBillionaire: (b: Billionaire) => void;
  buyItem: (itemId: string, itemName: string, priceUSD: number) => boolean;
  reset: () => void;
  undoLast: () => void;
};

export const useGameStore = create<GameState>()(
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
        const purchase = {
          id: `${Date.now()}`,
          itemId,
          itemName,
          priceUSD,
          timestamp: Date.now(),
        };
        set({ remaining: newRemaining, purchases: [...purchases, purchase] });
        return true;
      },
      reset: () => set({ selectedBillionaire: null, remaining: 0, purchases: [] }),
      undoLast: () => {
        const { purchases, remaining } = get();
        if (purchases.length === 0) return;
        const last = purchases[purchases.length - 1];
        set({
          purchases: purchases.slice(0, -1),
          remaining: +(remaining + last.priceUSD),
        });
      },
    }),
    { name: "spend-game-v1" }
  )
);
