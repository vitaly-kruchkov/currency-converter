import styles from "./Status.module.scss";
import online from "@/assets/wifi-on-icon.svg";
import offline from "@/assets/wifi-off-icon.svg";
import refresh from "@/assets/refresh-rounded.svg";
import clsx from "clsx";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";

export const Status: React.FC = () => {
  const isOnline = useNetworkStatus(10000);

  return (
    <section className={styles.container}>
      <div
        className={clsx(styles.network, {
          [styles.online]: isOnline,
          [styles.offline]: !isOnline,
        })}>
        {isOnline ? (
          <>
            <img src={online} alt="online" />
            <p>Online</p>
          </>
        ) : (
          <>
            <img src={offline} alt="online" />
            <p>Offline</p>
          </>
        )}
      </div>
      <p className={styles.date}>Last updated: 09/01/2025, 00:39 PM</p>
      <button type="button" className={styles.refresh}>
        <img src={refresh} alt="refresh" className={styles["refresh-icon"]} />
        <p className={styles["refresh-text"]}>Refresh rates</p>
      </button>
    </section>
  );
};
