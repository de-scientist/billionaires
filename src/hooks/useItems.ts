import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Item } from "@/types";

export const fetchItems = async (): Promise<Item[]> => {
  const response = await axios.get("/data/items.json");
  return response.data;
};

export const useItems = () => {
  return useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
    staleTime: 1000 * 60 * 5,
  });
};
