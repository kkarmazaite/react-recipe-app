import { useEffect, useRef, useState } from "react";

interface UseAsyncResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useAsync<T>(
  fn: () => Promise<T>,
  deps: unknown[],
  errorMessage = "Something went wrong."
): UseAsyncResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);

  useEffect(() => {
    const currentRequest = ++requestId.current;
    setLoading(true);
    setError(null);

    fn()
      .then((result) => {
        if (currentRequest === requestId.current) setData(result);
      })
      .catch(() => {
        if (currentRequest === requestId.current) setError(errorMessage);
      })
      .finally(() => {
        if (currentRequest === requestId.current) setLoading(false);
      });
  }, deps);

  return { data, loading, error };
}