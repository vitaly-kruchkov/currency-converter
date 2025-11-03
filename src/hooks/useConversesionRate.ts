import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNetworkStatus } from "./useNetworkStatus";
import { CACHE_TTL } from "@/constants/cache";
import { readFromCache, writeToCache } from "@/utils/cache";
import type { CurrencyOption } from "@/components/CustomSelect";
import { SYMBOLS } from "@/constants/symbols";
import { NAMES } from "@/constants/names";
import { calculateRate } from "@/utils/rate";

export const useConversionRate = (from: string, to: string, amount: number) => {
  const [currencies, setCurrencies] = useState<CurrencyOption[]>([]);
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

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const res = await axios.get("https://api.fxratesapi.com/latest", {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
          },
        });

        const rates = res.data.rates;
        const codes = Object.keys(rates);

        const options: CurrencyOption[] = codes.map((code) => ({
          code,
          symbol: SYMBOLS[code] ?? code,
          name: NAMES[code] ?? code,
        }));

        setCurrencies(options.sort((a, b) => a.code.localeCompare(b.code)));
      } catch (e) {
        console.error("Failed to fetch currencies", e);
      }
    };

    fetchCurrencies();
  }, []);

  const fetchRate = useCallback(async () => {
    if (!amount || isNaN(amount)) return;

    setLoading(true);
    setError(null);

    const cache = readFromCache();
    const now = Date.now();
    const isCacheValid = cache && now - cache.timestamp < CACHE_TTL;

    try {
      if (!isOnline && isCacheValid && cache.data) {
        setResult(
          calculateRate(cache.data.base, cache.data.rates, from, to, amount)
        );
        return;
      }

      const { data } = await axios.get("https://api.fxratesapi.com/latest", {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          base: from,
        },
      });

      writeToCache({ data: data, timestamp: now });

      setResult(calculateRate(data.base, data.rates, from, to, amount));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data?.message || e.message);
      } else if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Unknown error occurred");
      }

      if (isCacheValid && cache?.data) {
        setResult(
          calculateRate(cache.data.base, cache.data.rates, from, to, amount)
        );
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

  return { result, loading, error, refetch: fetchRate, currencies };
};
