import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGameStore } from "@/stores/useGameStore";
import { Button } from "@/components/ui/button"; 
type Billionaire = { id: string; name: string; netWorthUSD: number; avatar?: string };

const fetchBillionaires = async (): Promise<Billionaire[]> => {
  const res = await axios.get("/api/billionaires");
  return res.data;
};

export const BillionaireSelector: React.FC = () => {
  const { data = [], isLoading } = useQuery(["billionaires"], fetchBillionaires);
  const setBillionaire = useGameStore((s) => s.setBillionaire);

  if (isLoading) return <div className="p-6">Loading billionaires...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {data.map((b) => (
        <div key={b.id} className="p-4 border rounded-lg bg-white/5">
          <div className="flex items-center gap-3">
            <img src={b.avatar} alt={b.name} className="w-12 h-12 rounded-full object-cover" />
            <div>
              <div className="font-semibold">{b.name}</div>
              <div className="text-sm text-muted-foreground">${b.netWorthUSD.toLocaleString()}</div>
            </div>
          </div>
          <div className="mt-3">
            <Button onClick={() => setBillionaire(b.id, b.netWorthUSD)}>Start spending</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

