export interface Currency {
  base: string;
  date: Date;
  privacy: string;
  success: boolean;
  terms: string;
  timestamp: string;
  rates: Record<string, number>;
}
