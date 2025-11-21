import React from "react";
import { useGameStore } from "@/stores/useGameStore";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const formatCurrency = (v: number) => `$${Number(v).toLocaleString()}`;

export const SummarySidebar: React.FC = () => {
  const { selectedBillionaire, remaining, purchases, reset, undoLast } = useGameStore();

  if (!selectedBillionaire) {
    return (
      <aside className="p-4 border rounded bg-white/5">
        <div className="text-sm">Pick a billionaire to start spending</div>
      </aside>
    );
  }

  const total = selectedBillionaire.netWorthUSD;
  const spent = +(total - remaining);
  const percent = total > 0 ? Math.min(100, (spent / total) * 100) : 0;

  return (
    <aside className="p-4 border rounded bg-white/5 w-full">
      <div className="flex items-center gap-3">
        <Avatar>
          {selectedBillionaire.avatar ? (
            <AvatarImage src={selectedBillionaire.avatar} alt={selectedBillionaire.name} />
          ) : (
            <AvatarFallback>{selectedBillionaire.name?.[0] ?? "?"}</AvatarFallback>
          )}
        </Avatar>
        <div>
          <div className="font-semibold">{selectedBillionaire.name}</div>
          <div className="text-xs text-muted-foreground">{selectedBillionaire.bio}</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs text-muted-foreground">Remaining</div>
        <div className="text-2xl font-bold">{formatCurrency(remaining)}</div>
      </div>

      <div className="mt-4">
        <div className="text-xs text-muted-foreground">Spent</div>
        <div className="text-sm">{formatCurrency(spent)} — {percent.toFixed(6)}% spent</div>
        <div className="mt-2"><Progress value={percent} /></div>
      </div>

      <div className="mt-4 space-y-2">
        <Button variant="ghost" onClick={undoLast} disabled={purchases.length === 0}>Undo last</Button>
        <Button variant="destructive" onClick={() => { if(confirm('Reset progress?')) reset(); }}>
          Reset
        </Button>
      </div>

      <div className="mt-4">
        <h4 className="font-medium">Purchases</h4>
        {purchases.length === 0 ? (
          <div className="text-sm text-muted-foreground">No purchases yet.</div>
        ) : (
          <ul className="mt-2 space-y-2 text-sm">
            {purchases.slice().reverse().map((p) => (
              <li key={p.id} className="flex justify-between">
                <span>{p.itemName}</span>
                <span className="font-medium">${p.priceUSD.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};
