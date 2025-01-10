interface CacheOptions {
  maxAge?: number; // Tijd in milliseconden
  staleWhileRevalidate?: boolean;
}

class CacheManager {
  private cache: Map<string, any>;
  private timeouts: Map<string, NodeJS.Timeout>;

  constructor() {
    this.cache = new Map();
    this.timeouts = new Map();
  }

  // Sla data op in cache
  set(key: string, value: any, options: CacheOptions = {}): void {
    this.cache.set(key, value);

    // Clear bestaande timeout
    if (this.timeouts.has(key)) {
      clearTimeout(this.timeouts.get(key)!);
    }

    // Set nieuwe timeout als maxAge is gespecificeerd
    if (options.maxAge) {
      const timeout = setTimeout(() => {
        if (options.staleWhileRevalidate) {
          // Markeer als stale maar verwijder niet
          this.markAsStale(key);
        } else {
          // Verwijder direct
          this.delete(key);
        }
      }, options.maxAge);

      this.timeouts.set(key, timeout);
    }
  }

  // Haal data op uit cache
  get(key: string): any {
    return this.cache.get(key);
  }

  // Verwijder item uit cache
  delete(key: string): void {
    this.cache.delete(key);
    if (this.timeouts.has(key)) {
      clearTimeout(this.timeouts.get(key)!);
      this.timeouts.delete(key);
    }
  }

  // Markeer item als stale
  private markAsStale(key: string): void {
    const value = this.cache.get(key);
    if (value) {
      this.cache.set(key, {
        ...value,
        isStale: true
      });
    }
  }

  // Check of item stale is
  isStale(key: string): boolean {
    const value = this.cache.get(key);
    return value?.isStale ?? false;
  }

  // Clear hele cache
  clear(): void {
    this.cache.clear();
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts.clear();
  }
}

// Singleton instance
export const cacheManager = new CacheManager();

// Cache decorator voor class methods
export function Cached(options: CacheOptions = {}) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const key = `${propertyKey}-${JSON.stringify(args)}`;
      
      // Check cache first
      const cachedValue = cacheManager.get(key);
      if (cachedValue && !cacheManager.isStale(key)) {
        return cachedValue;
      }

      // If stale or not in cache, fetch new data
      const result = await originalMethod.apply(this, args);
      cacheManager.set(key, result, options);
      
      return result;
    };

    return descriptor;
  };
}

// Helper voor API response caching
export async function cacheApiResponse(
  key: string,
  fetchFn: () => Promise<any>,
  options: CacheOptions = {}
) {
  const cachedData = cacheManager.get(key);
  
  if (cachedData && !cacheManager.isStale(key)) {
    return cachedData;
  }

  const data = await fetchFn();
  cacheManager.set(key, data, options);
  
  return data;
}
