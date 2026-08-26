// lib/hooks/useBlogs.ts
import { useCallback, useEffect, useState } from "react";
import { api } from "../api";
import { BlogItem } from "../../types/api";

export function useBlogs(category?: string) {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.getBlogs(category);
      setBlogs(res.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return { blogs, loading, error, refresh: fetchBlogs };
}
