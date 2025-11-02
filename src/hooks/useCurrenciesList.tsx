import axios from "axios";
import { useEffect, useState } from "react";
import { SYMBOLS } from "../constants/symbols";
import { NAMES } from "../constants/names";
import type { CurrencyOption } from "../components/select/CustomSelect";

export function useCurrenciesList() {
  const [currencies, setCurrencies] = useState<CurrencyOption[]>([]);

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
        return [];
      }
    };
    fetchCurrencies();
  }, []);

  return currencies;
}
