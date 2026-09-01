// lib/hooks/useTestimonies.ts
import { useCallback, useEffect, useState } from "react";
import { api } from "../api";
import { NewTestimonyPayload, TestimonyItem } from "../../types/api";

export function useTestimonies() {
  const [testimonies, setTestimonies] = useState<TestimonyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonies = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.getTestimonies();
      setTestimonies(res.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonies();
  }, [fetchTestimonies]);

  const submitTestimony = async (payload: NewTestimonyPayload) => {
    const res = await api.submitTestimony(payload);
    return res.data;
  };

  const likeTestimony = async (id: number | string) => {
    setTestimonies((prev) =>
      prev.map((item) =>
        item.id === Number(id)
          ? { ...item, likesCount: (item.likesCount || 0) + 1 }
          : item,
      ),
    );
    try {
      await api.likeTestimony(id);
    } catch (err) {
      setTestimonies((prev) =>
        prev.map((item) =>
          item.id === Number(id)
            ? { ...item, likesCount: Math.max(0, (item.likesCount || 0) - 1) }
            : item,
        ),
      );
    }
  };

  return {
    testimonies,
    loading,
    error,
    refresh: fetchTestimonies,
    submitTestimony,
    likeTestimony,
  };
}

export function useTestimony(id: number | string) {
  const [testimony, setTestimony] = useState<TestimonyItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    // Derives testimony from list endpoint
    api
      .getTestimonies()
      .then((res) => {
        const found = res.data.find((item) => item.id === Number(id));
        if (found) {
          setTestimony(found);
        } else {
          setError("Testimony not found.");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const like = async () => {
    if (!testimony) return;
    setTestimony((prev) =>
      prev ? { ...prev, likesCount: (prev.likesCount || 0) + 1 } : null,
    );
    try {
      await api.likeTestimony(id);
    } catch (err) {
      setTestimony((prev) =>
        prev
          ? { ...prev, likesCount: Math.max(0, (prev.likesCount || 0) - 1) }
          : null,
      );
    }
  };

  return { testimony, loading, error, like };
}
