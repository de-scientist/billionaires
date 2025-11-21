import React from "react";
import { useItems } from "@/hooks/useItems";
import { ItemCard } from "./ItemCard";

export const Catalog: React.FC = () => {
  const { data: items = [], isLoading, error } = useItems();

  if (isLoading) return <div className="p-6">Loading items…</div>;
  if (error) return <div className="p-6 text-red-500">Failed to load items.</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Shop the catalog</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it) => (
          <ItemCard key={it.id} item={it} />
        ))}
      </div>
    </div>
  );
};
