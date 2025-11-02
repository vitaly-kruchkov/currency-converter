import styles from "./Conversion.module.scss";
import { memo } from "react";
import CurrencySelect, { type CurrencyOption } from "../select/CustomSelect";

interface ConversionProps {
  amount: string;
  setAmount: (val: string) => void;
  currenciesFrom: string;
  currenciesTo: string;
  setCurrenciesFrom: (val: string) => void;
  setCurrenciesTo: (val: string) => void;
  currencies: CurrencyOption[];
}

export const Conversion: React.FC<ConversionProps> = memo(
  ({
    amount,
    setAmount,
    currenciesFrom,
    currenciesTo,
    setCurrenciesFrom,
    setCurrenciesTo,
    currencies,
  }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let val = e.target.value;

      // // Разрешаем только цифры, запятую и точку
      // val = val.replace(/[^0-9.,]/g, "");

      // // Заменяем запятую на точку
      // val = val.replace(",", ".");

      val = val.replace(/(?!^.*\..*)\./g, ".");

      setAmount(val);
    };

    const handleSwap = () => {
      setCurrenciesFrom(currenciesTo);
      setCurrenciesTo(currenciesFrom);
    };

    return (
      <section className={styles.container}>
        <div className={styles.amountWrapper}>
          <label htmlFor="amount" className={styles.amountLabel}>
            Amount
          </label>
          <input
            id="amount"
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={handleChange}
            placeholder="0.00"
            className={styles.amountInput}
          />
        </div>
        <div className={styles.currencies}>
          <CurrencySelect
            value={currenciesFrom}
            onChange={setCurrenciesFrom}
            options={currencies}
            label="From"
          />
          <button
            onClick={handleSwap}
            type="button"
            className={styles.switch}
          />
          <CurrencySelect
            value={currenciesTo}
            onChange={setCurrenciesTo}
            options={currencies}
            label="To"
          />
        </div>
      </section>
    );
  }
);
