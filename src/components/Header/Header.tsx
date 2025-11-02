import styles from "./Header.module.scss";

export const Header: React.FC = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Currency converter</h1>
      <p className={styles.subtitle}>Get real-time exchange rates</p>
    </section>
  );
};
