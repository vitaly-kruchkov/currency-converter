import { useEffect, useState } from "react";

export const useNetworkStatus = (interval = 10000) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const checkConnection = async () => {
      try {
        await fetch("https://www.google.com/favicon.ico", {
          method: "HEAD",
          mode: "no-cors",
        });
        setIsOnline(true);
      } catch {
        setIsOnline(false);
      }
    };

    const timer = setInterval(checkConnection, interval);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(timer);
    };
  }, [interval]);

  return isOnline;
};
