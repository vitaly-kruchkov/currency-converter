export interface CurrencyRates {
  base: string;
  date: string;
  rates: Record<string, number>;
}

export interface CacheData {
  data: CurrencyRates;
  timestamp: number;
}
