import { CACHE_KEY } from "@/constants/cache";
import type { CacheData } from "@/types/conversesion";

const writeToCache = (data: CacheData) =>
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));

const readFromCache = () => {
  const data = localStorage.getItem(CACHE_KEY);
  return data ? JSON.parse(data) : null;
};

export { readFromCache, writeToCache };
