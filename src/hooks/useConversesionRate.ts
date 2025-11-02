import { useEffect, useState } from "react";
import axios from "axios";

export const useConversionRate = (from: string, to: string, amount: number) => {
  const [result, setResult] = useState<{
    rate: number;
    inverseRate: number;
    converted: number;
  } | null>({ rate: 0, inverseRate: 0, converted: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!amount || isNaN(amount)) {
      return;
    }

    const fetchRate = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("https://api.fxratesapi.com/latest", {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            base: from,
          },
        });

        const { rates, base } = res.data;

        const rateFrom = from === base ? 1 : rates[from];
        const rateTo = to === base ? 1 : rates[to];

        if (rateFrom === undefined || rateTo === undefined) {
          throw new Error("Invalid currency");
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
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRate();
  }, [from, to, amount]);

  return { result, loading, error };
};
