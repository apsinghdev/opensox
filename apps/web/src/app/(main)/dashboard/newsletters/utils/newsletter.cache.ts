import { Newsletter } from "@/types/newsletter";

interface CacheEntry {
  data: Newsletter[];
  timestamp: number;
}

const CACHE_DURATION = 60 * 1000; // 1 minute in milliseconds
let cache: CacheEntry | null = null;

/**
 * Gets cached newsletters data if available and not expired
 * @returns Cached newsletters array or null if cache is expired/missing
 */
export const getCachedNewsletters = (): Newsletter[] | null => {
  if (!cache) return null;
  
  const now = Date.now();
  if (now - cache.timestamp > CACHE_DURATION) {
    cache = null; // Clear expired cache
    return null;
  }
  
  return cache.data;
};

/**
 * Sets newsletters data in cache with current timestamp
 * @param newsletters - Array of newsletters to cache
 */
export const setCachedNewsletters = (newsletters: Newsletter[]): void => {
  cache = {
    data: newsletters,
    timestamp: Date.now(),
  };
  
  // In a real implementation, this would use a proper cache store
  // For now, this is a placeholder that demonstrates the caching pattern
  // The actual caching would be handled at the API/data fetching level
};

