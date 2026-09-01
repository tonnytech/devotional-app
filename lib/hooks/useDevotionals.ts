// lib/hooks/useDevotionals.ts
import { useCallback, useEffect, useState } from "react";
import { api } from "../api";
import { Devotional } from "../../types/api";

export function useDevotionals(category?: string) {
  const [devotionals, setDevotionals] = useState<Devotional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDevotionals = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.getDevotionals(category);
      setDevotionals(res.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchDevotionals();
  }, [fetchDevotionals]);

  return { devotionals, loading, error, refresh: fetchDevotionals };
}

export function useDevotional(id: number | string) {
  const [devotional, setDevotional] = useState<Devotional | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api
      .getDevotionalById(id)
      .then((res) => setDevotional(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { devotional, loading, error };
}
