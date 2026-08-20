import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Generic data-fetching hook.
 * Calls `fetcher` on mount (and when `deps` change), returning
 * { data, loading, error, refetch }.
 *
 * fetcher must be a stable reference or wrapped in useCallback by the caller.
 */
export function useQuery<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = []
): { data: T | null; loading: boolean; error: string | null; refetch: () => void } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      if (mountedRef.current) setData(result);
    } catch (e: unknown) {
      if (mountedRef.current) {
        const msg = e instanceof Error ? e.message : "Request failed";
        setError(msg);
      }
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    mountedRef.current = true;
    run();
    return () => { mountedRef.current = false; };
  }, [run]);

  return { data, loading, error, refetch: run };
}

/** Convenience: derive a stable fetcher for a list endpoint. */
export function useList<T>(fetcher: () => Promise<T[]>) {
  const { data, loading, error, refetch } = useQuery(fetcher);
  return { items: data ?? [], loading, error, refetch };
}
