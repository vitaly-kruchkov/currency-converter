import { memo } from "react";
import styles from "./ConversionResult.module.scss";
import { SYMBOLS } from "@/constants/symbols";

interface ConversionResultProps {
  result: { rate: number; inverseRate: number; converted: number } | null;
  loading: boolean;
  error: string | null;
  currenciesFrom: string;
  currenciesTo: string;
  amount: string;
}

export const ConversionResult: React.FC<ConversionResultProps> = memo(
  ({ result, loading, error, currenciesFrom, currenciesTo, amount }) => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
      <section className={styles.container}>
        <h2 className={styles.header}>Conversion result</h2>
        <div className={styles.info}>
          <p className={styles.inverse}>
            {SYMBOLS[currenciesTo]}
            {result?.converted.toFixed(2)}
          </p>
          <p className={styles.exchange}>
            {amount} {currenciesFrom} ={" "}
          </p>
        </div>
        <div className={styles.divider} />
        <div className={styles.course}>
          <div className={styles["course-row"]}>
            <p className={styles["course-title"]}>Exchange Rate</p>
            <p className={styles["course-text"]}>
              {amount} {currenciesFrom} = {result?.converted.toFixed(6)}{" "}
              {currenciesTo}
            </p>
          </div>
          <div className={styles["course-row"]}>
            <p className={styles["course-title"]}>Inverse Rate</p>
            <p className={styles["course-text"]}>
              {amount} {currenciesTo} = {result?.inverseRate.toFixed(6)}{" "}
              {currenciesFrom}
            </p>
          </div>
        </div>
        <div className={styles.divider} />
        <p className={styles.footer}>
          Rates are for informational purposes only and may not reflect
          real-time market rates
        </p>
      </section>
    );
  }
);
