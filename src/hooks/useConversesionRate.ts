import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNetworkStatus } from "./useNetworkStatus";
import { CACHE_TTL } from "@/constants/cache";
import { readFromCache, writeToCache } from "@/utils/cache";

export const useConversionRate = (from: string, to: string, amount: number) => {
  const [result, setResult] = useState<{
    rate: number;
    inverseRate: number;
    converted: number;
  } | null>({
    rate: 0,
    inverseRate: 0,
    converted: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isOnline = useNetworkStatus();

  const fetchRate = useCallback(async () => {
    if (!amount || isNaN(amount)) return;

    setLoading(true);
    setError(null);

    const cache = readFromCache();
    const now = Date.now();
    const isCacheValid = cache && now - cache.timestamp < CACHE_TTL;

    try {
      if (!isOnline && isCacheValid && cache.data) {
        const { base, rates } = cache.data;
        const rateFrom = from === base ? 1 : rates[from];
        const rateTo = to === base ? 1 : rates[to];
        const rate = rateTo / rateFrom;

        setResult({
          rate,
          inverseRate: amount * (1 / rate),
          converted: amount * rate,
        });
        return;
      }

      const res = await axios.get("https://api.fxratesapi.com/latest", {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          base: from,
        },
      });

      writeToCache({ data: res.data, timestamp: now });

      const { rates, base } = res.data;
      const rateFrom = from === base ? 1 : rates[from];
      const rateTo = to === base ? 1 : rates[to];

      if (rateFrom === undefined || rateTo === undefined) {
        throw new Error("Invalid currency code");
      }

      const rate = rateTo / rateFrom;

      setResult({
        rate,
        inverseRate: amount * (1 / rate),
        converted: amount * rate,
      });
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data?.message || e.message);
      } else if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Unknown error occurred");
      }

      if (isCacheValid && cache?.data) {
        const { base, rates } = cache.data;
        const rateFrom = from === base ? 1 : rates[from];
        const rateTo = to === base ? 1 : rates[to];
        const rate = rateTo / rateFrom;

        setResult({
          rate,
          inverseRate: amount * (1 / rate),
          converted: amount * rate,
        });
      }
    } finally {
      setLoading(false);
    }
  }, [from, to, amount, isOnline]);

  useEffect(() => {
    fetchRate();
  }, [fetchRate]);

  useEffect(() => {
    if (isOnline) fetchRate();
  }, [fetchRate, isOnline]);

  return { result, loading, error, refetch: fetchRate };
};
