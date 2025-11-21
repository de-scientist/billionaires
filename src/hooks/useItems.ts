import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Item } from "@/types";

export const fetchItems = async (): Promise<Item[]> => {
  const r = await axios.get("/api/items");
  return r.data;
};

export const useItems = () => {
  return useQuery(["items"], fetchItems, { staleTime: 1000 * 60 * 5 });
};
