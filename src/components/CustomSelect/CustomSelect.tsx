import { useState, useRef, useEffect } from "react";
import styles from "./CustomSelect.module.scss";
import check from "@/assets/check-rounded.svg";
import clsx from "clsx";

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
  const [highlightIndex, setHighlightIndex] = useState(0);

  const filteredOptions = options.filter(
    (o) =>
      o.code.toLowerCase().includes(search.toLowerCase()) ||
      o.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedOption = options.find((o) => o.code === value);

  useEffect(() => {
    if (!open) return;
    setHighlightIndex(0);
  }, [open, search]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightIndex((prev) => Math.min(prev + 1, options.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        const highlighted = options[highlightIndex];
        if (highlighted) {
          onChange(highlighted.code);
          setOpen(false);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, highlightIndex, options, onChange]);

  useEffect(() => {
    const el = document.querySelector(`.${styles.highlight}`);
    if (el) {
      el.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [highlightIndex]);

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
                  filteredOptions.map((option, index) => (
                    <button
                      key={option.code}
                      onClick={() => {
                        onChange(option.code);
                        setOpen(false);
                      }}
                      className={clsx(
                        styles.option,
                        option.code === value && styles.active,
                        index === highlightIndex && styles.highlight
                      )}>
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
