export type Billionaire = {
  id: string;
  name: string;
  netWorthUSD: number; // in dollars
  avatar?: string;
  description?: string;
};

export type Item = {
  id: string;
  name: string;
  priceUSD: number;
  image?: string;
  category?: string;
};
