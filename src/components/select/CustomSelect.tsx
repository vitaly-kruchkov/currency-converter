import { useState, useRef, useEffect } from "react";
import styles from "./CustomSelect.module.scss";
import check from "@/assets/check-rounded.svg";

export interface CurrencyOption {
  code: string;
  symbol: string;
  name: string;
}

interface CurrencySelectProps {
  value: string;
  onChange: (code: string) => void;
  options: CurrencyOption[];
  label?: string;
}

export default function CurrencySelect({
  value,
  onChange,
  options,
  label,
}: CurrencySelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(
    (o) =>
      o.code.toLowerCase().includes(search.toLowerCase()) ||
      o.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedOption = options.find((o) => o.code === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.wrapper} ref={containerRef}>
      {label && (
        <label className={styles.label} htmlFor={label}>
          {label}
        </label>
      )}

      <button
        className={styles.select}
        onClick={() => setOpen((prev) => !prev)}
        type="button">
        {selectedOption ? (
          <div className={styles.optionSelected}>
            <div className={styles.icon}>{selectedOption.symbol}</div>
            <div className={styles.info}>
              <p className={styles.code}>{selectedOption.code}</p>
              <p className={styles.name}>{selectedOption.name}</p>
            </div>
          </div>
        ) : (
          <span className={styles.placeholder}>Select currency</span>
        )}
      </button>
      {open && (
        <div
          className={`${styles.modalOverlay} ${open ? styles.open : ""}`}
          onClick={() => setOpen(false)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}>
            <div className={styles.dropdown}>
              <div className={styles.dropdownTitle}>
                <p>Select currency</p>
                <button
                  type="button"
                  className={styles.close}
                  onClick={() => setOpen(false)}
                />
              </div>
              <p className={styles.info}>
                Choose a currency from the list below or use the search bar to
                find a specific currency.
              </p>
              <div className={styles.searchInput}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Search currency..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className={styles.options}>
                {filteredOptions.length === 0 ? (
                  <p className={styles.noResults}>No results</p>
                ) : (
                  filteredOptions.map((option) => (
                    <button
                      key={option.code}
                      onClick={() => {
                        onChange(option.code);
                        setOpen(false);
                      }}
                      className={`${styles.option} ${
                        option.code === value ? styles.active : ""
                      }`}>
                      <div className={styles.icon}>{option.symbol}</div>
                      <div>
                        <p className={styles.code}>{option.code}</p>
                        <p className={styles.name}>{option.name}</p>
                      </div>
                      {option.code === value && (
                        <img alt="check" src={check} className={styles.check} />
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
