import { Conversion } from "@/components/Conversion";
import { ConversionResult } from "@/components/ConversionResult";
import { Header } from "@/components/Header";
import { Status } from "@/components/Status";
import styles from "./Main.module.scss";
import { useMemo, useState } from "react";
import { useCurrenciesList } from "@/hooks/useCurrenciesList";
import { useDebounce } from "@/hooks/useDebounce";
import { useConversionRate } from "@/hooks/useConversesionRate";
import type { NAMES } from "@/constants/names";

export const Main: React.FC = () => {
  const [currenciesFrom, setCurrenciesFrom] =
    useState<keyof typeof NAMES>("USD");
  const [currenciesTo, setCurrenciesTo] = useState<keyof typeof NAMES>("EUR");
  const [amount, setAmount] = useState<string>("0");

  const currencies = useCurrenciesList();
  const amountNumber = useMemo(() => parseFloat(amount) || 0, [amount]);
  const debouncedAmount = useDebounce(amountNumber, 500);

  const { result, loading, error } = useConversionRate(
    currenciesFrom,
    currenciesTo,
    debouncedAmount
  );

  console.log(result);

  return (
    <section className={styles.container}>
      <Header />
      <Status />
      <div className={styles.main}>
        <Conversion
          amount={amount}
          setAmount={setAmount}
          currenciesFrom={currenciesFrom}
          currenciesTo={currenciesTo}
          setCurrenciesFrom={setCurrenciesFrom}
          setCurrenciesTo={setCurrenciesTo}
          currencies={currencies}
        />
        <ConversionResult
          amount={amount}
          result={result}
          loading={loading}
          error={error}
          currenciesFrom={currenciesFrom}
          currenciesTo={currenciesTo}
        />
      </div>
    </section>
  );
};
