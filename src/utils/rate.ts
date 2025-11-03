import type { RateResult } from "@/types/conversesion";

export const calculateRate = (
  base: string,
  rates: Record<string, number>,
  from: string,
  to: string,
  amount: number
): RateResult => {
  const rateFrom = from === base ? 1 : rates[from];
  const rateTo = to === base ? 1 : rates[to];

  if (!rateFrom || !rateTo) throw new Error("Invalid currency code");

  const rate = rateTo / rateFrom;
  return {
    rate,
    inverseRate: amount * (1 / rate),
    converted: amount * rate,
  };
};
