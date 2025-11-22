import React from "react";
import type { Item } from "@/types";
import { useGameStore } from "@/stores/useGameStore";
import { Button } from "@/components/ui/button"; // shadcn Button
import { Card } from "@/components/ui/card";

export const ItemCard: React.FC<{ item: Item }> = ({ item }) => {
  const buyItem = useGameStore((s) => s.buyItem);
  const remaining = useGameStore((s) => s.remaining);

  const canAfford = remaining >= item.priceUSD;

  const onBuy = () => {
    const success = buyItem(item.id, item.name, item.priceUSD);
    if (!success) {
      // simple feedback; you may replace with Toast
      alert("Not enough funds to buy this item.");
    }
  };

  return (
    <Card className="flex flex-col">
      <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-md" />
      <div className="p-3 flex-1 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{item.name}</h3>
          <div className="text-sm font-medium">${item.priceUSD.toLocaleString()}</div>
        </div>
        <p className="text-sm text-muted-foreground mt-2 flex-1">{item.description}</p>
        <div className="mt-3">
          <Button onClick={onBuy} disabled={!canAfford} aria-disabled={!canAfford}>
            {canAfford ? "Buy" : "Can't afford"}
          </Button>
        </div>
      </div>
    </Card>
  );
};
