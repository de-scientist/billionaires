import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Catalog } from "@/components/catalog/catalog";
import { SummarySidebar } from "@/components/ux/SummarySidebar";
import { useBillionaires } from "@/hooks/useBillionaires";
import { useGameStore } from "@/stores/useGameStore";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const queryClient = new QueryClient();

export default function PlayPage() {
  const { data: billionaires = [] } = useBillionaires();
  const setBillionaire = useGameStore((s) => s.setBillionaire);
  const selected = useGameStore((s) => s.selectedBillionaire);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <main className="lg:col-span-3">
          {!selected && (
            <section className="mb-6 p-4 border rounded bg-white/5">
              <h2 className="text-xl font-bold mb-2">Choose a billionaire to begin</h2>
              <div className="flex gap-3 overflow-x-auto py-2">
                {billionaires.map((b) => (
                  <div key={b.id} className="min-w-[220px] p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={b.avatar} alt={b.name} />
                        <AvatarFallback>{b.name ? b.name.split(' ').map(n => n[0]).slice(0,2).join('') : 'B'}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{b.name}</div>
                        <div className="text-sm text-muted-foreground">${b.netWorthUSD.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Button onClick={() => setBillionaire(b)}>Start spending</Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <Catalog />
        </main>

        <div className="lg:col-span-1">
          <SummarySidebar />
        </div>
      </div>
    </QueryClientProvider>
  );
}
