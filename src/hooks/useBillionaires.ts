import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Billionaire } from "@/types";

export const fetchBillionaires = async (): Promise<Billionaire[]> => {
  const response = await axios("/data/billionaires.json");
//   if (!response.ok) throw new Error("Failed to fetch billionaires");
  return response.data;
};

export const useBillionaires = () =>
 useQuery({
    queryKey: ["billionaires"],
    queryFn: fetchBillionaires,
    staleTime: 1000 * 60 * 5,
  });
  