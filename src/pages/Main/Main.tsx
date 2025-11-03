import { Header } from "@/components/Header";
import { Status } from "@/components/Status";
import styles from "./Main.module.scss";
import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useConversionRate } from "@/hooks/useConversesionRate";
import type { NAMES } from "@/constants/names";
import { lazy, Suspense } from "react";

const Conversion = lazy(() =>
  import("@/components/Conversion/index").then((module) => ({
    default: module.Conversion,
  }))
);
const ConversionResult = lazy(() =>
  import("@/components/ConversionResult/index").then((module) => ({
    default: module.ConversionResult,
  }))
);

export const Main: React.FC = () => {
  const [currenciesFrom, setCurrenciesFrom] =
    useState<keyof typeof NAMES>("USD");
  const [currenciesTo, setCurrenciesTo] = useState<keyof typeof NAMES>("EUR");
  const [amount, setAmount] = useState<string>("0");

  const amountNumber = useMemo(() => parseFloat(amount) || 0, [amount]);
  const debouncedAmount = useDebounce(amountNumber, 500);

  const { result, refetch, loading, error, currencies } = useConversionRate(
    currenciesFrom,
    currenciesTo,
    debouncedAmount
  );

  const handleSwap = useCallback(() => {
    setCurrenciesFrom(currenciesTo);
    setCurrenciesTo(currenciesFrom);
  }, [currenciesFrom, currenciesTo]);

  return (
    <section className={styles.container}>
      <Header />
      <Status onRefresh={refetch} />
      <div className={styles.main}>
        <Suspense fallback={<div>Loading...</div>}>
          <Conversion
            amount={amount}
            setAmount={setAmount}
            currenciesFrom={currenciesFrom}
            currenciesTo={currenciesTo}
            setCurrenciesFrom={setCurrenciesFrom}
            setCurrenciesTo={setCurrenciesTo}
            currencies={currencies}
            onSwap={handleSwap}
          />
          <ConversionResult
            amount={amount}
            result={result}
            loading={loading}
            error={error}
            currenciesFrom={currenciesFrom}
            currenciesTo={currenciesTo}
          />
        </Suspense>
      </div>
    </section>
  );
};
