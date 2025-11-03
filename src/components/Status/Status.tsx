import styles from "./Status.module.scss";
import online from "@/assets/wifi-on-icon.svg";
import offline from "@/assets/wifi-off-icon.svg";
import refresh from "@/assets/refresh-rounded.svg";
import clsx from "clsx";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { readFromCache } from "@/utils/cache";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

interface StatusProps {
  onRefresh: () => void;
}

export const Status: React.FC<StatusProps> = ({ onRefresh }) => {
  const isOnline = useNetworkStatus(10000);
  const cachedData = readFromCache();
  const lastUpdated = cachedData?.timestamp;
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const debouncedRefreshTrigger = useDebounce(refreshTrigger, 2000);

  const formattedTime = lastUpdated
    ? new Date(lastUpdated).toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "No data";

  useEffect(() => {
    if (debouncedRefreshTrigger > 0) {
      onRefresh();
    }
  }, [debouncedRefreshTrigger, onRefresh]);

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

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
      <p className={styles.date}>Last updated: {formattedTime}</p>
      <button
        type="button"
        className={styles.refresh}
        onClick={handleRefresh}
        disabled={!isOnline}>
        <img src={refresh} alt="refresh" className={styles["refresh-icon"]} />
        <p className={styles["refresh-text"]}>Refresh rates</p>
      </button>
    </section>
  );
};
