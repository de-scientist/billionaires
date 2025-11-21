export type Billionaire = {
  id: string;
  name: string;
  netWorthUSD: number; // decimal
  avatar?: string; // url
  bio?: string;
  country?: string;
};

export type Item = {
  id: string;
  name: string;
  priceUSD: number;
  image?: string;
  category?: string;
  description?: string;
  stock?: number | null; // null => infinite
};

export type Purchase = {
  id: string;
  itemId: string;
  itemName: string;
  priceUSD: number;
  timestamp: number;
};
